const express = require('express');
const router = express.Router();
const { registerPartner, getAllPartners } = require('../controllers/partnerController');

// Routes
router.post('/register', async (req, res) => {
    await registerPartner(req, res);
});

router.get('/', async (req, res) => {
    await getAllPartners(req, res);
});

module.exports = router;