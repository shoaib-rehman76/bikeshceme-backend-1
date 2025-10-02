const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const { required } = require("joi");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    deadline: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    isWinner:{
      type:Boolean,
      default:false
    },
    isLoser:{
      type:Boolean,
      default:false
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
