const express = require("express");
const userRouter = require("./user.route");
const authRouter = require("./auth.route");
const productRouter = require("./product.route");
const giftRouter = require("./gift.route");
const easyPaisaNumberForAdminRouter = require("./easyPaisaNumberForAdmin.route");
const ApplyForSchemeRouter = require("./ApplyForScheme.route");
const referralPointFormula = require("./referralPointFormula.route");
const walletRouter = require("./wallet.route");
const referralhistoryRoute = require("./referralHistory.route");
const currentPointRoute = require("./currentPoint.route");

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
  {
    path: "/referralPointFormula",
    route: referralPointFormula,
  },
  {
    path: "/referralHistory",
    route: referralhistoryRoute,
  },
  {
    path: "/currentPoint",
    route: currentPointRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
