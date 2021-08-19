const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
  {
    movieTitle: { type: String, required: true, unique: true },
    movieDescription: { type: String, required: true, unique: true },
    img: { type: String },
    imgTitle: { type: String },
    imgThumbnail: { type: String },
    movieTrailer: { type: String },
    video: { type: String },
    movieReleasedYear: { type: String },
    ageLimit: { type: Number },
    movieGenre: { type: String },
    isSeries: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', MovieSchema);
