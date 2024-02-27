const jwt = require('jsonwebtoken');
const userTokenModel = require("../models/userToken");
const userToken = require('../models/userToken');


const generateAccessToken =  (user) => {
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  });
  return accessToken;
};

const generateRefreshToken =  (user) => {
    const refresh_token = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    });
    if(refresh_token)
    {
    let userId  = user.id;
    let date = new Date();
    const saveRefreshToken =  userTokenModel.create({userid:userId,refresh_token:refresh_token,createdAt:date})
    }
    return refresh_token;
  };

const verifyRefreshToken =  (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};


module.exports = { generateAccessToken, verifyRefreshToken,generateRefreshToken};
