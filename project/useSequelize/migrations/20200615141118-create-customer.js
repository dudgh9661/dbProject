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
                type: Sequelize.INTEGER(20),
                primarykey: true
            },
            account: {
                allowNull: false,
                type: Sequelize.INTEGER(30)
            },
            usedMoney: {
                type: Sequelize.INTEGER(30)
            },
            chargedMoney: {
                type: Sequelize.INTEGER(30)
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('customer');
    }
};