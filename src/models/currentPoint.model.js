const mongoose = require('mongoose');
const { paginate, toJSON } = require('./plugins');

const { Schema } = mongoose;

const CurrentPointSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  currentPoint: {
    type: Number,
  },
  equivalenceRupees: {
    type: Number,
  },
  isActive: {
    type: Boolean,
  },
}, { timestamps: true });

// Add pagination plugin
CurrentPointSchema.plugin(paginate);
CurrentPointSchema.plugin(toJSON);

// Export the model
const CurrentPointModel = mongoose.model('currentpoints', CurrentPointSchema);
module.exports = CurrentPointModel;
