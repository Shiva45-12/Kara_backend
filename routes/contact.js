const express = require('express');
const router = express.Router();
const { submitContact, getAllContacts } = require('../controllers/contactController');

// Routes
router.post('/submit', async (req, res) => {
    await submitContact(req, res);
});

router.get('/', async (req, res) => {
    await getAllContacts(req, res);
});

module.exports = router;