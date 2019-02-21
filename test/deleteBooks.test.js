const expect = require('expect');
const request = require('supertest');
const { app } = require('../server');
const { Book } = require('../models/book');
const { Comment } = require('../models/comment');

describe('DELETE /api/books', () => {
  it('should delete all the books and comments from the database', (done) => {
    request(app)
      .delete('/api/books')
      .expect(200)
      .expect((res) => {
        expect(res.text).toBe('complete delete successful');
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        return Book.find({}).then((books) => {
          expect(books.length).toBe(0);

          return Comment.find({});
        }).then((comments) => {
          expect(comments.length).toBe(0);
          done();
        }).catch(error => done(error));
      });
  });
});
