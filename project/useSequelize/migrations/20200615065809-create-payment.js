
'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('payment', {
            regionCode: {
                allowNull: false,
                type: Sequelize.INTEGER(20),
            },
            customerCode: {
                allowNull: false,
                type: Sequelize.INTEGER(20),

            },
            storeCode: {
                allowNull: false,
                type: Sequelize.INTEGER(20),

            },
            paymentCode: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER(20)

            },
            price: {
                allowNull: false,
                type: Sequelize.INTEGER(20)
            },
            date: {
                allowNull: false,
                type: Sequelize.DATE
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('payments');
    }
};