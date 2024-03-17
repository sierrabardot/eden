const express = require('express');
const usersCtrl = require('../../controllers/users.js');
const ensureLoggedIn = require('../../middleware/ensureLoggedIn.js');

const router = express.Router();

// Base url might be /api/users
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;
