const express = require("express");
//Importing Router from installed express package //It will help to send requests to the Mondo Database
const router = express.Router();
//Importing Users schema and its database details
const User = require("../models/User");
//Importuing body and validationResult from installed express-validator package
//It will help in validating the credentials from the users
const { body, validationResult } = require("express-validator");
//Importing bcrypt
//It will help in creating the hashvalue for a password which we will store instead of actuall password
const bcrypt = require("bcryptjs");
//
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
//Secret token used by our app
const JWT_SECRET = "SecretToken";

//Route 1 : Create a user using: POST "/api/auth/createuser/". No login required
router.post(
  "/createuser",//EndPont for the request
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),//Validator for Name
    body("email", "Enter a valid Eamil").isEmail(),//Validator for Email
    body("name", "Password is too short").isLength({ min: 5 }),//Validator for Password
  ],
  async (req, res) => {
    let success=false;//var to check if request is completed successfully will be used in front-end

    //If there are errors , return Bad requies and Error
    const errors = validationResult(req);//Validation results from express-validators

    if (!errors.isEmpty()) {//If validation fails
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);//Generating salt
    const secPass = await bcrypt.hash(req.body.password, salt);//Creating secured hash-value using password and salt

    try {
      //check whether the user with this email already exist in database
      let user = await User.findOne({ email: req.body.email });//Find for user in Users Database

      if (user) {// User already exists
        return res.status(400).json({ error: "Sorry a user with this email already exists" });
      }

      //Else if user is new
      //Create a new user with provided data in Users Database 
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);//Ceating a authToken for the user

      // res.json(user);
      success=true;
      res.json({success, authToken });//Sending success response and auth token to frond-end which will be stored in local memory of browser

    } catch (error) {//InCase If server dont respond
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 2 : Authenticate a user using: POST "/api/auth/login". No login required
router.post(
  "/login",//EndPont for the request
  [
    body("email", "Enter a valid Eamil").isEmail(),//Validation for email
    body("password", "Password cannot be blank").exists(),//Validation for Password
  ],
  async (req, res) => {
    let success=false;//var to check if request is completed successfully will be used in front-end

    //If there are errors , return Bad requies and Error
    const errors = validationResult(req);//Validation results from express-validators

    if (!errors.isEmpty()) {//If validation fails
      return res.status(400).json({success, errors: errors.array() });
    }

    //Destructuring the body to get email and password
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });//chech if user with given email exists or not in Users DataBase
      if (!user) {//If no user Exists
        return res.status(400).json({success, error: "Please try to login with correct credentials" });
      }

      //Check for correct password
      const passwordCompare = await bcrypt.compare(password, user.password);//compare function of bcrypt package
      if (!passwordCompare) { //If password doesn't matches 
        return res.status(400).json({success, error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);//Ceating a authToken for the user
      success=true;
      res.json({success, authToken });//Sending success response and auth token to frond-end which will be stored in local memory of browser

    } catch (error) {//InCase If server dont respond
      console.error(error.message);
      res.status(500).send(success,"Internal server error");
    }
  }
);

//Route 3 : Get logged in user details: POST "/api/auth/getuser".Login required
router.post("/getuser", fetchuser, async (req, res) => {//uses predefined fetchuser middleware to varify token
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
    
  } catch (error) {//InCase If server dont respond
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
