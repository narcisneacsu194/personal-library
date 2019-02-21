const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const { app } = require('../server');
const {
  populateBookCollection, populateCommentCollection, books, comments,
} = require('./database/populateDatabase');

beforeEach(populateBookCollection);
beforeEach(populateCommentCollection);

describe('GET /api/books/:bookId', () => {
  it('should return specific book using id', (done) => {
    /* eslint no-underscore-dangle: 0 */
    const bookId = books[0]._id.toHexString();
    request(app)
      .get(`/api/books/${bookId}`)
      .expect(200)
      .expect((res) => {
        const { body } = res;
        let i;
        expect(body._id).toBe(books[0]._id.toHexString());
        expect(body.title).toBe(books[0].title);

        for (i = 0; i < 2; i += 1) {
          expect(body.comments[i]._id).toBe(comments[i]._id.toHexString());
          expect(body.comments[i].description).toBe(comments[i].description);
        }
      })
      .end(done);
  });

  it('should return error if trying to get a book using an invalid id', (done) => {
    request(app)
      .get('/api/books/123')
      .expect(404)
      .expect((res) => {
        expect(res.text).toBe('no book exists');
      })
      .end(done);
  });

  it('should return error if trying to get a book using an id that does not exist', (done) => {
    const id = new ObjectID().toHexString();
    request(app)
      .get(`/api/books/${id}`)
      .expect(404)
      .expect((res) => {
        expect(res.text).toBe('no book exists');
      })
      .end(done);
  });
});
