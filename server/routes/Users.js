const Users = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');

// update
Users.put('/:id', async (req, res) => {
    
});
// delete
// get
// get all users
// get user stats

module.exports = Users;
