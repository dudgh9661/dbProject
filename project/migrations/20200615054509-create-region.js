'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('region', {
            regionCode: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER(20)
            },
            regionName: {
                allowNull: false,
                type: Sequelize.STRING(20)
            },
            monthLimit: {
                allowNull: false,
                type: Sequelize.INTEGER(20)
            },
            discountRate: {
                allowNull: false,
                type: Sequelize.INTEGER(20)
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('region');
    }
};