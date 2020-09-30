const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    country: { type: String, required: true },
    code: { type: String, required: true },
    capital_city: { type: String, required: true },
    continent: { type: String, required: true },
    area: { type: Number, required: true },
});

module.exports = mongoose.model('Country', countrySchema);
