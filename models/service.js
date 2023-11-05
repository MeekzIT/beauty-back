"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Service.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      benefit: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Service",
    }
  );

  let User = sequelize.define("User");

  Service.belongsTo(User, {
    foreignKey: "id",
  });

  return Service;
};
