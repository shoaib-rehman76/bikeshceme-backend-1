const express = require("express");
const userRouter = require("./user.route");
const authRouter = require("./auth.route");
const productRouter = require("./product.route");
const giftRouter = require("./gift.route");
const easyPaisaNumberForAdminRouter = require("./easyPaisaNumberForAdmin.route");
const ApplyForSchemeRouter = require("./ApplyForScheme.route");
const walletRouter = require("./wallet.route");

const router = express.Router();
const defaultRoutes = [
  {
    path: "/users",
    route: userRouter,
  },

  {
    path: "/auth",
    route: authRouter,
  },

  {
    path: "/product",
    route: productRouter,
  },
  {
    path: "/gift",
    route: giftRouter,
  },
  {
    path: "/easyPaisaNumberForAdmin",
    route: easyPaisaNumberForAdminRouter,
  },

  {
    path: "/ApplyForScheme",
    route: ApplyForSchemeRouter,
  },
  {
    path: "/wallet",
    route: walletRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
