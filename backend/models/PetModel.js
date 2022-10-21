const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    personality: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Pet', PetSchema);