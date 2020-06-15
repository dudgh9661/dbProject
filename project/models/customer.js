'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customer', {
    regionCode: DataTypes.INTEGER,
    customerCode: DataTypes.INTEGER,
    usedMoney: DataTypes.INTEGER,
    chargedMoney: DataTypes.INTEGER
  }, {});
  customer.associate = function(models) {
    // associations can be defined here
  };
  return customer;
};