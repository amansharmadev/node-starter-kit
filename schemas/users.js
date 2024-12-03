const Joi = require('joi');
const validateSchema = require('../utils/validationSchema');

const createUser = Joi.object({
    firstName: Joi.string().alphanum().min(2).max(30).required(),
    lastName: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10,15}$')).required(),
});

const getUser = {
    params: Joi.object({
        id: Joi.number().required(),
    }),
};



module.exports = validateSchema({
    createUser,
    getUser,
});