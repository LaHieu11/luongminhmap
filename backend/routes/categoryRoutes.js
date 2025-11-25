const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET /api/categories - Lấy tất cả danh mục
router.get('/', categoryController.getAllCategories);

module.exports = router;

