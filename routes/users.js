var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");
const serviceController = require("../controllers/service");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/", authAdminMiddleWare, userController.create);
router.post("/destroy", authAdminMiddleWare, userController.derleteUser);
router.get("/", authAdminMiddleWare, userController.getAll);
router.get("/single", authAdminMiddleWare, userController.getSingle);
router.get(
  "/user-service",
  authAdminMiddleWare,
  serviceController.getServiceOfUser
);
router.post(
  "/destroy-user-service",
  authAdminMiddleWare,
  serviceController.derleteService
);
router.post(
  "/edit-user-service",
  authAdminMiddleWare,
  serviceController.editService
);
router.post("/add-user-service", authAdminMiddleWare, serviceController.create);

router.post("/add-user-work", authAdminMiddleWare, userController.addWWork);
router.post(
  "/destroy-user-work",
  authAdminMiddleWare,
  userController.derleteWork
);
router.get("/get-user-work", authAdminMiddleWare, userController.getWork);
router.get(
  "/get-user-access-work",
  authAdminMiddleWare,
  userController.getAccessedWork
);

router.get("/calc-service", authAdminMiddleWare, userController.calcWork);

module.exports = router;
