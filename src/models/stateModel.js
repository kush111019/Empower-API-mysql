const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('egDatabase', 'root', 'empower', {
  host: 'localhost',
  dialect: 'mysql' 
});

const State = sequelize.define("State", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    countryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Country", // This should be the name of your countries table
        key: "id",
      },
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });


  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
  module.exports = State;
