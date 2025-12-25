const AMC = require('../models/AMC');

// Submit AMC Quote Request
const submitAMCQuote = async (req, res) => {
    try {
        const { name, email, mobile, load, location } = req.body;
        
        // Basic validation
        if (!name || !email || !mobile || !load || !location) {
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
        
        // Mobile validation (10 digits)
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(mobile)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Mobile number must be 10 digits' 
            });
        }
        
        // Load validation
        if (load <= 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Load must be greater than 0' 
            });
        }
        
        // Save to database
        const newAMC = new AMC({
            name,
            email,
            mobile,
            load,
            location
        });
        
        await newAMC.save();
        
        res.status(201).json({
            success: true,
            message: 'AMC quote request submitted successfully! We will contact you soon.',
            data: {
                id: newAMC._id,
                name,
                email,
                mobile,
                load,
                location
            }
        });
        
    } catch (error) {
        console.error('AMC quote error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get All AMC Requests
const getAllAMCRequests = async (req, res) => {
    try {
        const amcRequests = await AMC.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: amcRequests.length,
            data: amcRequests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching AMC requests'
        });
    }
};

// Delete AMC Request
const deleteAMCRequest = async (req, res) => {
    try {
        const { id } = req.params;
        await AMC.findByIdAndDelete(id);
        res.json({
            success: true,
            message: 'AMC request deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting AMC request'
        });
    }
};

module.exports = {
    submitAMCQuote,
    getAllAMCRequests,
    deleteAMCRequest
};