'use strict';
module.exports = (sequelize, DataTypes) => {
  const region = sequelize.define('region', {
    regionCode: DataTypes.INTEGER,
    regionName: DataTypes.STRING,
    monthLimit: DataTypes.INTEGER,
    discountRate: DataTypes.INTEGER
  }, {});
  region.associate = function(models) {
    // associations can be defined here
  };
  return region;
};