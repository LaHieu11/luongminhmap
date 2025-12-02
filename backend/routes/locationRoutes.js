const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const { authenticate, isAdmin } = require('../middleware/auth');

// GET /api/locations - Lấy tất cả địa điểm (public)
router.get('/', locationController.getAllLocations);

// GET /api/locations/:id - Lấy địa điểm theo ID (public)
router.get('/:id', locationController.getLocationById);

// POST /api/locations - Tạo địa điểm mới (Admin only)
router.post('/', authenticate, isAdmin, locationController.createLocation);

// PUT /api/locations/:id - Cập nhật địa điểm (Admin only)
router.put('/:id', authenticate, isAdmin, locationController.updateLocation);

// DELETE /api/locations/:id - Xóa địa điểm (Admin only)
router.delete('/:id', authenticate, isAdmin, locationController.deleteLocation);

module.exports = router;

