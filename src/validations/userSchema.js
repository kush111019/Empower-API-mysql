const Joi = require('joi');

const signUpSchema = Joi.object({
firstName: Joi.string().required(),
lastName: Joi.string().required(),
email: Joi.string().required().email(),
password: Joi.string().required(),
interest: Joi.array()
.items(Joi.string().valid('reading', 'writing', 'travelling', 'playing'))
.required(),
//interest: Joi.string().required().valid('reading','writing','travelling','playing'),
gender: Joi.string().required().valid('male','female','other'),
stateId: Joi.number().integer().required(),
cityId: Joi.number().integer().required(),
isDeleted: Joi.boolean(),
countryId: Joi.number().integer().required(),
zip: Joi.string().required(),
//image: Joi.string().regex(/^[\w\-.()\s]+$/).required()
})

const signInSchema = Joi.object({
userId: Joi.number().integer().required(),
email: Joi.string().required(),
password: Joi.string().required()
})
const deleteUserByIdSchema = Joi.object({
userId: Joi.number().integer().required()
})

const updateUserByIdSchema = Joi.object({
userId: Joi.number().integer().required(),
firstName: Joi.string(),
lastName: Joi.string(),
email: Joi.string().email(),
password: Joi.string(),
interest: Joi.array()
.items(Joi.string().valid('reading', 'writing', 'travelling', 'playing')),
//interest: Joi.string().valid('reading','writing','travelling','playing'),
gender: Joi.string().valid('male','female','other'),
state: Joi.string(),
city: Joi.string(),
isDeleted: Joi.boolean(),
zip: Joi.string(),
countryId: Joi.number().integer(),
stateId: Joi.number().integer(),
cityId: Joi.number().integer()
//profilePicture: Joi.string()
})

const getUserByIdSchema = Joi.object({
userId: Joi.number().integer().required(),
})

const forgetPasswordSchema = Joi.object({
email: Joi.string().required()
})

const getAllUsersSchema = Joi.object({
userId: Joi.number().integer().required()
})

const signOutSchema = Joi.object({
//refreshToken: Joi.string().required(),
userId: Joi.number().integer().required(),
})

const editOtherUserDetailsSchema = Joi.object({
    userId: Joi.number().integer().required(),
    userIdOfUserToBeEdited: Joi.number().integer().required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    interest: Joi.array()
    .items(Joi.string().valid('reading', 'writing', 'traveling', 'playing')),
    //interest: Joi.string().valid('reading','writing','travelling','playing'),
    gender: Joi.string().valid('male','female','other'),
    isDeleted: Joi.boolean(),
    zip: Joi.string(),
    countryId: Joi.number().integer(),
    stateId: Joi.number().integer(),
    cityId: Joi.number().integer()
    //profilePicture: Joi.string()
    })

const editUserPasswordSchema = Joi.object({
userId: Joi.number().integer().required(),
userIdOfTheUserToBeEdited: Joi.number().integer().required(),
password: Joi.string().required()
})

module.exports = {signUpSchema,signInSchema,deleteUserByIdSchema,updateUserByIdSchema,getUserByIdSchema,forgetPasswordSchema,getAllUsersSchema,signOutSchema,editOtherUserDetailsSchema,editUserPasswordSchema}


