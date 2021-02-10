import { DataTypes, QueryInterface, Sequelize } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    return queryInterface.createTable(
      "Events",
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        createAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        eventType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        entityType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        entityId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        payload: {
          type: DataTypes.JSON,
          allowNull: false,
        },
      },
      {
        logging: (sql) => {
          console.log({ sql });
        },
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  },

  down: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    return queryInterface.dropTable("Events");
  },
};
