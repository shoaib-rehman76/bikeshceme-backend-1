const { Router } = require("express");
const { ApplyForSchemeController } = require("../controller");
const { register_route } = require("../utils/reg_routes");
const router = Router();

register_route({
  router,
  route: "/all",
  auth_enable: true,
    get_method: ApplyForSchemeController.getAlls,
});

register_route({
  router,
  route: "/:id",
  auth_enable: true,
  get_method: ApplyForSchemeController.getOne,
});

register_route({
  router,
  route: "/add",
  auth_enable: true,
  post_method: ApplyForSchemeController.createOne,
});

register_route({
  router,
  route: "/update/:id", // This will conflict with the GET route for `/:id`
  auth_enable: true,
  services_provider_admin_auth_enable: true,
  patch_method: ApplyForSchemeController.updateOne,
});

register_route({
  router,
  route: "/delete/:id", // This will also conflict with the above PATCH route
  auth_enable: true,
  services_provider_admin_auth_enable: true,
  delete_method: ApplyForSchemeController.deleteOne,
});

module.exports = router;
