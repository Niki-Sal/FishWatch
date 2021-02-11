'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.fish.hasMany(models.nutrition)
      models.fish.belongsToMany(models.region, {through: "fishsRegions"})
    }
  };
  fish.init({
    name: DataTypes.STRING,
    harvest: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fish',
  });
  return fish;
};