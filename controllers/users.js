const { Op } = require('sequelize');
const UserModel = require('../models/user');
const logger = require('../utils/logger');

const getAllUsers = async function (req, res) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
        logger.error(error, '[controllers/users.js] [@getAllUsers]');
      res.status(500).json({ message: 'An error occurred while fetching users' });
    }
}

const createUser = async function (req, res) {
    try {
        const { firstName, lastName, phone, email } = req.body;
        const existingUser = await UserModel.findOne({
            where: {
                [Op.or]: [
                    { email },
                    { phone }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email or phone already exists' });
        }
        const newUser = await UserModel.create({ firstName, lastName, phone, email });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the user' });
    }
}

const deleteUser = async function (req, res) {
    try {
        const { id } = req.params;
        const user = await UserModel.findByPk(id);
        if (user) {
            await user.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the user' });
    }
}

const updateUser = async function (req, res) {
    try {
        const { id } = req.params;
        const { firstName, lastName } = req.body;
        const user = await UserModel.findByPk(id);
        if (user) {
            user.firstName = firstName;
            user.lastName = lastName;
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the user' });
    }
}

const getUser = async function (req, res) {
    try {
        const { id } = req.params;
        const user = await UserModel.findByPk(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching the user' });
    }
}



module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    getUser,
}