'use strict';
module.exports = (sequelize, DataTypes) => {
  const withdraw = sequelize.define('withdraw', {
    regionCode: DataTypes.INTEGER,
    storeCode: DataTypes.INTEGER,
    withrawCode: DataTypes.INTEGER,
    withrawMoney: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});
  withdraw.associate = function(models) {
    // associations can be defined here
  };
  return withdraw;
};