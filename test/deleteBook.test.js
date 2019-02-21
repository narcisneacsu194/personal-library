const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const { app } = require('../server');
const { Book } = require('../models/book');
const { Comment } = require('../models/comment');
const { books } = require('./database/populateDatabase');

describe('DELETE /api/books/:bookId', () => {
  it('should successfully delete a particular book', (done) => {
    /* eslint no-underscore-dangle: 0 */
    const id = books[0]._id.toHexString();

    request(app)
      .delete(`/api/books/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.text).toBe('delete successful');
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        return Book.findById(id).then((book) => {
          expect(book).toBeFalsy();

          return Comment.find({ bookName: 'book1' });
        }).then((comments) => {
          expect(comments.length).toBe(0);
          done();
        }).catch(error => done(error));
      });
  });

  it('should return an error if the provided id is invalid', (done) => {
    request(app)
      .delete('/api/books/123')
      .expect(404)
      .expect((res) => {
        expect(res.text).toBe('no book exists');
      })
      .end(done);
  });

  it('should return an error if the provided id does not belong to any book', (done) => {
    const id = new ObjectID().toHexString();

    request(app)
      .delete(`/api/books/${id}`)
      .expect(404)
      .expect((res) => {
        expect(res.text).toBe('no book exists');
      })
      .end(done);
  });
});
