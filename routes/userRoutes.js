const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);



router.use(authController.protect);
router.patch(
  '/updateMyPassword',
  authController.updatePassword
);
router.post('/add-to-favorites',userController.addToFavorites);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe',  userController.updateMe);
router.delete('/deleteMe',  userController.deleteMe);

// router
//   .route('/')
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

  // alternative 
  // app.get('/',userController.getAllUsers)
  // app.post('/',userController.createUser)

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;