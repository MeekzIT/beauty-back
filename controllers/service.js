const Service = require("../models").Service;

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
    return res.json({ succes: true, data: service });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getServiceOfUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const service = await Service.findAll({ where: { userId } });
    return res.json({ succes: true, date: service });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  derleteService,
  editService,
  getServiceOfUser,
};
