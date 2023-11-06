"use strict";
const data = require("../mock/work");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Works", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Works", null, {});
  },
};
