const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClassificationSchema = Schema(
  {
    type: String,
    warning: String
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('Classification', ClassificationSchema);