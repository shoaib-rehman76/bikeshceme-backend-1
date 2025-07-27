const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require('crypto'); 
const bcrypt= require('bcrypt');
const { toJSON, paginate } = require("./plugins");
const roles = require("../config/role");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },

    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true,
    },

    contact: {
      type: String,
      // required: true,
      // validate: {
      //   validator: function(v) {
      //     return /^(\+92|0)?[3][0-9]{2}[0-9]{7}$/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid Pakistani phone number!`
      // }
    },
    role: {
      type: String,
      enum: [roles.ADMIN, roles.USER],
      default: "user",
      
    },
    isEmailVerified: {
      type: Boolean,
      default: true,
    },

    otp: {
      type: Number,
    },

    image: {
      type: String,
      default: "",
    },

    isBlock: {
      type: Boolean,
      default: false,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
      default: "",
    },
      isReferrel: {
    type: Boolean,
  },
    referrerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: null

  },

    referralCode: {
    type: String,
    default: ''
  },
  },

  {
    timestamps: true,
  }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });
userSchema.pre("save", async function (next) {
  const user = this;
  // Generate unique referral code if not already set
  if (!user.referralCode) {
    const randomCode = crypto.randomBytes(4).toString("hex"); // generates like "a1b2c3d4"
    user.referralCode = randomCode.toUpperCase();
  }

  next();
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8); // ✅ hash only once here
  }
  next();
});

userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password); // ✅ compare correctly
};
const User = mongoose.model("users", userSchema);

module.exports = User;
