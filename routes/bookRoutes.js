const express = require("express");

const bookController = require("../controllers/bookController");

const router = express.Router();

// router.route("/").get(bookController.getAllBooks);

router.route("/:Book").get(bookController.getBook);
router.route("/categories/:Book").get(bookController.getBookForCategories);
router.route("/getBook/:id").get(bookController.getBookByID);

module.exports = router;
