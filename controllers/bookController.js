const axios = require("axios");
const catchAsync = require("./../utils/catchAsync");

exports.getBook = catchAsync(async (req, res) => {
  searchQuery = req.params.Book;
  console.log(searchQuery);
  YOUR_API_KEY = process.env.API_KEY;

  const response = await axios({
    method: "GET",
    url: `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}:keyes&key=${YOUR_API_KEY}&maxResults=25`,
  });
  const books = response.data.items;
  console.log(books);

  res.status(200).send({
    status: "success",
    requestedAt: req.requestTime,
    results: books.length,
    books,
  });
});

exports.getBookByID = catchAsync(async (req, res) => {
  bookId = req.params.id;
  console.log(bookId);
  YOUR_API_KEY = process.env.API_KEY;

  const response = await axios({
    method: "GET",
    url: `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${YOUR_API_KEY}`,
  });
  const book = response.data;

  res.status(200).send({
    status: "success",
    requestedAt: req.requestTime,
    book,
  });
});


exports.getBookForCategories = catchAsync(async (req, res) => {
  searchQuery = req.params.Book;
  console.log(searchQuery);
  YOUR_API_KEY = process.env.API_KEY;

  const response = await axios({
    method: "GET",
    url: `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}:keyes&key=${YOUR_API_KEY}&maxResults=10`,
  });
  const books = response.data.items;

  res.status(200).send({
    status: "success",
    requestedAt: req.requestTime,
    results: books.length,
    books,
  });
});