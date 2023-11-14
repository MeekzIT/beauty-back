const User = require("../models").User;
const Work = require("../models").Work;
const Service = require("../models").Service;
const { Op } = require("sequelize");

const create = async (req, res) => {
  try {
    const { name, type } = req.body;
    const { user_id } = req.user;

    const user = await User.create({ name, type, superId: user_id });
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
    const { user_id } = req.user;
    const user = await User.findAll({ where: { superId: user_id } });
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
    const { user_id } = req.user;

    const work = await Work.create({
      serviceId,
      userId,
      access: false,
      superId: user_id,
    });
    const thisWork = await Work.findOne({
      where: { id: work.id },
      include: [
        {
          model: Service,
        },
      ],
    });
    return res.json({ succes: true, data: thisWork });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const derleteWork = async (req, res) => {
  try {
    const { id } = req.body;
    const { role } = req.user;

    const work = await Work.findOne({ where: { id } });
    if (role == "admin") {
      work.access = true;
      await work.save();
      return res.json({ succes: true });
    } else if (role == "superAdmin") {
      await work.destroy();
      return res.json({ succes: true });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getWork = async (req, res) => {
  try {
    const { userId, date, start, end } = req.query;
    const { role, user_id } = req.user;

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
    if (start && end && role == "superAdmin") {
      queryObj["createdAt"] = {
        [Op.between]: [start, end],
      };
    }
    if (userId) {
      queryObj["userId"] = {
        [Op.eq]: userId,
      };
    }
    if (role == "admin") {
      queryObj["access"] = {
        [Op.eq]: false,
      };
    }
    const works = await Work.findAll({
      where: { ...queryObj, superId: user_id },
      include: [
        {
          model: Service,
        },
      ],
    });
    return res.json({ succes: true, date: works });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const calcWork = async (req, res) => {
  try {
    const { userId, date, start, end } = req.query;
    const { role, user_id } = req.user;

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);
    let queryObj = {};
    if (date) {
      // if (role == "admin") {
      //   queryObj["createdAt"] = {
      //     [Op.between]: [startOfMonth, endOfMonth],
      //   };
      // } else {
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
      // }
    }
    if (start && end && role == "superAdmin") {
      queryObj["createdAt"] = {
        [Op.between]: [start, end],
      };
    }
    if (userId) {
      queryObj["userId"] = {
        [Op.eq]: userId,
      };
    }
    const works = await Work.findAll({
      where: { ...queryObj, superId: user_id },
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

const getAccessedWork = async (req, res) => {
  try {
    const works = await Work.findAll({
      where: { access: true },
      include: [
        {
          model: Service,
        },
      ],
    });
    return res.json({ succes: true, date: works });
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
  calcWork,
  getAccessedWork,
};
