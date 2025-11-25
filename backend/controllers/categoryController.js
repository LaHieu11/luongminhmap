const Location = require('../models/Location');

// Lấy tất cả danh mục
const getAllCategories = (req, res) => {
  try {
    const categories = Location.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error in getAllCategories:', error);
    res.status(500).json({ 
      error: { 
        code: '500', 
        message: error.message || 'A server error has occurred' 
      } 
    });
  }
};

module.exports = {
  getAllCategories
};

