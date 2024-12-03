const express = require('express');
const UserController = require('../controllers/users');
const UserSchema = require('../schemas/users');

const router = express.Router();

// Define a route to get all users
router.get('/', UserController.getAllUsers);

// Define a route to create a new user
router.post('/', UserSchema.createUser, UserController.createUser);

// Define a route to get a user by ID
router.get('/:id', UserSchema.getUser, UserController.getUser);

// Define a route to update a user by ID
router.put('/:id', UserController.updateUser);

// Define a route to delete a user by ID
router.delete('/:id', UserSchema.getUser, UserController.deleteUser);


module.exports = router;
