const mongoose = require('mongoose');

const { Schema } = mongoose;

const MovieSchema = Schema(
  {
    title: String,
    classification: String,
    duration: Number,
    category: String,
    sinopsis: String,
    actor: String,
    director: String,
    schedule: Date,

  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('Movie', MovieSchema);
