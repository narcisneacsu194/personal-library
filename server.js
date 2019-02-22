const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
require('./config/config.js');
require('./db/mongoose');
const { Book } = require('./models/book');
const { Comment } = require('./models/comment');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(helmet.noCache());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));

app.post('/api/books', async (req, res) => {
  let { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).send('The title property must be provided and it should not be an empty string.');
  }

  title = title.trim();

  const book = await Book.findOne({ title });
  if (book) {
    return res.status(400).send(`A book with the title '${title}' already exists. Please try again.`);
  }

  const newBook = new Book({ title });
  const dbBook = await newBook.save();
  const finalBook = _.pick(dbBook, ['_id', 'title']);
  return res.send(finalBook);
});

app.get('/api/books', async (req, res) => {
  const books = await Book.find({});
  const finalBooks = books.map(book => _.pick(book, '_id', 'title', 'commentcount'));

  return res.send(finalBooks);
});

app.get('/api/books/:bookId', async (req, res) => {
  const { bookId } = req.params;

  if (!ObjectID.isValid(bookId)) {
    return res.status(404).send('no book exists');
  }

  const book = await Book.findById(bookId);

  if (!book) {
    return res.status(404).send('no book exists');
  }

  const finalBook = _.pick(book, ['_id', 'title']);
  const comments = await Comment.find({ bookName: finalBook.title });
  const finalComments = comments.map(comment => _.pick(comment, ['_id', 'description']));
  finalBook.comments = finalComments;
  return res.send(finalBook);
});

app.post('/api/books/:bookId', async (req, res) => {
  const { bookId } = req.params;

  if (!ObjectID.isValid(bookId)) {
    return res.status(404).send('no book exists');
  }

  const book = await Book.findById(bookId);

  if (!book) {
    return res.status(404).send('no book exists');
  }

  let { description } = req.body;

  if (!description || description.trim() === '') {
    return res.status(400).send('The description property must be provided and it should not be an empty string.');
  }

  description = description.trim();

  const comment = new Comment({ description, bookName: book.title });
  await comment.save();
  book.commentcount += 1;
  await book.save();

  const finalBook = _.pick(book, ['_id', 'title']);
  const comments = await Comment.find({ bookName: finalBook.title });
  const finalComments = comments.map(comm => _.pick(comm, ['_id', 'description']));
  finalBook.comments = finalComments;

  return res.send(finalBook);
});

app.delete('/api/books/:bookId', async (req, res) => {
  const { bookId } = req.params;

  if (!ObjectID.isValid(bookId)) {
    return res.status(404).send('no book exists');
  }

  const book = await Book.findById(bookId);

  if (!book) {
    return res.status(404).send('no book exists');
  }

  await Book.deleteOne({ title: book.title });
  await Comment.deleteMany({ bookName: book.title });

  return res.send('delete successful');
});

app.delete('/api/books', async (req, res) => {
  await Book.deleteMany({});
  await Comment.deleteMany({});

  return res.send('complete delete successful');
});

app.listen(port, () => {
  console.log(`Server started up on port ${port}`);
});

module.exports = { app };
