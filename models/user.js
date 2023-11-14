"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.INTEGER,
      superId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  let Service = sequelize.define("Service");
  let Category = sequelize.define("Category");
  User.belongsTo(Category, {
    foreignKey: "id",
  });
  User.hasMany(Service, {
    foreignKey: "userId",
  });
  return User;
};
