const userController = require("./user.controller");
const authController = require("./auth.controller");
const productController = require("./product.controller");
const giftController = require("./gift.controller");
const ApplyForSchemeController = require("./ApplyForScheme.controller");
const walletController = require("./wallet.controller");
const easyPaisaNumberForAdminController = require("./easyPaisaNumberForAdmin.controller");
const referralPointFormulaController = require("./referralPointFormula.controller");
const referralHistoryController = require("./referralHistory.controller");
const currentPointController = require("./currentPoint.controller");

module.exports = {
  userController,
  authController,
  productController,
  giftController,
  ApplyForSchemeController,
  walletController,
  easyPaisaNumberForAdminController,
  referralPointFormulaController,
  referralHistoryController,
  currentPointController
};
