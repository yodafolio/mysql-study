
const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Hashtag extends Model {
  static init(sequelize) {
    return super.init({
      hashTag: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'Hashtag',
    })
  }
  static associate(db) {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
  }
}


// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Hashtag extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Hashtag.init({
//     hashTag: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Hashtag',
//   });
//   return Hashtag;
// };