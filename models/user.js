'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(db) { // 관계 작성
    }
  }
  User.init({
    userId: DataTypes.INTEGER,
    userName: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    userPassword: DataTypes.STRING,
    userNickname: DataTypes.STRING,
    userProfileImg: DataTypes.STRING,
    userAge: DataTypes.INTEGER,
    userGender: DataTypes.INTEGER,
    userAddress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};