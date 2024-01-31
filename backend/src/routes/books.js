import express from "express"
import { getBooks, getBookById, addBook, updateBook, deleteBook } from "../controllers/book.js"
import bookSchema from '../request-schemas/book.js';
import validateSchema from '../middlewares/validation-middleware.js';

const router = express.Router()

/* Get all books in the db */
router.get("/", validateSchema(bookSchema.bookList), getBooks)

/* Add book */
router.post("/", validateSchema(bookSchema.addBook), addBook)

/* Get Book by book Id */
router.get("/:id", validateSchema(bookSchema.getBookById), getBookById)

/* Update book */
router.put("/:id", validateSchema(bookSchema.updateBook), updateBook)

/* Remove book  */
router.delete("/:id", validateSchema(bookSchema.deleteBook), deleteBook)

export default router