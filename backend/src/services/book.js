import Book from "../models/Book.js"
import { throwCustomError } from "../helpers/utils.js";

async function getBooks (offset = 0, limit = 10, searchText = '') {
    let totalCount = 0;
    let books = [];
    const searchRegex = new RegExp(searchText, 'i');
    if (searchText) {
        totalCount = await Book.countDocuments({
            $or: [
                {
                    title: {
                        "$regex": searchRegex
                    },
                },
                {
                    author: {
                        "$regex": searchRegex
                    },
                },
                {
                    summary: {
                        "$regex": searchRegex
                    },
                },
            ]
        });
        books = await Book.find(
            {
                $or: [
                    {
                        title: {
                            "$regex": searchRegex
                        },
                    },
                    {
                        author: {
                            "$regex": searchRegex
                        },
                    },
                    {
                        summary: {
                            "$regex": searchRegex
                        },
                    },
                ]
            },
            null,
            {
                skip: offset,
                limit: limit
            })
            .sort({ _id: -1 });
    } else {
        totalCount = await Book.countDocuments({});
        books = await Book.find(
            {},
            null,
            {
                skip: offset,
                limit: limit
            })
            .sort({ _id: -1 });
    }

    return {
        results: books,
        totalCount,
    };
}

async function getBookById(id) {
    const book = await Book.findById(id);
    if (!book) {
        throwCustomError(404, 'Book not found!');
    }
    return book;
};

async function addBook(bookData) {
    const newbook = new Book({
        title: bookData.title,
        author: bookData.author,
        publicationYear: bookData.publicationYear,
        summary: bookData.summary,
    })
    const book = await newbook.save()
    return book;
};

async function updateBook(id, bookData) {
    const book = await Book.findByIdAndUpdate(id, {
        $set: bookData,
    }, {
        returnDocument: 'after',
    });
    if (!book) {
        throwCustomError(404, 'Book not found!');
    }
    return book;
}

async function deleteBook(id) {
    return Book.findByIdAndDelete(id)
}

export default {
    getBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
};