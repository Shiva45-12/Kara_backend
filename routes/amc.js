const express = require('express');
const router = express.Router();
const { submitAMCQuote, getAllAMCRequests, deleteAMCRequest } = require('../controllers/amcController');

// Routes
router.post('/quote', async (req, res) => {
    await submitAMCQuote(req, res);
});

router.get('/', async (req, res) => {
    await getAllAMCRequests(req, res);
});

router.delete('/:id', async (req, res) => {
    await deleteAMCRequest(req, res);
});

module.exports = router;