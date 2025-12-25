const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    fullName: {
         type: String, 
         required: true 
        },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    projectInterest: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Partner', partnerSchema);