'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fishesRegions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  fishesRegions.init({
    fishId: DataTypes.INTEGER,
    regionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'fishesRegions',
  });
  return fishesRegions;
};