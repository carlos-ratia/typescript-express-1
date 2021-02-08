import { DataTypes, QueryInterface, Sequelize } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    return queryInterface
      .createTable(
        "BrandWatchDog",
        {
          id: {
            type: DataTypes.STRING,
            primaryKey: true,
          },
          brandId: {
            type: DataTypes.STRING(40),
            allowNull: false,
          },
          createAt: {
            type: DataTypes.TIME,
            allowNull: false,
          },
          operation: {
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
      )
      .then(() => {
        return queryInterface.addConstraint("BrandWatchDog", {
          logging: (sql) => {
            console.log({ sql });
          },
          name: "fk_brand_brandId_id_2",
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
    return queryInterface.dropTable("BrandWatchDog");
  },
};
