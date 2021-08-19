const Auth = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

// Register user route. - post
//  need to create a user with id an password (pass using the cryptojs lib) and save it to the database

Auth.post('/register', async (req, res, next) => {
  const { userName, email, password } = req.body;

  const newUser = new User({
    userName,
    userEmail: email,
    password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
  });

  try {
    const user = await newUser.save();
    console.log(user);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* 
User login route 
     find user by email 
     decrypt the password 
     check if pass matches the user typed pass  
     create a access token with jwt         
     send pass and _info to the user    
     catch for any errors 
 */

Auth.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // find the user, by the email

    const authRequestingUser = await User.findOne({ userEmail: email });
    !authRequestingUser && res.status(401).json('Wrong pass or username');

    // decrypt the db stored password provided password
    const originalUserPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    originalUserPassword !== password &&
      res.status(401).json('Wrong password or username!');

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: '5d' }
    );

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = Auth;
