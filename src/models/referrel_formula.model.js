const mongoose = require('mongoose');

const { toJSON,paginate } = require('./plugins');

const { Schema } = mongoose;

const referral_points_formula = new Schema({
  type: {
    type: String,
    enum: ['referral', 'reward'],
    required: true,
  },
  earnPoint: {  // Points earned by the user for referring 4point == 1rupee
    type: Number,
  },

  equivalenceRupees: {
    type: Number,
  },
  isActive: {
    type: Boolean,
  },
},
  { timestamps: true });

// Add pagination plugin
referral_points_formula.plugin(paginate);
referral_points_formula.plugin(toJSON);

// Export the model
const ReferralPointsModel = mongoose.model('referral_points_formula', referral_points_formula);
module.exports = ReferralPointsModel;
