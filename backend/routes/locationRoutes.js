const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// GET /api/locations - Lấy tất cả địa điểm
router.get('/', locationController.getAllLocations);

// GET /api/locations/:id - Lấy địa điểm theo ID
router.get('/:id', locationController.getLocationById);

module.exports = router;

