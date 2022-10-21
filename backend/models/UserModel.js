const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

// create own static method on user model, so that we can use those methods like some built in methods: .create(), .findById() etc..
// pro tip: do not use arrow function if you are going to use "this"
userSchema.statics.signup = async function(email, password) {
    // check if the form is valid using validator
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    // check if email is valid
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    // check if the password is strong enough
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough, password needs to be at minimum of 8 characters, at least 1 lower & upper case character, at least 1 number and 1 symbol')
    }

    // check if email already exists in the database
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    // hash the password
    // step 1: generate salt
    const salt = await bcrypt.genSalt(10)
    // step 2: hash password
    const hash = await bcrypt.hash(password, salt)

    // store the hashed password along with the email in the db
    const user = await this.create({ email, password: hash })

    // don't forget to return the user!
    return user
}

// static login method
userSchema.statics.login = async function(email, password) {
    // check if either email and password has any values
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    // check if user already exists in the database
    const user = await this.findOne({ email })

    // if we cannot find the user with the email, then we dont bother to check for password match
    if (!user) {
        throw Error('Incorrect email')
    }

    // compare the input password with the hashed version in the user document in db
    const match = await bcrypt.compare(password, user.password)
    
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)