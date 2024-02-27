// routes/auth.js
const User = require('../models/userModel');
const Country = require('../models/countryModel');
const State = require('../models/stateModel');
const City = require('../models/cityModel');
const userToken = require("../models/userToken")
const bcrypt = require('bcrypt');
const {generateAccessToken, generateRefreshToken} = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

const signUp = async function(req, res) {
  try {
    const user = req.body;

    const { firstName, lastName, email, password, countryId, cityId, stateId, zip, isDeleted, gender, interest } = user;

    const userData = await User.findOne({ where: { email } });

    if (userData) return res.status(400).send({ status: false, message: "Email already exists" });

    const countryExists = await Country.findOne({ where: { id: countryId } });

    if (!countryExists) return res.status(400).send({ status: false, message: "No country exists with this countryId" });

    const stateExists = await State.findOne({ where: { id: stateId } });

    if (!stateExists) return res.status(400).send({ status: false, message: "No state exists with this stateId" });

    const cityExists = await City.findOne({ where: { id: cityId } });

    if (!cityExists) return res.status(400).send({ status: false, message: "No city exists with this cityId" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      countryId,
      cityId,
      stateId,
      zip,
      isDeleted,
      gender,
      interest
    });

    if (createdUser) {
      return res.status(201).send({ status: true, message: "User created successfully" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};



const signIn = async function (req, res) {
    try {
      const { email, password} = req.body;
  
      const user = await User.findOne({
        where: { email, isDeleted: false },
      });
  
      if (!user)
        return res
          .status(400)
          .send({ status: false, message: "wrong email or contact number is wrong or user is deleted" });
     
      const verifiedPassword = await bcrypt.compare(password, user.password);
  
      if (!verifiedPassword)
        return res.status(401).json({ error: true, message: "Invalid email or password" });
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
  
      res.header("x-refresh-token", refreshToken);
      res.header("authorization", accessToken);
  
      res.status(200).json({
        error: false,
        accessToken: accessToken,
        refreshToken: refreshToken,
        message: "Logged in successfully",
      });
    } catch (error) {
      console.log(error.message);
    }
  };



  const getUserById = async function(req, res) {
    try {
        const userId = req.body.userId;

        const user = await User.findOne({ where: { id: userId } });

        if (!user) return res.status(400).send({ status: false, message: "No user exists with this userId" });

        return res.status(200).send({ status: true, message: user });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ status: false, message: "Internal server error" });
    }
};


const updateUserById = async function(req, res) {
    try {
        const { userId, countryId, stateId, cityId } = req.body;

        if (countryId) {
            let countryExists = await Country.findByPk(countryId);
            if (!countryExists) return res.status(400).send({ status: false, message: "No country exists with this countryId" });
        }

        if (stateId) {
            let stateExists = await State.findByPk(stateId);
            if (!stateExists) return res.status(400).send({ status: false, message: "No state exists with this stateId" });
        }

        if (cityId) {
            let cityExists = await City.findByPk(cityId);
            if (!cityExists) return res.status(400).send({ status: false, message: "No city exists with this cityId" });
        }

        const user = await User.findByPk(userId);

        if (!user) return res.status(400).send({ status: false, message: "No user exists with this userId" });
         
        let userIsValid = await userToken.findOne({where: {userId}});
        if(!userIsValid) return res.status(400).send({status:false,message:"not authorized"})
        console.log(userIsValid);
        if(userId!==userIsValid.userId) return res.status(400).send({status:false,message:"user is not authorized to make changes"})
        const updatedUser = await user.update(req.body);

        if (updatedUser) return res.status(200).send({ status: true, message: "User is updated" });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ status: false, message: "Internal server error" });
    }
}


