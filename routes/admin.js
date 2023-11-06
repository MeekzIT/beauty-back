var express = require("express");
var router = express.Router();
const adminController = require("../controllers/admin");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/login", adminController.login);
router.get("/", authAdminMiddleWare, adminController.getMe);
router.post("/logout", authAdminMiddleWare, adminController.logout);
router.post("/destroyAll", authAdminMiddleWare, adminController.destroyAll);

module.exports = router;


//  admini mot sax gorc hanel +
//  ditel ardzyunqnery adminumel  
//  caxser -> ahxatavardz  +
//  ashxatoxi anun detailum +
//  + jam +
