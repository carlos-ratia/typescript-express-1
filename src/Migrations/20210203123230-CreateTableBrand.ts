import { DataTypes, QueryInterface, Sequelize } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    return queryInterface.createTable(
      "Brand",
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        logging: (sql) => console.log({ sql }),
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  },

  down: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    return queryInterface.dropTable("Brand");
  },
};
