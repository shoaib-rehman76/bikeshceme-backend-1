const userController = require("./user.controller");
const authController = require("./auth.controller");
const productController = require("./product.controller");
const giftController = require("./gift.controller");
const ApplyForSchemeController = require("./ApplyForScheme.controller");
const walletController = require("./wallet.controller");
const easyPaisaNumberForAdminController = require("./easyPaisaNumberForAdmin.controller");

module.exports = {
  userController,
  authController,
  productController,
  giftController,
  ApplyForSchemeController,
  walletController,
  easyPaisaNumberForAdminController,
};
