
const Joi = require('@hapi/joi');

//REGISTRATION VALIDATION
const registerValidation = (data) => {
    const registrationSchema = Joi.object({
        firstName: Joi.string()
        .min(2)
        .required(),
        lastName: Joi.string()
        .min(2)
        .required(),
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required()
    })
    return registrationSchema.validate(data);    
}

//LOGIN VALIDATION
const loginValidation = (data) => {
    const loginSchema = Joi.object({
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required()
    })
    return loginSchema.validate(data);    
}

//ADD VIDEO VALIDATION
const addVideoValidation = (data) => {
    const videoSchema = Joi.object({
        url: Joi.string()
        .min(6)
        .required()
        .uri()
    })
    return videoSchema.validate(data);    
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.addVideoValidation = addVideoValidation;