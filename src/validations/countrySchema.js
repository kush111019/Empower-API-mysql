const Joi = require('joi');

const createCountry = Joi.object({
country: Joi.string().required(),
})

const updateCountry = Joi.object({
countryId: Joi.number().integer().required(),
country: Joi.string().required(),
})

const deleteCountry = Joi.object({
countryId: Joi.number().integer().required(),
})

const getCountry = Joi.object({
countryId: Joi.number().integer().required(),
})

const getAllCitiesInCountry = Joi.object({
countryId: Joi.number().integer().required(),
})

module.exports = {createCountry,updateCountry,deleteCountry,getCountry,getAllCitiesInCountry}