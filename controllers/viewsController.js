const catchAsync = require("./../utils/catchAsync");
const axios = require("axios");

exports.getOverview = (req, res) => {
  res.status(200).render("main", {
    title: "OnLibrary",
    user: res.locals.user,
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};
exports.getSignupForm = (req, res) => {
  res.status(200).render("signup", {
    title: "Sign up",
  });
};
exports.getforgotpasswordpage = (req, res) => {
  res.status(200).render("forgotpassword", {
    title: "Sign up",
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render("profile", {
    title: "Your account",
  });
};
exports.sendEmail = catchAsync(async (req, res) => {
  var email = req.query.email;
  const response = await axios({
    method: "POST",
    url: "http://localhost:3000/api/v1/users/forgotpassword",
    data: {
      email,
    },
  });
  res.status(200).render("setpassword", {
    title: "set password",
  });
});

exports.changePassword = catchAsync(async (req, res) => {
  var token = req.query.token;
  var password = req.query.password;
  var passwordConfirm = req.query.confirmPassword;

  const response = await axios({
    method: "PATCH",
    url: `http://localhost:3000/api/v1/users/resetpassword/${token}`,
    data: {
      password,
      passwordConfirm,
    },
  });
  res.status(200).render("confirmationpage", {
    title: "Done",
  });
});

exports.getBookBySearch = catchAsync(async (req, res, next) => {
  var bookstr = req.query.searched;
  bookstr = bookstr.replace(/ /g, "").toLowerCase();
  console.log(bookstr);
  const response = await axios({
    method: "GET",
    url: `http://localhost:3000/api/v1/books/${bookstr}`,
  });

  const Books = response.data.books;
  var filteredBooks = Books.filter(
    (book) =>
      book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail
  );
  filteredBooks = filteredBooks.filter(
    (book) =>
      book.volumeInfo.industryIdentifiers &&
      (book.volumeInfo.industryIdentifiers[0].identifier ||
        book.volumeInfo.industryIdentifiers[1].identifier)
  );
  res.status(200).render("search", {
    title: "E-BOOK",
    filteredBooks,
  });
});

exports.readBook = catchAsync(async (req, res, next) => {
  const idstr = req.query.id;
  console.log(idstr);
  const response = await axios({
    method: "GET",
    url: `http://localhost:3000/api/v1/books/getBook/${idstr}`,
  });

  const Book = response.data.book;

  res.status(200).render("book", {
    title: "E-BOOK",
    Book,
  });
});

exports.getCategoryPage = catchAsync(async (req, res, next) => {
  const romance = await axios({
    method: "GET",
    url: `http://localhost:3000/api/v1/books/categories/romancebooks`,
  });

  const romanceBooks = romance.data.books;
  var filteredRomanceBooks = romanceBooks.filter(
    (book) =>
      book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail
  );
  filteredRomanceBooks = filteredRomanceBooks.filter(
    (book) =>
      book.volumeInfo.industryIdentifiers &&
      (book.volumeInfo.industryIdentifiers[0].identifier ||
        book.volumeInfo.industryIdentifiers[1].identifier)
  );

  const poetry = await axios({
    method: "GET",
    url: `http://localhost:3000/api/v1/books/categories/poetrybooks`,
  });

  const poetryBooks = poetry.data.books;
  var filteredPoetryBooks = poetryBooks.filter(
    (book) =>
      book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail
  );
  filteredPoetryBooks = filteredPoetryBooks.filter(
    (book) =>
      book.volumeInfo.industryIdentifiers &&
      (book.volumeInfo.industryIdentifiers[0].identifier ||
        book.volumeInfo.industryIdentifiers[1].identifier)
  );

  const Horror = await axios({
    method: "GET",
    url: `http://localhost:3000/api/v1/books/categories/horrorbooks`,
  });

  const HorrorBooks = Horror.data.books;
  var filteredHorrorBooks = HorrorBooks.filter(
    (book) =>
      book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail
  );
  filteredHorrorBooks = filteredHorrorBooks.filter(
    (book) =>
      book.volumeInfo.industryIdentifiers &&
      (book.volumeInfo.industryIdentifiers[0].identifier ||
        book.volumeInfo.industryIdentifiers[1].identifier)
  );

  const crime = await axios({
    method: "GET",
    url: `http://localhost:3000/api/v1/books/categories/crimebooks`,
  });

  const crimeBooks = crime.data.books;
  var filteredCrimeBooks = crimeBooks.filter(
    (book) =>
      book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail
  );
  filteredCrimeBooks = filteredCrimeBooks.filter(
    (book) =>
      book.volumeInfo.industryIdentifiers &&
      (book.volumeInfo.industryIdentifiers[0].identifier ||
        book.volumeInfo.industryIdentifiers[1].identifier)
  );

  const autobiography = await axios({
    method: "GET",
    url: `http://localhost:3000/api/v1/books/categories/autobiography`,
  });

  const autobiographyBooks = autobiography.data.books;
  var filteredAutobiographyBooks = autobiographyBooks.filter(
    (book) =>
      book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail
  );
  filteredAutobiographyBooks = filteredAutobiographyBooks.filter(
    (book) =>
      book.volumeInfo.industryIdentifiers &&
      (book.volumeInfo.industryIdentifiers[0].identifier ||
        book.volumeInfo.industryIdentifiers[1].identifier)
  );

  const biography = await axios({
    method: "GET",
    url: `http://localhost:3000/api/v1/books/categories/biography`,
  });

  const biographyBooks = biography.data.books;
  var filteredBiographyBooks = biographyBooks.filter(
    (book) =>
      book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail
  );
  filteredBiographyBooks = filteredBiographyBooks.filter(
    (book) =>
      book.volumeInfo.industryIdentifiers &&
      (book.volumeInfo.industryIdentifiers[0].identifier ||
        book.volumeInfo.industryIdentifiers[1].identifier)
  );

  const selfhelp = await axios({
    method: "GET",
    url: `http://localhost:3000/api/v1/books/categories/selfhelp`,
  });

  const selfhelpBooks = selfhelp.data.books;
  var filteredSelfhelpBooks = selfhelpBooks.filter(
    (book) =>
      book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail
  );
  filteredSelfhelpBooks = filteredSelfhelpBooks.filter(
    (book) =>
      book.volumeInfo.industryIdentifiers &&
      (book.volumeInfo.industryIdentifiers[0].identifier ||
        book.volumeInfo.industryIdentifiers[1].identifier)
  );

  res.status(200).render("categories", {
    title: "Categories",
    filteredCrimeBooks,
    filteredHorrorBooks,
    filteredPoetryBooks,
    filteredRomanceBooks,
    filteredSelfhelpBooks,
    filteredBiographyBooks,
    filteredAutobiographyBooks,
  });
});


exports.getFavPage = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const userFavorites = req.user.favorites;

  // Fetch details of all the books in the user's favorites array
  const promises = userFavorites.map((bookId) => {
    return axios.get(`http://localhost:3000/api/v1/books/getBook/${bookId}`);
  });

  const responses = await Promise.all(promises);
  const favoriteBooks = responses.map((response) => response.data.book);

  res.status(200).render("favpage", {
    title: "Favorites",
    favoriteBooks,
  });
});
