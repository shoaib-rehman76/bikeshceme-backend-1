const { Router } = require("express");
const { walletController } = require("../controller");
const { register_route } = require("../utils/reg_routes");
const router = Router();

register_route({
  router,
  route: "/all",
  auth_enable: false,
  admin_auth_enable: false,
  get_method: walletController.getAlls,
});

register_route({
  router,
  route: "/:id",
  auth_enable: false,
  admin_auth_enable: false,
  get_method: walletController.getOne,
});

register_route({
  router,
  route: "/add",
  auth_enable: true,
  admin_auth_enable: true,
  services_provider_admin_auth_enable: true,
  post_method: walletController.createOne,
});

register_route({
  router,
  route: "/update/:id", // This will conflict with the GET route for `/:id`
  auth_enable: true,
  services_provider_admin_auth_enable: true,
  patch_method: walletController.updateOne,
});

register_route({
  router,
  route: "/delete/:id", // This will also conflict with the above PATCH route
  auth_enable: true,
  services_provider_admin_auth_enable: true,
  delete_method: walletController.deleteOne,
});

module.exports = router;
