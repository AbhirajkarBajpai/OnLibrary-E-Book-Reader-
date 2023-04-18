const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewsController.getOverview);
router.get("/signup", authController.isLoggedIn, viewsController.getSignupForm);
router.get("/forgotpassword",  viewsController.getforgotpasswordpage);
router.get("/changePassword",  viewsController.changePassword);
router.get("/me", authController.protect, viewsController.getAccount);

router.get("/search-book", authController.isLoggedIn,viewsController.getBookBySearch);
router.get("/categories", authController.isLoggedIn,viewsController.getCategoryPage);
router.get("/read-book",authController.isLoggedIn, viewsController.readBook);
router.get("/get-your-favorites",authController.protect, viewsController.getFavPage);
router.get("/sendemail", viewsController.sendEmail);
module.exports = router;
