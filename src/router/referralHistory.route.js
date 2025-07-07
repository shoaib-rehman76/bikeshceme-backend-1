const { Router } = require("express");
const { referralHistoryController } = require("../controller");
const { register_route } = require("../utils/reg_routes");
const router = Router();

register_route({
  router,
  route: "/all",
  auth_enable: true,
  get_method: referralHistoryController.getAlls,
});

register_route({
  router,
  route: "/:id",
  auth_enable: true,
  admin_auth_enable: false,
  get_method: referralHistoryController.getOne,
});

register_route({
  router,
  route: "/add",
  auth_enable: true,
  admin_auth_enable: true,
  post_method: referralHistoryController.createOne,
});

register_route({
  router,
  route: "/update/:id", // This will conflict with the GET route for `/:id`
  auth_enable: true,
  admin_auth_enable: true,
  patch_method: referralHistoryController.updateOne,
});

register_route({
  router,
  route: "/delete/:id", // This will also conflict with the above PATCH route
  auth_enable: true,
 admin_auth_enable: true,
  delete_method: referralHistoryController.deleteOne,
});

module.exports = router;
