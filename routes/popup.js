const express = require('express');
const router = express.Router();
const { submitPopup, getAllPopups } = require('../controllers/popupController');

// Routes
router.post('/send', async (req, res) => {
    await submitPopup(req, res);
});

router.get('/', async (req, res) => {
    await getAllPopups(req, res);
});

module.exports = router;