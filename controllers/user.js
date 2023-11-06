const User = require("../models").User;
const Work = require("../models").Work;
const Service = require("../models").Service;
const { Op } = require("sequelize");

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.create({ name });
    return res.json({ succes: true, data: user });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const derleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findOne({ where: { id } });
    await user.destroy();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAll = async (req, res) => {
  try {
    const user = await User.findAll();
    return res.json({ succes: true, data: user });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getSingle = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findOne({
      where: { id },
    });
    return res.json({ succes: true, data: user });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const addWWork = async (req, res) => {
  try {
    const { serviceId, userId } = req.body;
    const work = await Work.create({
      serviceId,
      userId,
    });
    return res.json({ succes: true, data: work });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const derleteWork = async (req, res) => {
  try {
    const { id } = req.body;

    const work = await Work.findOne({ where: { id } });
    await work.destroy();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getWork = async (req, res) => {
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
    if (userId) {
      queryObj["userId"] = {
        [Op.eq]: userId,
      };
    }
    const works = await Work.findAll({
      where: { ...queryObj },
      include: [
        {
          model: Service,
        },
      ],
    });
    const result = {
      all: 0,
      benefit: 0,
      cantora: 0,
    };
    await works.map((item) => {
      // const thisSevice = await Service.findOne({
      //   where: { id: item.serviceId },
      // });

      result.all = result.all + Number(item.Service.price);
      result.benefit = result.benefit + Number(item.Service.benefit);
      result.cantora =
        result.cantora +
        Number(item.Service.price) -
        Number(item.Service.benefit);
    });
    return res.json({ succes: true, date: result });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  derleteUser,
  getAll,
  getSingle,
  addWWork,
  derleteWork,
  getWork,
};
