const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('egDatabase', 'root', 'empower', {
  host: 'localhost',
  dialect: 'mysql' 
});

const User = sequelize.define('User', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    // firstName: { type: DataTypes.STRING, allowNull: false },
    // lastName: { type: DataTypes.STRING, allowNull: false },
    // gender: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     validate: {
    //         isIn: [['male','female','others']]
    //       }
    //   },
    // email: { type: DataTypes.STRING, allowNull: false, unique: true },
    // password: { type: DataTypes.STRING, allowNull: false },
    cityId: { 
        type: DataTypes.INTEGER, 
        references:{
            model:"City",
            key:"id"
        },
        allowNull: false 
    },
    stateId: { 
        type: DataTypes.INTEGER,
        references:{
          model:"State",
          key:"id"
        },
        allowNull: false 
    },
    countryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Country", // This should be the name of your countries table
          key: "id",
        },
        allowNull: false,
    },
    // zip: { type: DataTypes.STRING, allowNull: false },
    // interest: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     validate: {
    //       isIn: [['reading', 'writing', 'travelling', 'playing']]
    //     }
    //   },
    // isDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // interest: {
    //   type: DataTypes.JSON,
    //   allowNull: false,
    //   validate: {
    //     isIn: [['reading', 'writing', 'traveling', 'playing']],
    //   },
    // },

    interest: {
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      // validate: {
      //   isIn: [['reading', 'writing', 'traveling', 'playing']],
      // },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isIn: [['male', 'female', 'other']],
      // },
    },
    // stateId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // cityId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // countryId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
}, { timestamps: true });

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = User;
