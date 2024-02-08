import { expect } from 'chai';
import sinon from 'sinon';
import bookService from '../../services/book.js';
import bookController from '../../controllers/book.js';

describe('BookController', () => {
    const errorResponse = {
        message: 'An Internal Server Error Occurred',
    };

    afterEach(() => {
        sinon.restore();
    })

    describe('getBooks', () => {

        it('should get books successfully', async () => {
            const req = {
                query: { searchText: 'test', offset: 0, limit: 10 },
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const fakeResponse = { results: ['book1', 'book2'], totalCount: 2 };
            sinon.stub(bookService, 'getBooks').resolves(fakeResponse);

            await bookController.getBooks(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(fakeResponse)).to.be.true;
        });

        it('should handle errors during getBooks', async () => {
            const req = {
                query: { searchText: 'test', offset: 0, limit: 10 },
            };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.stub(),
            };

            const fakeError = new Error('Test error');
            sinon.stub(bookService, 'getBooks').rejects(fakeError);

            await bookController.getBooks(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.send.calledWith(errorResponse)).to.be.true;
        });

    });

    describe('getBookById', () => {
        it('should get a book by ID successfully', async () => {
            const req = { params: { id: 'fakeId' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const fakeBook = { _id: 'fakeId', title: 'Fake Book' };
            sinon.stub(bookService, 'getBookById').resolves(fakeBook);

            await bookController.getBookById(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(fakeBook)).to.be.true;
        });

        it('should handle errors during getBookById', async () => {
            const req = { params: { id: 'fakeId' } };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.stub(),
            };

            const fakeError = new Error('Test error');
            sinon.stub(bookService, 'getBookById').rejects(fakeError);

            await bookController.getBookById(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.send.calledWith(errorResponse)).to.be.true;
        });

    });

    describe('addBook', () => {
        it('should add a new book successfully', async () => {
            const req = { body: { title: 'New Book' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const fakeBook = { _id: 'fakeId', title: 'New Book' };
            sinon.stub(bookService, 'addBook').resolves(fakeBook);

            await bookController.addBook(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(fakeBook)).to.be.true;
        });

        it('should handle errors during addBook', async () => {
            const req = { body: { title: 'New Book' } };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.stub(),
            };

            const fakeError = new Error('Test error');
            sinon.stub(bookService, 'addBook').rejects(fakeError);

            await bookController.addBook(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.send.calledWith(errorResponse)).to.be.true;
        });

    });

    describe('updateBook', () => {
        it('should update an existing book successfully', async () => {
            const req = { params: { id: 'fakeId' }, body: { title: 'Updated Book' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const fakeBook = { _id: 'fakeId', title: 'Updated Book' };
            sinon.stub(bookService, 'updateBook').resolves(fakeBook);

            await bookController.updateBook(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(fakeBook)).to.be.true;
        });

        it('should handle errors during updateBook', async () => {
            const req = { params: { id: 'fakeId' }, body: { title: 'Updated Book' } };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.stub(),
            };

            const fakeError = new Error('Test error');
            sinon.stub(bookService, 'updateBook').rejects(fakeError);

            await bookController.updateBook(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.send.calledWith(errorResponse)).to.be.true;
        });
    })

    describe('deleteBook', () => {
        it('should delete a book successfully', async () => {
            const req = { params: { id: 'fakeId' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            sinon.stub(bookService, 'deleteBook').resolves();

            await bookController.deleteBook(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith("Book has been removed")).to.be.true;
        });

        it('should handle errors during deleteBook', async () => {
            const req = { params: { id: 'fakeId' } };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.stub(),
            };

            const fakeError = new Error('Test error');
            sinon.stub(bookService, 'deleteBook').rejects(fakeError);

            await bookController.deleteBook(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.send.calledWith(errorResponse)).to.be.true;
        });
    })

})
