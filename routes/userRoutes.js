const express = require('express');
const userController = require('../controllers/userController');
const { signUp, login } = userController;
const userAuth = require('../middlewares/userAuth');

const router = express.Router();

router.post('/signup', userAuth, signUp);
router.post('/login', login);

module.exports = router;
