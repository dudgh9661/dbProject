'use strict';
module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define('payment', {
    regionCode: DataTypes.INTEGER,
    customerCode: DataTypes.INTEGER,
    storeCode: DataTypes.INTEGER,
    paymentCode: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});
  payment.associate = function(models) {
    // associations can be defined here
  };
  return payment;
};