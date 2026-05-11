require('dotenv').config();

const express = require('express');
const session = require('express-session');

const app = express();


app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);


function isAuthenticated(req, res, next) {
    if (req.session.isAuth) {
        next();
    } else {
        res.status(401).json({
            message: 'Unauthorized',
        });
    }
}


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin') {
        req.session.isAuth = true;

        return res.json({
            message: 'Login successful',
        });
    }

    res.status(401).json({
        message: 'Invalid credentials',
    });
});


const booksRouter = require('./books');


app.use('/books', isAuthenticated, booksRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});