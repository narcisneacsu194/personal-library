const expect = require('expect');
const request = require('supertest');
const { app } = require('../server');
const {
  populateBookCollection, populateCommentCollection, books,
} = require('./database/populateDatabase');

beforeEach(populateBookCollection);
beforeEach(populateCommentCollection);

describe('GET /api/books', () => {
  it('should return all the available books', (done) => {
    request(app)
      .get('/api/books')
      .expect(200)
      .expect((res) => {
        const { body } = res;
        let i;
        for (i = 0; i < 2; i += 1) {
          /* eslint no-underscore-dangle: 0 */
          expect(body[i]._id).toBe(books[i]._id.toHexString());
          expect(body[i].title).toBe(books[i].title);
          expect(body[i].commentcount).toBe(books[i].commentcount);
        }
      })
      .end(done);
  });
});
