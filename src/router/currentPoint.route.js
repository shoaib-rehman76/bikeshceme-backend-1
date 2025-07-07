const { Router } = require("express");
const { currentPointController } = require("../controller");
const { register_route } = require("../utils/reg_routes");
const router = Router();

register_route({
  router,
  route: "/all",
  auth_enable: true,
  get_method: currentPointController.getAlls,
});

register_route({
  router,
  route: "/:id",
  auth_enable: true,
  admin_auth_enable: false,
  get_method: currentPointController.getOne,
});

register_route({
  router,
  route: "/add",
  auth_enable: true,
  admin_auth_enable: true,
  post_method: currentPointController.createOne,
});

register_route({
  router,
  route: "/update/:id", // This will conflict with the GET route for `/:id`
  auth_enable: true,
  admin_auth_enable: true,
  patch_method: currentPointController.updateOne,
});

register_route({
  router,
  route: "/delete/:id", // This will also conflict with the above PATCH route
  auth_enable: true,
 admin_auth_enable: true,
  delete_method: currentPointController.deleteOne,
});

module.exports = router;
