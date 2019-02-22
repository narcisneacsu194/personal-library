const expect = require('expect');
const request = require('supertest');
const { app } = require('../server');
const { Book } = require('../models/book');
const { populateBookCollection, populateCommentCollection } = require('./database/populateDatabase');

beforeEach(populateBookCollection);
beforeEach(populateCommentCollection);

describe('POST /api/books', () => {
  it('should successfully create a new book entry', (done) => {
    const body = { title: 'book3' };
    request(app)
      .post('/api/books')
      .send(body)
      .expect(200)
      .expect((res) => {
        /* eslint no-underscore-dangle: 0 */
        expect(res.body._id).toBeTruthy();
        expect(res.body.title).toBe(body.title);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        return Book.findOne({ title: 'book3' }).then((book) => {
          expect(book).toBeTruthy();
          expect(book.title).toBe(body.title);
          done();
        }).catch(error => done(error));
      });
  });

  it('should return an error if trying to create a new book with a name that already exists', (done) => {
    const body = { title: 'book2' };

    request(app)
      .post('/api/books')
      .send(body)
      .expect(400)
      .expect((res) => {
        expect(res.text).toBe('A book with the title \'book2\' already exists. Please try again.');
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        return Book.findOne({ title: 'book3' }).then((book) => {
          expect(book).toBeFalsy();
          done();
        }).catch(error => done(error));
      });
  });

  it('should return an error if trying to create a book without providing a title property', (done) => {
    request(app)
      .post('/api/books')
      .send({ title2: 'Random title' })
      .expect(400)
      .expect((res) => {
        expect(res.text).toBe('The title property must be provided and it should not be an empty string.');
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        return Book.find({}).then((books) => {
          expect(books.length).toBe(2);
          done();
        }).catch(error => done(error));
      });
  });

  it('should return an error if trying to create a book using an empty string as the title', (done) => {
    request(app)
      .post('/api/books')
      .send({ title: ' ' })
      .expect(400)
      .expect((res) => {
        expect(res.text).toBe('The title property must be provided and it should not be an empty string.');
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        return Book.find({}).then((books) => {
          expect(books.length).toBe(2);
          done();
        }).catch(error => done(error));
      });
  });
});
