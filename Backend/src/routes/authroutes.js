const express = require('express');
const router = express.Router();
const{ registerUser, loginUser } = require('../controllers/authcontroller');
router.get('/register',registerUser);
router.get('/login', loginUser);
module.exports = router;
