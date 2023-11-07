// Import dependencies
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt'); //User auth module
const sequelize = require('../config/connection');

// Create User model 
class User extends Model {
    //Add authentication method via bcrypt hashing 
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize model >> mysql table
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], //Passwords must be at least 8 chars
      },
    },
  },
  {
    // Hash passwords upon create and update
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true, 
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
