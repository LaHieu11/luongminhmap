// Serverless function for /api/locations/:id
// Import from backend MVC structure
const cors = require('cors')({ origin: true });
const locationController = require('../../backend/controllers/locationController');

module.exports = (req, res) => {
  cors(req, res, () => {
    // Vercel passes id as req.query.id for dynamic routes
    req.params = { id: req.query.id };
    locationController.getLocationById(req, res);
  });
};
