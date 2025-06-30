const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const applyForSchemeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    easyPaisaTrd: {
      type: String,
      required: true,
      unique:true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
address:{
  type:String,
  required:true
},
phoneNumber:{
  type:String,
  required:true
},
userName:{
  type:String,
  required:true
},

userEmail:{
  type:String,
  required:true
},




whatssapp:{
  type:String,
  required:true
},
    approvedAt: {
      type: Date,
    },
    rejectedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

applyForSchemeSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    if (this.status === "approved") {
      this.approvedAt = new Date();
      this.rejectedAt = null; // clear rejected date
    } else if (this.status === "rejected") {
      this.rejectedAt = new Date();
      this.approvedAt = null; // clear approved date
    } else {
      this.approvedAt = null;
      this.rejectedAt = null;
    }
  }
  next();
});
applyForSchemeSchema.plugin(paginate);
applyForSchemeSchema.plugin(toJSON);
module.exports = mongoose.model("applyForSchemes", applyForSchemeSchema);
