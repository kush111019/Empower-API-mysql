'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['male','female','others']]
          }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model:"cities",
            key:"id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      stateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model:"states",
            key:"id",
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      countryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'countries',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      zip: {
        type: Sequelize.STRING,
        allowNull: false
      },
      interest: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['reading', 'writing', 'travelling', 'playing']]
        }
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
