const express = require('express');
const router = express.Router();

const Book = require('./models/Book');

router.get('/', async (req, res) => {
    const books = await Book.find({ userId: req.session.userId });

    res.json(books);
});


router.post('/', async (req, res) => {
    const { title } = req.body;

    const book = await Book.create({
        title,
        userId: req.session.userId,
    });

    res.status(201).json(book);
});

module.exports = router;