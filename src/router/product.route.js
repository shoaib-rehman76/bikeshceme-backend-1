const { Router } = require("express");
const { productController } = require("../controller");
const { register_route } = require("../utils/reg_routes");
const router = Router();

register_route({
  router,
  route: "/all",
  auth_enable: false,
  admin_auth_enable: false,
  get_method: productController.getAlls,
});

register_route({
  router,
  route: "/:id",
  auth_enable: false,
  admin_auth_enable: false,
  get_method: productController.getOne,
});

register_route({
  router,
  route: "/add",
  auth_enable: true,
  admin_auth_enable: true,
  services_provider_admin_auth_enable: true,
  post_method: productController.createOne,
});

register_route({
  router,
  route: "/update/:id", // This will conflict with the GET route for `/:id`
  auth_enable: true,
  services_provider_admin_auth_enable: true,
  patch_method: productController.updateOne,
});

register_route({
  router,
  route: "/status/:id", // This will conflict with the GET route for `/:id`
  auth_enable: true,
  services_provider_admin_auth_enable: true,
  patch_method: productController.updateProductStatusByIds,
});

register_route({
  router,
  route: "/delete/:id", // This will also conflict with the above PATCH route
  auth_enable: true,
  services_provider_admin_auth_enable: true,
  delete_method: productController.deleteOne,
});

module.exports = router;
