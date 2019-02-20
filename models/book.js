const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  commentcount: {
    type: Number,
    required: true,
    default: 0
  }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = { Book };
