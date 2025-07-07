const mongoose = require('mongoose');

const { toJSON,paginate } = require('./plugins');

const { Schema } = mongoose;

const ReferralSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  referrerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  referralCode: String,
  referralDate: {
    type: Date,
    default: Date.now,
  },
  isActive: Boolean, 
  reward: Number, // Points earned by the user for referring 4point == 1rupee
  equivalenceRupees: { // Equivalent amount in rupees for the points earned ==
    type: Number,
  },
}, { timestamps: true });

ReferralSchema.plugin(paginate);
ReferralSchema.plugin(toJSON);

const ReferralHistoryModel = mongoose.model('referralhistories', ReferralSchema);
module.exports = ReferralHistoryModel;
