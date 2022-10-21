const express = require('express');
const { createPet, getPet, getPets, updatePet, deletePet } = require('../controllers/petController')

const router = express.Router();

//GET all pets
router.get('/', getPets)

//GET a single pet
router.get('/:id', getPet)

// POST a new pet
router.post('/', createPet)

// Update a new pet
router.patch('/:id', updatePet)

// Delete a new pet
router.delete('/:id', deletePet)

module.exports = router;