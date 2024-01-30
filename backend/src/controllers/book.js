import Book from "../models/Book.js"

export async function getBooks(req, res) {
    try {
        const books = await Book.find({}).sort({ _id: -1 });
        res.status(200).json(books)
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            "message": "Something went wrong!"
        });
    }
};

export async function getBookById(req, res) {
    try {
        const book = await Book.findById(req.params.id)
        if (!book) {
            res.status(404).json({
                message: "Book not found!"
            })
        }
        else {
            res.status(200).json(book)
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            "message": "Something went wrong!"
        });
    }
};

export async function addBook(req, res) {
    try {
        const newbook = await new Book({
            title: req.body.title,
            author: req.body.author,
            publicationYear: req.body.publicationYear,
            summary: req.body.summary,
        })
        const book = await newbook.save()
        res.status(200).json(book)
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            "message": "Something went wrong!"
        });
    }
};

export async function updateBook(req, res) {
    try {
        await Book.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json("Book details updated successfully");
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            "message": "Something went wrong!"
        });
    }
};

export async function deleteBook(req, res) {
    try {
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json("Book has been removed");
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            "message": "Something went wrong!"
        });
    }
};