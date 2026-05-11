const express = require('express');

const router = express.Router();

let books = [
    { id: 1, title: 'Atomic Habits' },
    { id: 2, title: 'Deep Work' },
];


router.get('/', (req, res) => {
    res.json(books);
});


router.post('/', (req, res) => {
    const { title } = req.body;

    const newBook = {
        id: books.length + 1,
        title,
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

module.exports = router;