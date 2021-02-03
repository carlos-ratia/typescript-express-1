"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Brand", "id", {
      type: Sequelize.STRING(40),
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Brand", "id", {
      type: Sequelize.STRING(255),
    });
  },
};
