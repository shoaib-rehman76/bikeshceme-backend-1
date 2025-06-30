const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const giftSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);
giftSchema.plugin(paginate);
giftSchema.plugin(toJSON);
module.exports = mongoose.model("gifts", giftSchema);
