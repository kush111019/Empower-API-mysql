const State = require("../models/stateModel");
const Country = require("../models/countryModel");
const City = require("../models/cityModel")

const createState = async function(req, res) {
    try {
      let { countryId, state } = req.body;
  
      let countryExists = await Country.findByPk(countryId);
      if (!countryExists) return res.status(400).send({ status: false, message: "No country exists with this id" });
  
      let stateExists = await State.findOne({ where: { state: state } }); // Change 'name' to 'state'
      if (stateExists) return res.status(400).send({ status: false, message: "State already exists" });
  
      let data = await State.create({ state: state, countryId: countryId }); // Change 'name' to 'state'
      if (data)
        return res.status(201).send({ status: true, message: "State is created successfully" });
  
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ status: false, message: "Internal server error" });
    }
  }



  const updateState = async function(req, res) {
    try {
      let { countryId, state, stateId } = req.body;
  
      let countryExists = await Country.findByPk(countryId);
      if (!countryExists) return res.status(200).send({ status: false, message: "no country exists with this id" });
     
      let stateExists = await State.findByPk(stateId);
      if (!stateExists) return res.status(400).send({ status: false, message: "no state exists with this stateId" });

      let [rowsUpdated, updatedState] = await State.update(
        { state: state },
        { where: { id: stateId, countryId: countryId } }
      );
    
      if (rowsUpdated > 0) {
        return res.status(200).send({ status: true, message: "state is updated" });
      } else {
        return res.status(400).send({ status: false, message: "state could not be updated" });
      }
    } catch (error) {
      console.log(error.message);
    }
};

const getState = async function(req, res) {
    try {
      let { countryId, stateId } = req.body;
  
      let countryExists = await Country.findOne({ where: { id: countryId } });
      if (!countryExists)
        return res
          .status(400)
          .send({ status: false, message: "No country exists with this countryId" });
  
      let stateExists = await State.findOne({ where: { id: stateId } });
      if (!stateExists)
        return res
          .status(400)
          .send({ status: false, message: "No state exists with this stateId" });
  
      return res.status(200).send({ status: true, message: stateExists });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send({ status: false, message: "Internal Server Error" });
    }
  };


//   const deleteState = async function (req, res) {
//     try {
//         let { countryId, stateId } = req.body;

//         let countryExists = await Country.findOne({ where: { id: countryId } });
//         if (!countryExists) return res.status(400).send({ status: false, message: "no country exists with this countryId" });

//         let stateExists = await State.findOne({ where: { id: stateId } });
//         if (!stateExists) return res.status(400).send({ status: false, message: "no state exists with this stateId" });

//         await State.destroy({ where: { id: stateId } });
//         await City.destroy({ where: { stateId: stateExists.id } });

//         return res.status(200).send({ status: true, message: "state is deleted" });
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).send({ status: false, message: "internal server error" });
//     }
// };
  

const deleteState = async function (req, res) {
    try {
        let { countryId, stateId } = req.body;

        let countryExists = await Country.findOne({ where: { id: countryId } });
        if (!countryExists) return res.status(400).send({ status: false, message: "no country exists with this countryId" });

        let stateExists = await State.findOne({ where: { id: stateId } });
        if (!stateExists) return res.status(400).send({ status: false, message: "no state exists with this stateId" });

        await City.destroy({ where: { stateId: stateExists.id } }); // Delete cities associated with the state
        await State.destroy({ where: { id: stateId } }); // Delete the state

        return res.status(200).send({ status: true, message: "state is deleted" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ status: false, message: "internal server error" });
    }
};



const getAllStates = async function(req, res) {
    try {
      let { countryId } = req.body;
  
      let countryExists = await Country.findByPk(countryId);
      if (!countryExists) return res.status(400).send({ status: false, message: "no country exists with this countryId" });
  
      let stateExists = await State.findAll({ where: { countryId: countryId } });
      if (stateExists.length == 0) return res.status(400).send({ status: false, message: "no state exists with this countryId" });
  
      return res.status(200).send({ status: true, message: stateExists });
    } catch (error) {
      console.log(error.message);
    }
  }

  const getAllCitiesInAState = async function(req, res) {
    try {
      let stateId = req.body.stateId;
      let countryId = req.body.countryId;
  
      const country = await Country.findByPk(countryId);
      if (!country) return res.status(400).send({ status: false, message: "No country exists with this countryId" });
  
      const state = await State.findOne({ where: { id: stateId, countryId: countryId } });
      if (!state) return res.status(400).send({ status: false, message: "No state exists with this stateId" });
  
      const cities = await City.findAll({ where: { stateId: stateId } });
      if (cities.length === 0) return res.status(400).send({ status: false, message: "No cities exist with this stateId" });
  
      return res.status(200).send({ status: true, message: cities });
  
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ status: false, message: "Internal Server Error" });
    }
  }


  module.exports = {createState,updateState,getState,deleteState,getAllStates,getAllCitiesInAState}