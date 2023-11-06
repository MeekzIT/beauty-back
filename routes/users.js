var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");
const serviceController = require("../controllers/service");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/", authAdminMiddleWare, userController.create);
router.post("/destroy", authAdminMiddleWare, userController.derleteUser);
router.get("/", authAdminMiddleWare, userController.getAll);
router.get("/single", userController.getSingle);
router.get("/user-service", serviceController.getServiceOfUser);
router.post("/destroy-user-service", serviceController.derleteService);
router.post("/edit-user-service", serviceController.editService);
router.post("/add-user-service", serviceController.create);

router.post("/add-user-work", userController.addWWork);
router.post("/destroy-user-work", userController.derleteWork);
router.get("/get-user-work", userController.getWork);

// router.get("/calc-service", serviceController.calcServiceOfUser);

module.exports = router;
