import { expect } from 'chai';
import sinon from 'sinon';
import BookService from '../../services/book.js';
import Book from '../../models/Book.js';

describe('BookService', () => {
    afterEach(() => {
        sinon.restore();
    })

    describe('getBooks', () => {
        const fakeBooks = ['book1', 'book2'];

        beforeEach(() => {
            sinon.stub(Book, 'countDocuments').resolves(fakeBooks.length);
            sinon.stub(Book, 'find').returns({
                sort: sinon.stub().returns(fakeBooks)
            });
        })

        it('should get books without search text', async () => {
            const result = await BookService.getBooks();

            expect(result.totalCount).to.equal(fakeBooks.length);
            expect(result.results).to.deep.equal(fakeBooks);
        });

        it('should get books with search text', async () => {
            const result = await BookService.getBooks(0, 10, 'searchText');

            expect(result.totalCount).to.equal(fakeBooks.length);
            expect(result.results).to.deep.equal(fakeBooks);
        });
    });

    describe('getBookById', () => {
        it('should get a book by ID', async () => {
            const fakeBook = { _id: 'fakeId', title: 'Fake Book' };
            sinon.stub(Book, 'findById').resolves(fakeBook);

            const result = await BookService.getBookById('fakeId');

            expect(result).to.deep.equal(fakeBook);
        });

        it('should throw an error for non-existent book', async () => {
            sinon.stub(Book, 'findById').resolves(null);

            try {
                await BookService.getBookById('nonExistentId');
                // If it doesn't throw an error, fail the test
                expect.fail('Expected an error but did not get one.');
            } catch (error) {
                expect(error.status).to.equal(404);
                expect(error.message).to.equal('Book not found!');
            }
        });

    });

    describe('addBook', () => {
        it('should add a new book', async () => {
            const bookData = {
                title: 'New Book',
                author: 'John Doe',
                publicationYear: 2022,
                summary: 'A great book!',
            };

            const fakeBook = { _id: 'fakeId', ...bookData };
            sinon.stub(Book.prototype, 'save').resolves(fakeBook);

            const result = await BookService.addBook(bookData);

            expect(result).to.deep.equal(fakeBook);
        });

    });

    describe('updateBook', () => {
        it('should update an existing book', async () => {
            const bookData = {
                title: 'Updated Book',
                author: 'Jane Doe',
                publicationYear: 2023,
                summary: 'An updated book!',
            };

            const fakeUpdatedBook = { _id: 'fakeId', ...bookData };
            sinon.stub(Book, 'findByIdAndUpdate').resolves(fakeUpdatedBook);

            const result = await BookService.updateBook('fakeId', bookData);

            expect(result).to.deep.equal(fakeUpdatedBook);
        });

        it('should throw an error for updating a non-existent book', async () => {
            sinon.stub(Book, 'findByIdAndUpdate').resolves(null);

            try {
                await BookService.updateBook('nonExistentId', {});
                // If it doesn't throw an error, fail the test
                expect.fail('Expected an error but did not get one.');
            } catch (error) {
                expect(error.status).to.equal(404);
                expect(error.message).to.equal('Book not found!');
            }
        });
    });

    describe('deleteBook', () => {
        it('should delete an existing book', async () => {
            const fakeDeletedBook = { _id: 'fakeId', title: 'Deleted Book' };
            sinon.stub(Book, 'findByIdAndDelete').resolves(fakeDeletedBook);

            const result = await BookService.deleteBook('fakeId');

            expect(result).to.deep.equal(fakeDeletedBook);
        });
    });
});