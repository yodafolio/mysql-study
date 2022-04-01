const DataTypes = require('sequelize');
const { Model } = DataTypes;
module.exports = class User extends Model {
  static init(sequelize) {
    return super.init({
      // id: DataTypes.INTEGER,
      userEmail: DataTypes.STRING,
      userPassWord: DataTypes.STRING,
      userAge: DataTypes.INTEGER,
      userAddress: DataTypes.STRING,
      userGender: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'User',
    })
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    // define association here
  }
};



// const { Model } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     userId: DataTypes.INTEGER,
//     userEmail: DataTypes.STRING,
//     userPassWord: DataTypes.STRING,
//     userAge: DataTypes.INTEGER,
//     userAddress: DataTypes.STRING,
//     userGender: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };