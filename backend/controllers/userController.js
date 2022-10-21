const User = require('../models/UserModel')

// login user
const loginUser = async (req, res) => {
    res.json({mssg: 'login user'})
}

// sign up user
const signupUser = async (req, res) => {
    res.json({mssg: 'signup user'})
}

module.exports = {
    loginUser,
    signupUser
}