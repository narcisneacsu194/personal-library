const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const { app } = require('../server');
const { Book } = require('../models/book');
const { Comment } = require('../models/comment');
const {
  populateBookCollection, populateCommentCollection, books, comments,
} = require('./database/populateDatabase');

beforeEach(populateBookCollection);
beforeEach(populateCommentCollection);

describe('POST /api/books/:bookId', () => {
  it('should successfully create a new comment and return details of the book', (done) => {
    /* eslint no-underscore-dangle: 0 */
    const bookId = books[0]._id.toHexString();
    const body = { description: 'Random comment' };

    request(app)
      .post(`/api/books/${bookId}`)
      .send(body)
      .expect(200)
      .expect((res) => {
        const resBody = res.body;
        let i;
        expect(resBody._id).toBe(books[0]._id.toHexString());
        expect(resBody.title).toBe(books[0].title);
        for (i = 0; i < 2; i += 1) {
          expect(resBody.comments[i]._id).toBe(comments[i]._id.toHexString());
          expect(resBody.comments[i].description).toBe(comments[i].description);
        }
        expect(resBody.comments[2]._id).toBeTruthy();
        expect(resBody.comments[2].description).toBe(body.description);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        return Book.findById(bookId).then((book) => {
          expect(book.commentcount).toBe(3);

          return Comment.find({ bookName: book.title });
        }).then((comms) => {
          expect(comms.length).toBe(3);
          expect(comms[2]._id).toBeTruthy();
          expect(comms[2].description).toBe(body.description);
          done();
        }).catch(error => done(error));
      });
  });

  it('should return an error if an invalid id is provided', (done) => {
    const body = { description: 'Random description' };
    request(app)
      .post('/api/books/123')
      .send(body)
      .expect(404)
      .expect((res) => {
        expect(res.text).toBe('no book exists');
      })
      .end(done);
  });

  it('should return an error if a non-existent id is provided', (done) => {
    const body = { description: 'Random description' };
    const id = new ObjectID().toHexString();
    request(app)
      .post(`/api/books/${id}`)
      .send(body)
      .expect(404)
      .expect((res) => {
        expect(res.text).toBe('no book exists');
      })
      .end(done);
  });

  it('should return an error if trying to create a comment without providing a description property', (done) => {
    const id = books[0]._id.toHexString();

    request(app)
      .post(`/api/books/${id}`)
      .send({ description2: 'Random description' })
      .expect(400)
      .expect((res) => {
        expect(res.text).toBe('The description property must be provided and it should not be an empty string.');
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        return Book.findById(id).then((book) => {
          expect(book.commentcount).toBe(2);
          done();
        }).catch(error => done(error));
      });
  });

  it('should return an error if trying to create a comment using an empty string as the description', (done) => {
    const id = books[0]._id.toHexString();

    request(app)
      .post(`/api/books/${id}`)
      .send({ description2: 'Random description' })
      .expect(400)
      .expect((res) => {
        expect(res.text).toBe('The description property must be provided and it should not be an empty string.');
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        return Book.findById(id).then((book) => {
          expect(book.commentcount).toBe(2);
          done();
        }).catch(error => done(error));
      });
  });
});
