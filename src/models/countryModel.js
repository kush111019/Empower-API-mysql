const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('egDatabase', 'root', 'empower', {
  host: 'localhost',
  dialect: 'mysql' 
});

const Country = sequelize.define('Country', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    }
  });


  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
  module.exports = Country;
