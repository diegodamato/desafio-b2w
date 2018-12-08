const mongoose = require('mongoose');

const model = {
  id: 'string',
  name: 'string',
  climate: 'string',
  terrain: 'string',
  participations: 'number',
};

const schema = new mongoose.Schema(model);
const planetModel = mongoose.model('planet', schema);

module.exports = { planetModel };
  