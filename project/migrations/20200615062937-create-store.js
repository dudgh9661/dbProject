'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('store', {
            storeCode: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER(20)
            },
            regionCode: {
                allowNull: false,
                type: Sequelize.INTEGER(20),
                references: {
                    model: 'region',
                    key: 'regionCode'
                }

            },
            storeName: {
                allowNull: false,
                type: Sequelize.STRING(20)
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
        return queryInterface.dropTable('stores');
    }
};