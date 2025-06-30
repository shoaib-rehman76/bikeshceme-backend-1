const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    description: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(paginate);
productSchema.plugin(toJSON);

module.exports = mongoose.model("products", productSchema);
