const express = require('express');
const router = express.Router();
const { submitPopup, getAllPopups, deletePopup } = require('../controllers/popupController');

// Routes
router.post('/send', async (req, res) => {
    await submitPopup(req, res);
});

router.get('/', async (req, res) => {
    await getAllPopups(req, res);
});

router.delete('/:id', async (req, res) => {
    await deletePopup(req, res);
});

module.exports = router;