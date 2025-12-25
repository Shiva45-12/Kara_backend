const Contact = require('../models/Contact');

// Submit Contact Form
const submitContact = async (req, res) => {
    try {
        const { name, email, phone, city, subject, message } = req.body;
        
        // Basic validation
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, phone and message are required' 
            });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email format' 
            });
        }
        
        // Phone validation (10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Phone number must be 10 digits' 
            });
        }
        
        // Save to database
        const newContact = new Contact({
            name,
            email,
            phone,
            city,
            subject,
            message
        });
        
        await newContact.save();
        
        res.status(201).json({
            success: true,
            message: 'Message sent successfully! We will contact you soon.',
            data: {
                id: newContact._id,
                name,
                email,
                phone,
                city,
                subject,
                message
            }
        });
        
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get All Contact Messages
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching contacts'
        });
    }
};

module.exports = {
    submitContact,
    getAllContacts
};