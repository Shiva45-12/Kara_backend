const Partner = require('../models/Partner');

// Register Partner
const registerPartner = async (req, res) => {
    try {
        const { fullName, companyName, location, projectInterest, mobile, email } = req.body;
        
        // Basic validation
        if (!fullName || !companyName || !location || !projectInterest || !mobile || !email) {
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
        
        // Save to database
        const newPartner = new Partner({
            fullName,
            companyName,
            location,
            projectInterest,
            mobile,
            email
        });
        
        await newPartner.save();
        
        res.status(201).json({
            success: true,
            message: 'Partner registration successful! We will contact you soon.',
            data: {
                id: newPartner._id,
                fullName,
                companyName,
                location,
                projectInterest,
                mobile,
                email
            }
        });
        
    } catch (error) {
        console.error('Partner registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get All Partners
const getAllPartners = async (req, res) => {
    try {
        const partners = await Partner.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: partners.length,
            data: partners
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching partners'
        });
    }
};

// Delete Partner
const deletePartner = async (req, res) => {
    try {
        const { id } = req.params;
        await Partner.findByIdAndDelete(id);
        res.json({
            success: true,
            message: 'Partner deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting partner'
        });
    }
};

module.exports = {
    registerPartner,
    getAllPartners,
    deletePartner
};