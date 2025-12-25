const express = require('express');
const router = express.Router();
const { registerPartner, getAllPartners, deletePartner } = require('../controllers/partnerController');

// Routes
router.post('/register', async (req, res) => {
    await registerPartner(req, res);
});

router.get('/', async (req, res) => {
    await getAllPartners(req, res);
});

router.delete('/:id', async (req, res) => {
    await deletePartner(req, res);
});

module.exports = router;