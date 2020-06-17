'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('charge', {
            regionCode: {
                allowNull: false,
                type: Sequelize.INTEGER(20),
            },
            customerCode: {
                allowNull: false,
                type: Sequelize.INTEGER(20),
            },
            priceCode: {
                allowNull: false,
                type: Sequelize.INTEGER(20),
                primaryKey: true
            },
            price: {
                allowNUll: false,
                type: Sequelize.INTEGER(20)
            },
            date: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('charge');
    }
};