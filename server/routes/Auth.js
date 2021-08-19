const Auth = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');

// Register user route. - post
//  need to create a user with id an password (pass using the cryptojs lib) and save it to the database

Auth.post('/register', async (req, res, next) => {
  const { userName, email, password } = req.body;

  const newUser = new User({
    userName,
    userEmail: email,
    password: CryptoJS.AES.encrypt(password, process.env.SecretKey).toString(),
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
