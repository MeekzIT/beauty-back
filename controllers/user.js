const User = require("../models").User;

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

module.exports = {
  create,
  derleteUser,
  getAll,
  getSingle,
};
