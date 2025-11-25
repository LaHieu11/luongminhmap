const cors = require('cors')({ origin: true });
const locations = require('../locations');

module.exports = (req, res) => {
  cors(req, res, () => {
    const { category, search } = req.query;
    
    let filteredLocations = [...locations];
    
    // Filter by category
    if (category && category !== 'Tất cả') {
      filteredLocations = filteredLocations.filter(
        loc => loc.category === category
      );
    }
    
    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filteredLocations = filteredLocations.filter(
        loc => 
          loc.name.toLowerCase().includes(searchLower) ||
          loc.address.toLowerCase().includes(searchLower)
      );
    }
    
    res.status(200).json(filteredLocations);
  });
};

