const Joi = require('joi');

const createCity = Joi.object({
stateId: Joi.number().integer().required(),
city: Joi.string().required(),
countryId: Joi.number().integer().required(),
})
    
const updateCity = Joi.object({
stateId: Joi.number().integer().required(),
city: Joi.string().required(),
cityId: Joi.number().integer().required(),
countryId: Joi.number().integer().required(),
})
    
const deleteCity = Joi.object({
stateId: Joi.number().integer().required(),
city: Joi.string().required(),
countryId: Joi.number().integer().required(),
})
    
const getCity = Joi.object({
stateId: Joi.number().integer().required(),
city: Joi.string().required(),
countryId: Joi.number().integer().required(),
})

getAllCitiesInCountry = Joi.object({
countryId: Joi.number().integer().required(),
stateId: Joi.number().integer().required(),
})
    
module.exports = {createCity,updateCity,deleteCity,getCity,getAllCitiesInCountry};