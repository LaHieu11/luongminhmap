const cors = require('cors')({ origin: true });
const locations = require('../locations');

module.exports = (req, res) => {
  cors(req, res, () => {
    const { id } = req.query;
    const location = locations.find(loc => loc.id === parseInt(id));
    
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    
    res.status(200).json(location);
  });
};

