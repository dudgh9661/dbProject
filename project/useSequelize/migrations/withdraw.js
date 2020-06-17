'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('withdraw', {
            regionCode: {
                allowNull: false,
                type: Sequelize.INTEGER(20),
                references: {
                    model: 'region',
                    key: 'regionCode'
                }
            },
            storeCode: {
                allowNull: false,
                type: Sequelize.INTEGER(20),
                references: {
                    model: 'store',
                    key: 'storeCode'
                }
            },
            withrawCode: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER(20)
            },
            withrawMoney: {
                allowNull: false,
                type: Sequelize.INTEGER(20)
            },
            date: {
                allowNull: false,
                type: Sequelize.DATE
            },
        });
        down: (queryInterface, Sequelize) => {
            return queryInterface.dropTable('withdraw');
        }
    }
};