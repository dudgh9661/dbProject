'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('store', {
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
                primaryKey: true,
                type: Sequelize.INTEGER(20)
            },
            storeName: {
                allowNull: false,
                type: Sequelize.STRING(50)
            },
            storePhone: {
                allowNull: false,
                type: Sequelize.INTEGER(20)
            },
            revenue: {
                allowNull: false,
                type: Sequelize.INTEGER(20)
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('store');
    }
};