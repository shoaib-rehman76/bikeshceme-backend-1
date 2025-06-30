const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const walletSchema = new mongoose.Schema(
  {
    coin: {
      type: Number,
      default: 0,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

walletSchema.plugin(paginate);
walletSchema.plugin(toJSON);

module.exports = mongoose.model("wallets", walletSchema);
