'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('customer', {
            regionCode: {
                allowNull: false,
                type: Sequelize.INTEGER(20),
                references: {
                    model: 'region',
                    key: 'regionCode'
                }
            },
            customerCode: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            usedMoney: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            chargedMoney: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('customers');
    }
};