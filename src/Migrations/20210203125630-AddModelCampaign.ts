import { DataTypes, QueryInterface, Sequelize } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    return queryInterface
      .createTable(
        "Campaign",
        {
          id: {
            type: DataTypes.STRING,
            primaryKey: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          brandId: {
            type: DataTypes.STRING(40),
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
      )
      .then(() => {
        return queryInterface.addConstraint("Campaign", {
          logging: (sql) => {
            console.log({ sql });
          },
          name: "fk_brand_brandId_id",
          fields: ["brandId"],
          type: "foreign key",
          references: {
            table: "Brand",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "no action",
        });
      });
  },

  down: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    return queryInterface.dropTable("Campaign", {
      logging: (sql) => {
        console.log({ sql });
      },
    });
  },
};
