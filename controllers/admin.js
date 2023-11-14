const Admin = require("../models").Admin;
const SuperAdmin = require("../models").SuperAdmin;
const User = require("../models").User;
const Service = require("../models").Service;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.json({
        error: ["Password and email are required fields"],
      });
    }

    const superAdmin = await SuperAdmin.findOne({
      where: { email: email.toLowerCase() },
    });

    if (superAdmin && (await bcrypt.compare(password, superAdmin.password))) {
      const token = jwt.sign(
        { user_id: superAdmin.id, email, role: superAdmin.role },
        process.env.TOKEN_KEY_ADMIN
      );
      superAdmin.token = token;
      superAdmin.save();
      return res.json({ data: superAdmin, succes: true });
    }

    const user = await Admin.findOne({
      where: { email: email.toLowerCase() },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email, role: user.role },
        process.env.TOKEN_KEY_ADMIN
      );
      user.token = token;
      user.save();
      return res.json({ data: user, succes: true });
    }

    return res.json({ error: ["Invalid credentials"] });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const logout = async (req, res) => {
  try {
    const { user_id, role } = req.user;
    const { email } = req.body;

    if (role == "admin") {
      const user = await Admin.findOne({ where: { email } });
      user.token = null;
      await user.save();
      return res.json({ succes: true });
    } else if (role == "superAdmin") {
      const user = await SuperAdmin.findOne({ where: { email } });
      user.token = null;
      await user.save();
      return res.json({ succes: true });
    }
    return res.json({ error: ["Invalid credentials"] });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getMe = async (req, res) => {
  try {
    const { user_id, role } = req.user;
    const { email } = req.query;
    if (role == "admin") {
      const user = await Admin.findOne({ where: { email } });
      return res.json({ succes: true, data: user });
    } else if (role == "superAdmin") {
      const user = await SuperAdmin.findOne({ where: { email } });
      return res.json({ succes: true, data: user });
    }
    return res.json({ error: ["Invalid credentials"] });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const destroyAll = async (req, res) => {
  try {
    await User.destroy({
      where: {},
      truncate: true,
    });
    await Service.destroy({
      where: {},
      truncate: true,
    });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAdmin = async (req, res) => {
  try {
    const { user_id } = req.user;
    const user = await Admin.findOne({ where: { id: user_id } });
    return res.json({ succes: true, data: user });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const editAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const superAdmin = await SuperAdmin.findOne({
      where: { email: email.toLowerCase() },
    });
    let encryptedPassword = await bcrypt.hash(password, 10);
    if (superAdmin) {
      superAdmin.name = name;
      superAdmin.email = email;
      superAdmin.password = encryptedPassword;
      superAdmin.save();
      return res.json({ data: superAdmin, succes: true });
    }

    const user = await Admin.findOne({
      where: { email: email.toLowerCase() },
    });

    if (user) {
      superAdmin.name = name;
      superAdmin.email = email;
      superAdmin.password = encryptedPassword;
      user.save();
      return res.json({ data: user, succes: true });
    }

    return res.json({ error: ["Invalid credentials"] });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  login,
  logout,
  destroyAll,
  getMe,
  getAdmin,
  editAdmin,
};
