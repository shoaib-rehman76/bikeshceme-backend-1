const { Router } = require("express");
const passport = require("passport");
const { authController } = require("../controller");
const { protect, restrictTo } = require("../middlewares/authRole");
const { register_route } = require("../utils/reg_routes");
const router = Router();

// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false, failureRedirect: "/" }),
//   authController.googleAuthCallback
// );

register_route({
  router,
  route: "/register",
  post_method: authController.register,
});

register_route({
  router,
  route: "/login",
  post_method: authController.login,
});

register_route({
  router,
  route: "/logout",
  post_method: authController.logout,
});
register_route({
  router,
  route: "/refresh-tokens",
  post_method: authController.refreshTokens,
});
register_route({
  router,
  route: "/forgot-password",
  post_method: authController.forgotPassword,
});
register_route({
  router,
  route: "/reset-password",
  post_method: authController.resetPassword,
});
register_route({
  router,
  route: "/verify-account",
  post_method: authController.verifyOTP,
});
register_route({
  router,
  route: "/regenerate-otp",
  post_method: authController.regenerateOTP,
});
register_route({
  router,
  route: "/change-password",
  auth_enable: true,
  post_method: authController.changePassword,
});


module.exports = router;
