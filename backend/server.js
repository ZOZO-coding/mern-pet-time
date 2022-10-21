require('dotenv').config();
const morgan = require('morgan');

const express = require('express');

const mongoose = require('mongoose');

// routes
const petRoutes = require('./routes/pets')
const userRoutes = require('./routes/user')

// express app
const app = express();

// middlewares:
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/pets', petRoutes);
app.use('/api/user', userRoutes)

// connect to DB, async, returns a promise
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("connected to DB & listening on port " + process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error)
    })

