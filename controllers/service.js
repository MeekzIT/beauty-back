const Service = require("../models").Service;
const { Op } = require("sequelize");

const create = async (req, res) => {
  try {
    const { userId, name, price, benefit } = req.body;
    const user = await Service.create({ userId, name, price, benefit });
    return res.json({ succes: true, data: user });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const derleteService = async (req, res) => {
  try {
    const { id } = req.body;

    const service = await Service.findOne({ where: { id } });
    await service.destroy();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const editService = async (req, res) => {
  try {
    const { id, name, price, benefit } = req.body;
    const service = await Service.findOne({ where: { id } });
    await service.update({ name, price, benefit });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getServiceOfUser = async (req, res) => {
  try {
    const { userId, date } = req.query;
    let queryObj = {};
    if (date) {
      queryObj["createdAt"] = {
        [Op.between]: [
          new Date(
            new Date(date).getFullYear(),
            new Date(date).getMonth(),
            new Date(date).getDate()
          ),
          new Date(
            new Date(date).getFullYear(),
            new Date(date).getMonth(),
            new Date(date).getDate() + 1
          ),
        ],
      };
    }
    const service = await Service.findAll({ where: { ...queryObj, userId } });
    return res.json({ succes: true, date: service });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const calcServiceOfUser = async (req, res) => {
  try {
    const { userId, date } = req.query;
    let queryObj = {};
    if (date) {
      queryObj["createdAt"] = {
        [Op.between]: [
          new Date(
            new Date(date).getFullYear(),
            new Date(date).getMonth(),
            new Date(date).getDate()
          ),
          new Date(
            new Date(date).getFullYear(),
            new Date(date).getMonth(),
            new Date(date).getDate() + 1
          ),
        ],
      };
    }
    const service = await Service.findAll({ where: { ...queryObj, userId } });
    const result = {
      all: 0,
      benefit: 0,
      cantora: 0,
    };
    await service.map((item) => {
      result.all = result.all + Number(item.price);
      result.benefit = result.benefit + Number(item.benefit);
      result.cantora =
        result.cantora + Number(item.price) - Number(item.benefit);
    });
    return res.json({ succes: true, date: result });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  derleteService,
  editService,
  getServiceOfUser,
  calcServiceOfUser,
};
