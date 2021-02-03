"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable(
        "Campaign",
        {
          id: {
            type: Sequelize.STRING,
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          brandId: {
            type: Sequelize.STRING(40),
            allowNull: false,
            //TODO: COMO REALIZARLO
            // references: 'Brand', // <<< Note, its table's name, not object name
            // referencesKey: 'id' // <<< Note, its a column name
          },
        },
        {
          charset: "utf8mb4",
          collate: "utf8mb4_general_ci",
        }
      );
        await queryInterface.sequelize.query(
          "ALTER TABLE `Campaign` ADD CONSTRAINT `fk_campaing_brand` FOREIGN KEY (`brandId`) REFERENCES `Brand` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;"
        );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Campaign");
  },
};
