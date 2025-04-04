const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{
    return username !== undefined && username.trim() !== '';
}

const authenticatedUser = (username,password)=>{ 
    const authenUser = user.find(user => user.username === username && user.password === passsword);
    return authenUser !== undefined;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.params.username;
    const password = req.params.password;
    if (!username || !password){
        return res.statusMessage(400).json({message:"Enter user and password!"})
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
            token: token
        });
    } else {
        return res.status(400).json({message:"User doesn't exist"});
    }
    
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
