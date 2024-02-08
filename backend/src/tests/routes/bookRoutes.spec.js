import chai from 'chai';
import sinon from 'sinon';
import supertest from 'supertest';
import app from '../../app.js';
import bookService from '../../services/book.js';

const { expect } = chai;
const request = supertest(app);

describe('Book Routes', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('GET /api/books', () => {
    let getBooksStub;

    beforeEach(() => {
      const fakeResponse = { results: ['book1', 'book2'], totalCount: 2 };
      getBooksStub = sinon.stub(bookService, 'getBooks').resolves(fakeResponse);
    })

    it('should get all books without the query params', async () => {
      const res = await request.get('/api/books');
      expect(res.status).to.equal(200);
      expect(getBooksStub.calledOnce).to.be.true;
    });

    it('should get all books with the query params', async () => {
      const res = await request.get('/api/books?offset=0&limit=10&searchText=sometext');
      expect(res.status).to.equal(200);
      expect(getBooksStub.calledOnce).to.be.true;
    });

    it('should reject with status 422 for invalid query params', async () => {
      const res = await request.get('/api/books?offset=0&limit=10&filter=sometext');
      expect(res.status).to.equal(422);
      expect(getBooksStub.calledOnce).to.be.false;
    });
  })

  describe('POST /api/books', () => {
    let addBookStub;

    beforeEach(() => {
      const fakeBook = { _id: 'fakeId', title: 'New Book', author: 'fake author' };
      addBookStub = sinon.stub(bookService, 'addBook').resolves(fakeBook);
    })

    it('should add a new book', async () => {
      const body = { title: 'New Book', author: 'fake author' };
      const res = await request.post('/api/books').send(body);

      expect(res.status).to.equal(200);
      expect(addBookStub.calledOnce).to.be.true;
    });

    it('should reject with status 422 if required field missing', async () => {
      const body = { title: 'New Book' };
      const res = await request.post('/api/books').send(body);

      expect(res.status).to.equal(422);
      expect(addBookStub.calledOnce).to.be.false;
    });

    it('should reject with status 422 for invalid request body', async () => {
      const body = { name: 'New Book' };
      const res = await request.post('/api/books').send(body);

      expect(res.status).to.equal(422);
      expect(addBookStub.calledOnce).to.be.false;
    });
  })

  describe('GET /api/books/:id', () => {
    let getBookByIdStub;
    beforeEach(() => {
      const fakeBook = { _id: 'fakeId', title: 'Fake Book' };
      getBookByIdStub = sinon.stub(bookService, 'getBookById').resolves(fakeBook);
    })

    it('should get a book by ID', async () => {
      const res = await request.get('/api/books/1');

      expect(res.status).to.equal(200);
      expect(getBookByIdStub.calledOnceWithExactly('1')).to.be.true;
    });
  })

  describe('PUT /api/books/:id', () => {
    let updateBookStub;

    beforeEach(() => {
      const fakeBook = { _id: 'fakeId', title: 'Updated Book' };
      updateBookStub = sinon.stub(bookService, 'updateBook').resolves(fakeBook);
    })

    it('should update a book', async () => {
      const body = { title: 'New Book', author: 'fake author' };

      const res = await request.put('/api/books/1').send(body);

      expect(res.status).to.equal(200);
      expect(updateBookStub.calledOnceWithExactly('1', body)).to.be.true;
    });

    it('should reject with status 422 for invalid request body', async () => {
      const body = { name: 'New Book', author: 'fake author' };

      const res = await request.put('/api/books/1').send(body);

      expect(res.status).to.equal(422);
      expect(updateBookStub.calledOnceWithExactly('1', body)).to.be.false;
    });
  })

  describe('DELETE /api/books/:id', () => {
    let deleteBookStub;

    beforeEach(() => {
      deleteBookStub = sinon.stub(bookService, 'deleteBook').resolves();
    })

    it('should delete a book', async () => {
      const res = await request.delete('/api/books/1');

      expect(res.status).to.equal(200);
      expect(deleteBookStub.calledOnceWithExactly('1')).to.be.true;
    });
  })
});
