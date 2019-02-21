const { ObjectID } = require('mongodb');
const { Book } = require('../../models/book');
const { Comment } = require('../../models/comment');

const books = [
  {
    _id: new ObjectID(),
    title: 'book1',
    commentcount: 2,
  },
  {
    _id: new ObjectID(),
    title: 'book2',
    commentcount: 2,
  },
];

const comments = [
  {
    _id: new ObjectID(),
    description: 'comment1.1',
    bookName: 'book1',
  },
  {
    _id: new ObjectID(),
    description: 'comment1.2',
    bookName: 'book1',
  },
  {
    _id: new ObjectID(),
    description: 'comment2.1',
    bookName: 'book2',
  },
  {
    _id: new ObjectID(),
    description: 'comment2.2',
    bookName: 'book2',
  },
];

const populateBookCollection = (done) => {
  Book.deleteMany({}).then(() => {
    Book.insertMany(books).then(() => done());
  });
};

const populateCommentCollection = (done) => {
  Comment.deleteMany({}).then(() => {
    Comment.insertMany(comments).then(() => done());
  });
};

module.exports = {
  populateBookCollection, populateCommentCollection, books, comments,
};
