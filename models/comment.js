const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment };
