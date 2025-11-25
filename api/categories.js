const cors = require('cors')({ origin: true });
const locations = require('./locations');

module.exports = (req, res) => {
  cors(req, res, () => {
    const categories = ['Tất cả', ...new Set(locations.map(loc => loc.category))];
    res.status(200).json(categories);
  });
};

