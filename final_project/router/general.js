const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "this User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Please provide a username and password."});
  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    


    // Find the book with the specified ISBN
    const book = books.find((book) => book.isbn === isbn);

    if (book) {
        // If a book with the specified ISBN is found, send it as the response
        res.send(book);
    } else {
        // If no book with the specified ISBN is found, send a 404 Not Found response
        res.status(404).send("Book not found");
    }
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    
    // Filter books by the specified author
    const booksByAuthor = books.filter((book) => book.author === author);
    
    // Send the filtered books as the response
    res.send(booksByAuthor);
});
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
