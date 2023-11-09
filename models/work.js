"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Work extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Work.init(
    {
      serviceId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      access: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Work",
    }
  );

  let Service = sequelize.define("Service");

  Work.belongsTo(Service, {
    foreignKey: "serviceId",
  });

  return Work;
};
