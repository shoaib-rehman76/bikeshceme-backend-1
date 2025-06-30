const authService = require("./auth.service");
const userService = require("./user.services");
const tokenService = require("./token.service");
const productServices = require("./product.service");
const emailService = require("./email.service");
const giftService = require("./gift.service");
const ApplyForSchemeService = require("./applyForScheme.service");
const easyPaisaNumberForAdminService = require("./easyPaisaNumberForAdmin.service");
const walletService = require("./walletService");

module.exports = {
  authService,
  userService,
  tokenService,
  emailService,
  productServices,
  giftService,
  ApplyForSchemeService,
  easyPaisaNumberForAdminService,
  walletService,
};
