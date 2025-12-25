const Popup = require('../models/Popup');

// Submit Popup Form
const submitPopup = async (req, res) => {
    try {
        const { name, phone, email, city, interest } = req.body;
        
        // Basic validation
        if (!name || !phone || !email || !city || !interest) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
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
        const newPopup = new Popup({
            name,
            phone,
            email,
            city,
            interest
        });
        
        await newPopup.save();
        
        res.status(201).json({
            success: true,
            message: 'Thank you for your inquiry! We will contact you soon.',
            data: {
                id: newPopup._id,
                name,
                phone,
                email,
                city,
                interest
            }
        });
        
    } catch (error) {
        console.error('Popup form error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get All Popup Submissions
const getAllPopups = async (req, res) => {
    try {
        const popups = await Popup.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: popups.length,
            data: popups
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching popup submissions'
        });
    }
};

// Delete Popup Submission
const deletePopup = async (req, res) => {
    try {
        const { id } = req.params;
        await Popup.findByIdAndDelete(id);
        res.json({
            success: true,
            message: 'Popup submission deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting popup submission'
        });
    }
};

module.exports = {
    submitPopup,
    getAllPopups,
    deletePopup
};