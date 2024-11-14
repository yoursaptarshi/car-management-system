const express = require('express');
const { createCar,deleteCar,listCars,getCar,updateCar} = require('../controllers/Car');
const {isAuthenticated} = require('../middlewares/auth');
const router = express.Router();

router.post('/createcar', isAuthenticated, createCar);
router.delete('/deletecar', deleteCar);
router.get('/cars', listCars);
router.post('/cars/detail', getCar);
router.put('/updatecar', updateCar);

module.exports = router;
