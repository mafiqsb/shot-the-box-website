'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class imagedetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  imagedetails.init(
    {
      names: DataTypes.STRING,
      images: DataTypes.STRING,
      slug: DataTypes.STRING,
      descriptions: DataTypes.STRING,
      moreimages: DataTypes.STRING,
      confirmimages: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'imagedetails',
    }
  );
  return imagedetails;
};
