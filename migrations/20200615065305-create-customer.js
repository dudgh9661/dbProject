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
                type: Sequelize.INTEGER(20)
            },
            usedMoney: {
                allowNull: true,
                type: Sequelize.INTEGER(20)
            },
            chargedMoney: {
                allowNull: true,
                type: Sequelize.INTEGER(20)
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('customers');
    }
};