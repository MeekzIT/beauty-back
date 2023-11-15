var express = require("express");
var router = express.Router();
const adminController = require("../controllers/admin");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/login", adminController.login);
router.get("/", authAdminMiddleWare, adminController.getMe);
router.post("/logout", authAdminMiddleWare, adminController.logout);
router.post("/destroyAll", authAdminMiddleWare, adminController.destroyAll);
router.get("/get-admin", authAdminMiddleWare, adminController.getAdmin);
router.post("/edit", authAdminMiddleWare, adminController.editAdmin);

module.exports = router;

//  admini mot sax gorc hanel +
//  ditel ardzyunqnery adminumel
//  caxser -> ahxatavardz  +
//  ashxatoxi anun detailum +
//  + jam +
