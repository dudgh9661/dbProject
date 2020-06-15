'use strict';
module.exports = (sequelize, DataTypes) => {
  const store = sequelize.define('store', {
    storeCode: DataTypes.INTEGER,
    regionCode: DataTypes.INTEGER,
    storeName: DataTypes.STRING,
    storePhone: DataTypes.INTEGER,
    revenue: DataTypes.INTEGER
  }, {});
  store.associate = function(models) {
    // associations can be defined here
  };
  return store;
};