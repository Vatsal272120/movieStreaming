const Auth = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

// Register user route. - post
//  need to create a user with id an password (pass using the cryptojs lib) and save it to the database

Auth.post('/register', async (req, res, next) => {
  const { userName, email, password } = req.body;

  const newUsertoRegister = new User({
    userName,
    userEmail: email,
    password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
  });

  try {
    const user = await newUsertoRegister.save();
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
  try {
    const authRequestingUser = await User.findOne({
      userEmail: req.body.email,
    });
    !authRequestingUser && res.status(401).json('Wrong password or username!');

    const decryptedPassArray = CryptoJS.AES.decrypt(
      authRequestingUser.password,
      process.env.SECRET_KEY
    );
    const originalPassword = decryptedPassArray.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json('Wrong password or username!');

    const accessToken = jwt.sign(
      { id: authRequestingUser._id, isAdmin: authRequestingUser.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: '5d' }
    );

    const { password, ...info } = authRequestingUser._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = Auth;
