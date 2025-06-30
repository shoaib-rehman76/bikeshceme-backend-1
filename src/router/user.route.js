const { Router } = require("express");
const { userController } = require("../controller");
const { register_route } = require("../utils/reg_routes");
const router = Router();

register_route({
  router,
  route: "/all",
  auth_enable: false,
  admin_auth_enable: false,
  get_method: userController.getUsers,
});

register_route({
  router,
  route: "/all-user",
  auth_enable: false,
  admin_auth_enable: false,
  get_method: userController.getAllUsers,
});
register_route({
  router,
  route: "/query",
  // auth_enable: true,
  // admin_auth_enable: true,
  get_method: userController.getUser,
});
register_route({
  router,
  route: "/:id",
  auth_enable: false,
  admin_auth_enable: false,
  get_method: userController.getById,
});

register_route({
  router,
  route: "/update/:id", // This will conflict with the GET route for `/:id`
  auth_enable: true,
  admin_auth_enable: true,
  patch_method: userController.updateUser,
});

register_route({
  router,
  route: "/delete/:id", // This will also conflict with the above PATCH route
  auth_enable: true,
  admin_auth_enable: true,
  delete_method: userController.deleteUsers,
});

module.exports = router;
