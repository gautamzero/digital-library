import Book from "../models/Book.js"

export async function getBooks(req, res) {
    try {
        let totalCount = 0;
        let books = [];
        const searchText = req.query.searchText;
        const searchRegex = new RegExp(searchText);
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
                    skip: req.query.offset,
                    limit: req.query.limit
                })
                .sort({ _id: -1 });
        } else {
            totalCount = await Book.countDocuments({});
            books = await Book.find(
                {},
                null,
                {
                    skip: req.query.offset,
                    limit: req.query.limit
                })
                .sort({ _id: -1 });
        }

        res.status(200).json({
            results: books,
            totalCount,
        });
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