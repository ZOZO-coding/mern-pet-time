const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

// create token, _id is going to be part of the payload of the token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '2d'})
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        // invoke the User model static method: login
        const user = await User.login(email, password)

        // if success login, create token here:
        const token = createToken(user._id)

        // let the server send back the email and send back the token so that the client(browser) knows who is authorized to view contents
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// sign up user
const signupUser = async (req, res) => {
    const { email, password } = req.body
    try {
        // invoke the User model static method: signup
        const user = await User.signup(email, password)

        // create token here:
        const token = createToken(user._id)

        // let the server send back the email and send back the token so that the client(browser) knows who is authorized to view contents
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginUser,
    signupUser
}