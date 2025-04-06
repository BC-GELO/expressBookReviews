const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const app = express();

let users = [];

const isValid = (username)=>{
    return username !== undefined && username.trim() !== '';
}

const authenticatedUser = (username,password)=>{ 
    const authenUser = users.find(user => user.username === username && user.password === password);
    return authenUser !== undefined;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const { username, password } = req.body;
    if (!username || !password){
        return res.status(400).json({message:"Enter user and password!"})
    }
    if (authenticatedUser(username,password)) {
        let token = jwt.sign({
            data: password
        }, `access`, {expiresIn: 60 * 60});
        req.session.authenUser = {
        token,
        username
        };
        return res.status(200).json({
            message:"User logged in",
            token:token
        });
    } else {
        return res.status(400).json({message:"User doesn't exist"});
    }
    

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const getBook = req.params.isbn;
    const getReview = req.body.reviews;
    const user = req.session.authenUser.username;
    if (!user) {
        return res.status(401).json({message:"Unvalid User"});
    }
    if (books[isbn]) {
        books[isbn].reviews = books[isbn].reviews || {};
        books[isbn].reviews[username] = review;

        return res.status(200).json({ message: "Review added/updated" });
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
    
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
