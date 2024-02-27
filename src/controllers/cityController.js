const State = require("../models/stateModel");
const City = require("../models/cityModel");
const Country = require("../models/countryModel");

const createCity = async function (req, res) {
    try {
        let { stateId, city, countryId } = req.body;

        let countryExists = await Country.findByPk(countryId);
        if (!countryExists) return res.status(400).send({ status: false, message: "no country exits with this countryId" });
        
        let stateExists = await State.findByPk(stateId);
        if (!stateExists) return res.status(400).send({ status: false, message: "no state exists with this id" });
       
        let cityExists = await City.findOne({ where: { stateId: stateId, city: city } });
        if (cityExists) return res.status(400).send({ status: false, message: "city already exists" });
       console.log(cityExists)
        let data = await City.create({ city: city, stateId: stateId });
        if (data) return res.status(201).send({ status: true, message: "city is created successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: false, message: "Internal server error" });
    }
}

const updateCity = async function(req, res) {
    try {
      let { stateId, city, cityId, countryId } = req.body;
  
      let countryExists = await Country.findByPk(countryId);
      if (!countryExists) return res.status(400).send({ status: false, message: "no country exists with this countryId" });
  
      let stateExists = await State.findByPk(stateId);
      if (!stateExists) return res.status(200).send({ status: false, message: "no state exists with this id" });
  
      let cityExists = await City.findByPk(cityId);
      if (!cityExists) return res.status(400).send({ status: false, message: "no city exists with this cityId" });
  
      let [updatedRows] = await City.update(
        { city: city },
        { where: { id: cityId, StateId: stateId } }
      );
  
      if (updatedRows > 0) {
        return res.status(200).send({ status: true, message: "city is updated" });
      } else {
        return res.status(400).send({ status: false, message: "city update failed" });
      }
  
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ status: false, message: "internal server error" });
    }
  }


  const getCity = async function (req, res) {
    try {
        let { stateId, city, countryId } = req.body;

        let countryExists = await Country.findOne({ where: { id: countryId } });
        if (!countryExists) return res.status(400).send({ status: false, message: "No country exists with this countryId" });

        let stateExists = await State.findOne({ where: { id: stateId } });
        if (!stateExists) return res.status(400).send({ status: false, message: "No state exists with this stateId" });

        let cityExists = await City.findOne({ where: { stateId: stateId, city: city } });
        if (!cityExists) return res.status(400).send({ status: false, message: "No city exists with this name" });

        return res.status(200).send({ status: true, message: cityExists });

    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ status: false, message: "Internal server error" });
    }
}


const deleteCity = async function(req, res) {
    try {
      let { stateId, city, countryId } = req.body;
  
      let countryExists = await Country.findByPk(countryId);
      if (!countryExists) return res.status(400).send({ status: false, message: "No country exists with this countryId" });
  
      let stateExists = await State.findByPk(stateId);
      if (!stateExists) return res.status(400).send({ status: false, message: "No state exists with this stateId" });
  
      let cityExists = await City.findOne({ where: { stateId:stateId, city: city } });
      if (!cityExists) return res.status(400).send({ status: false, message: "No city exists with this name" });
  
      await City.destroy({ where: { stateId:stateId, city: city } });
  
      return res.status(200).send({ status: true, message: "City is deleted" });
  
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ status: false, message: "Internal Server Error" });
    }
  };
  

  const getAllCities = async function(req, res) {
    try {
      const { stateId, countryId } = req.body;
  
      const countryExists = await Country.findByPk(countryId);
      if (!countryExists) return res.status(400).send({ status: false, message: "No country exists with this countryId" });
  
      const stateExists = await State.findByPk(stateId);
      if (!stateExists) return res.status(400).send({ status: false, message: "No state exists with this stateId" });
  
      const cityExists = await City.findAll({ where: { stateId: stateId } });
      if (!cityExists.length == 0) return res.status(400).send({ status: false, message: "No city exists with this name" });
  
      return res.status(200).send({ status: true, message: cityExists });
  
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ status: false, message: "Internal Server Error" });
    }
  }

module.exports = { createCity ,updateCity,getCity,deleteCity,getAllCities};