const express = require('express');
const router = express.Router();
const { submitAMCQuote, getAllAMCRequests } = require('../controllers/amcController');

// Routes
router.post('/quote', async (req, res) => {
    await submitAMCQuote(req, res);
});

router.get('/', async (req, res) => {
    await getAllAMCRequests(req, res);
});

module.exports = router;