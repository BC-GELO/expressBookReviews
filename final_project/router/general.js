const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const {username, password} = req.body; 
    if (!username || !password) {
        res.status(400).json({message:"User or/and Password require"})
    }
    if(!isValid(username)) {
        res.status(400).json({message:"Error User"})
    }
    const alreadyExist = users.some(user => user.username === username);
    if (alreadyExist){
        res.status(400).json({message:"User Already Exists"});
    }
    users.push({username,password});
    return res.status(200).json({message:"User register"})
});

// Get the book list available in the shop
public_users.get('/getallbooks',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const Author = req.params.author;
    const authBooks = [];
    const Id = Object.keys(books);
    Id.forEach(id => {
      if (books[id].author.toLowerCase() === Author.toLowerCase()) {
        authBooks.push({
          isbn: id,
          title: books[id].title,
          author: books[id].author,
          reviews: books[id].reviews
        });
      }
    });

    if (authBooks.length > 0) {
      res.status(200).json(authBooks);
    } else {
      res.status(404).json({ message: "No books found for this author" });
    }
  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const Title = req.params.title;
    const titleBooks = [];
    const Id = Object.keys(books);
    Id.forEach(id => {
        if (books[id].title.toLowerCase() === Title.toLocaleLowerCase()) {
            titleBooks.push({
            isbn: id,
            title: books[id].title,
            author: books[id].author,
            reviews: books[id].reviews
            });
        }
    });
    if (titleBooks.length > 0){
        res.status(200).json(titleBooks);
    } else {
        res.status(200).json({message:"Has not been found"})
    }
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]){
    const reviews = books[isbn].reviews;
    if (Object.keys(reviews).length > 0) {
        res.status(200).json(reviews);
    } else {
        res.status(200).json({message:"No reviews"})
    }
  } else {
    res.status(200).json({message:"Book doesn't exist"})
  }
});

module.exports.general = public_users;
