const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Comment extends Model {
  static init(sequelize) {
    return super.init({
      comment: DataTypes.TEXT
    }, {
      sequelize,
      modelName: 'Comment',
    })
  }
  static associate(db) {

  }
}



// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Comment extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Comment.init({
//     comment: DataTypes.TEXT
//   }, {
//     sequelize,
//     modelName: 'Comment',
//   });
//   return Comment;
// };