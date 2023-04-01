const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("users", "session", {
      type: DataTypes.TEXT,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("users", "session");
  },
};
