// Serverless function for /api/locations
// Import from backend MVC structure
const cors = require('cors')({ origin: true });
const locationController = require('../../backend/controllers/locationController');

module.exports = (req, res) => {
  cors(req, res, () => {
    locationController.getAllLocations(req, res);
  });
};
