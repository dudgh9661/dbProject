'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('charges', {
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
                references: {
                    model: 'customer',
                    key: 'customerCode'
                }
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
        return queryInterface.dropTable('charges');
    }
};