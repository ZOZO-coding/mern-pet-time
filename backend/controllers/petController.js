const Pet = require('../models/PetModel');
const mongoose = require('mongoose');

//GET all pets
const getPets = async (req, res) => {
    // empty object to find all, add parameters to specify
    const pets = await Pet.find({}).sort({createdAt: -1})

    res.status(200).json(pets);
} 

//GET a single pet
const getPet = async (req, res) => {
    // make sure the id is valid by using mongoose
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such pet (id not valid)!"})
    }

    const pet = await Pet.findById(id)

    // if no pet found, we need to return so that the code wont continue
    if (!pet) {
        return res.status(404).json({error: 'No such pet!'})
    }

    res.status(200).json(pet)
}

// CREATE a new pet
const createPet = async (req, res) => {
    const { name, age, breed, personality } = req.body;

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!age) {
        emptyFields.push('age')
    }
    if (!breed) {
        emptyFields.push('breed')
    }
    if (!personality) {
        emptyFields.push('personality')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields!', emptyFields })
    }

    // create a new pet document in the collection
    try {
        const pet = await Pet.create({name, age, breed, personality})
        // once created, send back the json object
        res.status(200).json(pet)
    } catch (error) {
        // error has a message property
        res.status(400).json({error: error.message})
    }
}

// Update a new pet
const updatePet = async (req, res) => {
    const { id } = req.params

    // make sure the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such pet (id not valid)!"})
    }

    const pet = await Pet.findOneAndUpdate({_id: id}, {
        // spread the body of request
        ...req.body
    })

    // if no pet found, we need to return so that the code wont continue
    if (!pet) {
        return res.status(404).json({error: 'No such pet!'})
    }

    res.status(200).json(pet)
}

// Delete a new pet
const deletePet = async (req, res) => {
    const { id } = req.params

    // make sure the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such pet (id not valid)!"})
    }

    // if id is valid, delete it
    const pet = await Pet.findOneAndDelete({_id: id})

    // if no pet found, we need to return so that the code wont continue
    if (!pet) {
        return res.status(404).json({error: 'No such pet!'})
    }

    // if we do have it and deleted it, send it back through response
    res.status(200).json(pet)
}


module.exports = {
    createPet,
    getPets,
    getPet,
    updatePet,
    deletePet
}