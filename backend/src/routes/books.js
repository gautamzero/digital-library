import express from "express"
import bookController from "../controllers/book.js"
import bookSchema from '../request-schemas/book.js';
import validateSchema from '../middlewares/validation-middleware.js';

const router = express.Router()

/* Get all books in the db */
router.get("/", validateSchema(bookSchema.bookList), bookController.getBooks)

/* Add book */
router.post("/", validateSchema(bookSchema.addBook), bookController.addBook)

/* Get Book by book Id */
router.get("/:id", validateSchema(bookSchema.getBookById), bookController.getBookById)

/* Update book */
router.put("/:id", validateSchema(bookSchema.updateBook), bookController.updateBook)

/* Remove book  */
router.delete("/:id", validateSchema(bookSchema.deleteBook), bookController.deleteBook)

export default router