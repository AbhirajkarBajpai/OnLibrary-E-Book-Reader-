const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");


const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});



exports.addToFavorites = catchAsync(async (req, res) => {
  const bookId = req.body.bookId;
  console.log(typeof(bookId));
  // Check if the book is already added to the user's favorites
  const isBookFavorite = req.user.favorites.includes(bookId);
  console.log(isBookFavorite);
  var message;
  if (isBookFavorite) {
    // Remove the book from the user's favorites
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $pull: { favorites: bookId } },
      { new: true }
    );
    message="Book Removed From Favorites";
  } else {
    // Add the book to the user's favorites
    await User.findByIdAndUpdate(req.user.id, { $push: { favorites: bookId }},{
      new: true,
      runValidators: true,
    });
    message="Book Successfully, Added To Your Favorites";
  }
  res.status(200).send({
    status: "success",
    message,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return res.status(400).json({
      status: 'fail',
      message: "This route is not for password updates. Please use /updateMyPassword."
    });
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
