const express = require('express');
const { createCar } = require('../controllers/Car');
const {isAuthenticated} = require('../middlewares/auth');
const router = express.Router();

router.post('/createcar', isAuthenticated, createCar);

module.exports = router;
