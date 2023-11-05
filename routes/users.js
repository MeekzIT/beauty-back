var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");
const serviceController = require("../controllers/service");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/", authAdminMiddleWare, userController.create);
router.post("/destroy", authAdminMiddleWare, userController.derleteUser);
router.get("/", authAdminMiddleWare, userController.getAll);
router.get("/single", authAdminMiddleWare, userController.getSingle);
router.get("/user-service", serviceController.getServiceOfUser);
router.get("/calc-service", serviceController.calcServiceOfUser);

module.exports = router;
