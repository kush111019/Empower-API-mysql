const Country = require('../models/countryModel');
const State = require("../models/stateModel");
const City = require("../models/cityModel");
const { getAllCitiesInAState } = require('./stateController');

const createCountry = async function (req, res) {
    try {
      let country = req.body.country;
      let countryExists = await Country.findOne({ where: { country: country } });
      if (countryExists) return res.status(400).send({ status: false, message: "Country already exists" });
  
      let data = await Country.create({ country: country });
      if (data)
        return res.status(201).send({ status: true, message: "Country is created successfully" });
  
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ status: false, message: "Internal server error" });
    }
  };


  const updateCountry = async function (req, res) {
    try {
      let countryId = req.body.countryId;
      let country = req.body.country;
      let data = await Country.findOne({ where: { id: countryId } });
      if (!data) {
        return res.status(400).send({ status: false, message: "no country exists with this id" });
      }
  
      let [rowsUpdated, updatedCountry] = await Country.update(
        { country: country },
        { where: { id: countryId }, returning: true }
      );
  
      return res.status(200).send({ status: true, message: "country is updated" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ status: false, message: "An error occurred" });
    }
  };



  const getCountry = async function(req, res) {
    try {
      let countryId = req.body.countryId;
  
      let country = await Country.findOne({ where: { id: countryId } });
      if (!country) return res.status(400).send({ status: false, message: "No country exists with this countryId" });
  
      return res.status(200).send({ status: true, message: country });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ status: false, message: "Internal server error" });
    }
  };

const deleteCountry = async function(req, res) {
    try {
      let countryId = req.body.countryId;
  
      let country = await Country.findByPk(countryId);
      if (!country) return res.status(400).send({ status: true, message: "no country exists with this id" });
  
      let states = await State.findAll({ where: { countryId: countryId } });
  
      for (let i = 0; i < states.length; i++) {
        await City.destroy({ where: { stateId: states[i].id } });
      }

      let deletedStates = await State.destroy({ where: { countryId: countryId } });
      
      let deletedCountry = await Country.destroy({ where: { id: countryId } });

      return res.status(200).send({ status: true, message: "country is deleted" });
  
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ status: false, message: "An error occurred" });
    }
};

  


const getAllCitiesInACountry = async function(req, res) {
    try {
        let countryId = req.body.countryId;

        let states = await State.findAll({ where: { countryId: countryId } });

        let cities = [];

        let citiesInAState;

        for (let i = 0; i < states.length; i++) {
            citiesInAState = await City.findAll({ where: { stateId: states[i].id } });
            if(citiesInAState.length!=0)
            cities.push(citiesInAState);
        }

        if (cities.length == 0) return res.status(400).send({ status: false, message: "no cities exist" });

        return res.status(200).send({ status: true, message: cities });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ status: false, message: "internal server error" });
    }
};

  
  module.exports = { createCountry,updateCountry,deleteCountry,getCountry,getAllCitiesInACountry};

  
  
  
  
  
  
  