const express = require('express');
const { createPet, getPet, getPets, updatePet, deletePet } = require('../controllers/petController')
// import middleware, only fire this middleware for add pet and view own pet
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// use the middleware, in the future, implement this to only apply to add pet and view own pet routes
router.use(requireAuth)

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