const express = require('express');
const router = express.Router();

const { getTour, getOverView, loginForm, getAccount, updateUser } = require('./../controllers/viewController');
const { protect, isLoggedIn } = require('./../controllers/authControllers');

router.get('/me', protect, getAccount);
router.post('/submit-user-data', protect, updateUser)

router.use(isLoggedIn)

router.get('/', getOverView);
router.get('/tour/:slug', getTour);
router.get('/login', loginForm);

module.exports = router;
