const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  googleBooksId: { type: String, required: true },
  title: { type: String, required: true },
  authors: [String],
  description: String,
  imageUrl: String,
  userId: { type: String, required: true },
  readStatus: { type: String, enum: ['past', 'current', 'wishlist'], required: true },
  userRating: { type: Number, min: 1, max: 5 },
  userReview: { type: String},
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;