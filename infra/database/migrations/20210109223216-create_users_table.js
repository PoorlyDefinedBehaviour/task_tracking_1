module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("users", {
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable("users"),
}
