import bookService from "../services/book.js"
import { handleErrorResponse } from "../helpers/utils.js";

async function getBooks(req, res) {
    try {
        const { searchText, offset, limit } = req.query;
        const response = await bookService.getBooks(offset, limit, searchText)
        
        res.status(200).json(response);
    }
    catch (err) {
        handleErrorResponse(err, res);
    }
}

async function getBookById(req, res) {
    try {
        const book = await bookService.getBookById(req.params.id);
        res.status(200).json(book);
    }
    catch (err) {
        handleErrorResponse(err, res);
    }
}

async function addBook(req, res) {
    try {
        const book = await bookService.addBook(req.body)
        res.status(200).json(book)
    }
    catch (err) {
        handleErrorResponse(err, res);
    }
}

async function updateBook(req, res) {
    try {
        const book = await bookService.updateBook(req.params.id, req.body);
        res.status(200).json(book);
    }
    catch (err) {
        handleErrorResponse(err, res);
    }
}

async function deleteBook(req, res) {
    try {
        await bookService.deleteBook(req.params.id)
        res.status(200).json("Book has been removed");
    } catch (err) {
        handleErrorResponse(err, res);
    }
}

export default {
    getBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
};