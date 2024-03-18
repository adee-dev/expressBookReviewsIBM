const express = require('express');
const books = require("./booksdb.js");
const { isValid, users } = require("./auth_users.js");
const public_users = express.Router();

// User registration route
public_users.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        const present = users.find(user => user.username === username);
        if (!present) {
            users.push({ "username": username, "password": password });
            return res.status(201).json({ message: "User created successfully" });
        } else {
            return res.status(400).json({ message: "User already exists" });
        }
    } else {
        return res.status(400).json({ message: "Bad request, check username and password" });
    }
});

// Get the book list available in the shop
public_users.get('/', async (req, res) => {
    try {
        const getBooks = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(books);
                }, 1000);
            });
        }
        const books = await getBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
});

// Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', (req, res) => {
    const ISBN = req.params.isbn;
    const booksBasedOnIsbn = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const book = books.find(b => b.isbn === ISBN);
                if (book) {
                    resolve(book);
                } else {
                    reject(new Error("Book not found"));
                }
            }, 1000);
        });
    }
    booksBasedOnIsbn()
        .then(book => {
            res.json(book);
        })
        .catch(error => {
            res.status(400).json({ error: "Book not found" });
        });
});

// Get book details based on author using Promises
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;
    try {
        const filteredBooks = books.filter(b => b.author === author);
        if (filteredBooks.length > 0) {
            res.json(filteredBooks);
        } else {
            throw new Error("Book not found");
        }
    } catch (error) {
        res.status(400).json({ error: "Book not found" });
    }
});

// Get all books based on title using Promises
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const filteredBooks = books.filter(b => b.title === title);
        if (filteredBooks.length > 0) {
            res.json(filteredBooks);
        } else {
            throw new Error("Book not found");
        }
    } catch (error) {
        res.status(400).json({ error: "Book not found" });
    }
});

// Get book review
public_users.get('/review/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        if (books[isbn] && books[isbn].review) {
            res.json(books[isbn].review);
        } else {
            throw new Error("Review not found");
        }
    } catch (error) {
        res.status(400).json({ error: "Review not found" });
    }
});

module.exports.general = public_users;
