'use strict';
module.exports = (sequelize, DataTypes) => {
  const charge = sequelize.define('charge', {
    regionCode: DataTypes.INTEGER,
    customerCode: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});
  charge.associate = function(models) {
    // associations can be defined here
  };
  return charge;
};