const Joi = require('joi');

const createState = Joi.object({
countryId: Joi.number().integer().required(),
state: Joi.string().required()
})
    
const updateState = Joi.object({
countryId: Joi.number().integer().required(),
state: Joi.string().required(),
stateId:  Joi.number().integer().required()
})
    
const deleteState = Joi.object({
countryId: Joi.number().integer().required(),
stateId: Joi.number().integer().required()
})
    
const getState = Joi.object({
countryId: Joi.number().integer().required(),
stateId: Joi.number().integer().required()
})

const getAllStates = Joi.object({
countryId:  Joi.number().integer().required()
})

getAllCitiesInAState = Joi.object({
stateId:  Joi.number().integer().required(),
countryId:  Joi.number().integer().required()
})
    
module.exports = {createState,updateState,deleteState,getState,getAllStates,getAllCitiesInAState};