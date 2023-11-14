var express = require("express");
var router = express.Router();
const categoryController = require("../controllers/category");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/", authAdminMiddleWare, categoryController.create);
router.post(
  "/destroy",
  authAdminMiddleWare,
  categoryController.derleteCategory
);
router.get("/", authAdminMiddleWare, categoryController.getCategoryOfAdmin);

module.exports = router;
