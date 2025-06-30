const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const easyPaisaNumberForAdminSchema = new mongoose.Schema(
  {
    easyPaisaNumber: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    title: { type: String, required: true },
  },
  { timestamps: true }
);
easyPaisaNumberForAdminSchema.plugin(paginate);
easyPaisaNumberForAdminSchema.plugin(toJSON);
module.exports = mongoose.model(
  "easyPaisaNumberForAdmin",
  easyPaisaNumberForAdminSchema
);
