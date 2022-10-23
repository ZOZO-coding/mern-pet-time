const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

// middleware to verify user is authenticated
const requireAuth = async (req, res, next) => {

    // verrify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    // the value of authorization is going to be like "Bearer sdiofjsdiofs.odsifosdjuf.sdfsdofksd", we only want the string after "Bearer"
    const token = authorization.split(" ")[1]

    // verify the token
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        // attaching the user (only the '_id' property) to req
        req.user = await User.findOne({ _id }).select('_id')
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth