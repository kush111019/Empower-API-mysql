const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('egDatabase', 'root', 'empower', {
  host: 'localhost',
  dialect: 'mysql' 
});

 const City = sequelize.define('City', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    stateId: {
      type: DataTypes.INTEGER, // Assuming stateId is an integer
      allowNull: false,
      references: {
        model: 'State', // Assuming your state table is named 'States'
        key: 'id'
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },


  },   );

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


  module.exports = City