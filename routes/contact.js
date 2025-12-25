const express = require('express');
const router = express.Router();
const { submitContact, getAllContacts, deleteContact } = require('../controllers/contactController');

// Routes
router.post('/submit', submitContact);
router.get('/', getAllContacts);
router.delete('/:id', deleteContact);

module.exports = router;