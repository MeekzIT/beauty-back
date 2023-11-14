const Category = require("../models").Category;
const User = require("../models").User;

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const { user_id } = req.user;

    const user = await Category.create({ name, superId: user_id });
    return res.json({ succes: true, data: user });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const derleteCategory = async (req, res) => {
  try {
    const { id } = req.body;

    const service = await Category.findOne({ where: { id } });
    await service.destroy();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const editCategory = async (req, res) => {
  try {
    const { id, name } = req.body;
    const service = await Category.findOne({ where: { id } });
    await service.update({ name });
    return res.json({ succes: true, data: service });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getCategoryOfAdmin = async (req, res) => {
  try {
    const { user_id } = req.user;

    const service = await Category.findAll({
      where: { superId: user_id },
      include: [
        {
          model: User,
        },
      ],
    });
    return res.json({ succes: true, date: service });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  derleteCategory,
  editCategory,
  getCategoryOfAdmin,
};
