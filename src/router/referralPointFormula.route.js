const { Router } = require("express");
const { referralPointFormulaController } = require("../controller");
const { register_route } = require("../utils/reg_routes");
const router = Router();

register_route({
  router,
  route: "/all",
  auth_enable: false,
  admin_auth_enable: false,
  get_method: referralPointFormulaController.getAlls,
});

register_route({
  router,
  route: "/:id",
  auth_enable: false,
  admin_auth_enable: false,
  get_method: referralPointFormulaController.getOne,
});

register_route({
  router,
  route: "/add",
  auth_enable: true,
  admin_auth_enable: true,
  post_method: referralPointFormulaController.createOne,
});

register_route({
  router,
  route: "/update/:id", // This will conflict with the GET route for `/:id`
  auth_enable: true,
  admin_auth_enable: true,
  patch_method: referralPointFormulaController.updateOne,
});

register_route({
  router,
  route: "/delete/:id", // This will also conflict with the above PATCH route
  auth_enable: true,
 admin_auth_enable: true,
  delete_method: referralPointFormulaController.deleteOne,
});

module.exports = router;
