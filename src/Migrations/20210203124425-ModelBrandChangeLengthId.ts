import { DataTypes, QueryInterface, Sequelize } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, _Sequelize: Sequelize) => {
    return queryInterface.changeColumn("Brand", "id", {
      type: DataTypes.STRING(40),
    });
  },

  down: async (queryInterface: QueryInterface, _Sequelize: Sequelize) => {
    return queryInterface.changeColumn("Brand", "id", {
      type: DataTypes.STRING(255),
    });
  },
};
