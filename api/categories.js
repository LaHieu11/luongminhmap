// Serverless function for /api/categories
// Import from backend MVC structure
const cors = require('cors')({ origin: true });
const categoryController = require('../backend/controllers/categoryController');

module.exports = (req, res) => {
  cors(req, res, () => {
    categoryController.getAllCategories(req, res);
  });
};