const deleteUserById = async function (req, res) {
    try {
      const userId = req.body.userId;
  
      // Find the user by id and where isDeleted is false
      const user = await User.findOne({ where: { id: userId, isDeleted: false } });
  
      if (!user) return res.status(400).send({ status: false, message: "No user exists with this userId" });
  
      const userIsAlreadyDeleted = user.isDeleted;
  
      if (userIsAlreadyDeleted) return res.status(400).send({ status: false, message: "User is already deleted" });
  
      // Update the user's isDeleted field to true
      await User.update({ isDeleted: true }, { where: { id: userId } });
  
      return res.status(200).send({ status: true, message: "User is deleted" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ status: false, message: "Internal Server Error" });
    }
  }


  const forgetPassword = async function(req, res) {
    try {
      let email = req.body.email;
  
      // Check if the email exists in the database
      let user = await User.findOne({ where: { email: email } });
  
      if (!user) {
        return res.status(400).send({ status: false, message: "Email does not exist in database" });
      }
  
      let urlLink = "some url link";
  
      // You can implement your email sending logic here
  
      return res.status(200).send({ message: true, data: "Reset password link is sent to your email" });
  
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: "Internal server error" });
    }
  }
  


  const getAllUsers = async function(req, res) {
    try {
        let userId = req.body.userId;

        let userExists = await User.findOne({ where: { id: userId, isDeleted: false } });

        if (!userExists) return res.status(400).send({ status: false, message: "No user exists with this id" });

        let data = await User.findAll({ where: { isDeleted: false } });
        return res.status(200).send({ status: true, message: data });

    } catch (error) {
        console.log(error.message);
    }
}



const signOut = async function(req, res) {
    try {
      let userId = req.body.userId;
      let refreshToken = req.headers['x-refresh-token'];
      // Find the userToken document
      let refreshTokenDocument = await userToken.findOne({ where: { userid: userId ,refresh_token:refreshToken} });
      console.log(refreshTokenDocument)
  
      if (!refreshTokenDocument) {
        return res.status(400).send({ status: false, message: "no user exists with this refreshToken" });
      }
  
      // Delete the userToken document
      let data = await userToken.destroy({ where: { refresh_token:refreshToken } });
  
      if (data) {
        return res.status(200).send({ status: true, message: "user is logout successfully" });
      }
  
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ status: false, message: "internal server error" });
    }
  }



  const editOtherUserDetails = async function(req, res) {
    try {
      let userIdOfTheUserToBeEdited = req.body.userIdOfUserToBeEdited;
      let userId = req.body.userId;
      let { firstName, lastName, countryId, cityId, stateId, zip, isDeleted, gender, interest } = req.body;
  
      let userExists = await User.findOne({ where: { id: userId, isDeleted: false } });
  
      if (!userExists) return res.status(400).send({ status: false, message: "signUp first" });
  
      let userToBeUpdated = await User.findOne({ where: { id: userIdOfTheUserToBeEdited, isDeleted: false } });
  
      if (!userToBeUpdated) return res.status(400).send({ status: false, message: "user not exits to be edited" });

      if (countryId) {
        let countryExists = await Country.findByPk(countryId);
        if (!countryExists) return res.status(400).send({ status: false, message: "No country exists with this countryId" });
    }

    if (stateId) {
        let stateExists = await State.findByPk(stateId);
        if (!stateExists) return res.status(400).send({ status: false, message: "No state exists with this stateId" });
    }

    if (cityId) {
        let cityExists = await City.findByPk(cityId);
        if (!cityExists) return res.status(400).send({ status: false, message: "No city exists with this cityId" });
    }
  
      let body = { firstName, lastName, countryId, cityId, stateId, zip, isDeleted, gender, interest };
  
      let obj = {};
      for (let i in body) {
        if (body[i] !== undefined && body[i] !== null) {
          obj[i] = body[i];
        }
      }
  
      let updatedUser = await User.update(obj, { where: { id: userIdOfTheUserToBeEdited } });
  
      if (updatedUser[0] === 1) {
        return res.status(200).send({ status: true, message: "user information is updated" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ status: false, message: "Internal server error" });
    }
  };


  const editOtherUserPassword = async function(req, res) {
    try {
        let userIdOfTheUserToBeEdited = req.body.userIdOfTheUserToBeEdited;
        let userId = req.body.userId;
        let password = req.body.password;

        let userExists = await User.findOne({ where: { id:userId, isDeleted: false } });

        if (!userExists) return res.status(400).send({ status: false, message: "signUp first" });

        let userToBeUpdated = await User.findOne({ where: { id: userIdOfTheUserToBeEdited, isDeleted: false } });

        if (!userToBeUpdated) return res.status(400).send({ status: false, message: "user not exits to be edited" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(password, salt);

        password = hashedPassword;

        let passwordUpdate = await User.update({ password }, { where: { id: userIdOfTheUserToBeEdited } });
        
        if (passwordUpdate) return res.status(200).send({ status: true, message: "password is updated" });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {signUp,signIn,getUserById,updateUserById,deleteUserById,forgetPassword,getAllUsers,signOut,editOtherUserDetails,editOtherUserPassword};