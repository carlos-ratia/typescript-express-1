"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Brand",
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Brand");
  },
};
