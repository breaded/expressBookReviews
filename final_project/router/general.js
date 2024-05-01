const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


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
    const isbn = req.params.isbn;
    const book = Object.values(books).find(book => book.isbn === isbn);
    if (book) {
      res.json(book);
    } else {
      res.status(404).send('Book not found');
    }
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const booksByAuthor = Object.values(books).filter(book => book.author === author);
    res.json(booksByAuthor);

});
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const book = Object.values(books).find(book => book.title === title);
    if (book) {
      res.json(book);
    } else {
      res.status(404).send('Book not found');
    }
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const book = Object.values(books).find(book => book.isbn === isbn);
    if (book) {
      res.json(book.reviews);
    } else {
      res.status(404).send('Review for ISBN not found');
    }
  return res.status(300).json({message: "Yet to be implemented"});
});


// Function to get the list of books available
async function getBooks() {
    try {
      const response = await axios.get('https://be-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai');
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }
  
  
  (async () => {
    try {
      const books = await getBooks();
      console.log('Books available:', books);
    } catch (error) {
      console.error('Error:', error);
    }
  })();


// Function to get book details by ISBN

async function getBookByISBN(isbn) {
    
  try {
    
    const response = await axios.get(`https://be-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/${isbn}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
}

// Example usage
(async () => {
  try {
    const isbn = '9780385474542'; // Replace with the ISBN you want to search for
    const book = await getBookByISBN(isbn);
    console.log('Book details:', book);
  } catch (error) {
    console.error('Error:', error);
  }
})();


// Function to get book details based on author
async function getBooksByAuthor(author) {
    try {
      const response = await axios.get(`https://be-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/author/${author}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching books by author:', error);
      throw error;
    }
  }
  
 
  (async () => {
    try {
      const author = "Samuel Beckett"; 
      const books = await getBooksByAuthor(author);
      console.log(`Books by ${author}:`, books);
    } catch (error) {
      console.error('Error:', error);
    }
  })();

  // Function to get book details based on title
async function getBooksByTitle(title) {
    try {
      const response = await axios.get(`https://be-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title/${title}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching books by title:', error);
      throw error;
    }
  }
  
 
  (async () => {
    try {
      const title = "One Thousand and One Nights"; 
      const books = await getBooksByTitle(title);
      console.log(`Book is  ${title}:`, books);
    } catch (error) {
      console.error('Error:', error);
    }
  })();

module.exports.general = public_users;
