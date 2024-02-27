const { Sequelize,DataTypes } = require('sequelize');
const sequelize = new Sequelize('egDatabase', 'root', 'empower', {
    host: 'localhost',
    dialect: 'mysql' 
  });

const UserTokens = sequelize.define('UserTokens', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  refresh_token: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue:''
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    expires: 2592000 // 30 days in seconds
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: 'UserTokens',
  timestamps: true,
  underscored: true
});

module.exports = UserTokens;
