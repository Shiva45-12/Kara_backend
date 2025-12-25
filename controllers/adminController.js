const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'kara-admin-secret', {
    expiresIn: '7d'
  });
};

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken(admin._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// Create Admin (for initial setup)
const createAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists'
      });
    }

    // Create new admin
    const admin = new Admin({
      email,
      password,
      name
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name
      }
    });

  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating admin'
    });
  }
};

// Get Dashboard Data
const getDashboardData = async (req, res) => {
  try {
    // Get counts from different collections
    const Contact = require('../models/Contact');
    const Partner = require('../models/Partner');
    const AMC = require('../models/AMC');

    const contactCount = await Contact.countDocuments();
    const partnerCount = await Partner.countDocuments();
    const amcCount = await AMC.countDocuments();

    // Get recent contacts
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email message createdAt');

    const dashboardData = {
      counts: {
        contacts: {
          total: contactCount,
          new: await Contact.countDocuments({ 
            createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } 
          })
        },
        partners: {
          total: partnerCount,
          new: await Partner.countDocuments({ 
            createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } 
          })
        },
        amc: {
          total: amcCount,
          new: await AMC.countDocuments({ 
            createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } 
          })
        },
        blogs: {
          total: 0,
          published: 0,
          featured: 0
        },
        applications: {
          total: 0,
          new: 0
        }
      },
      recentActivities: recentContacts.map(contact => ({
        id: contact._id,
        title: `New contact from ${contact.name}`,
        description: contact.message.substring(0, 100) + '...',
        type: 'contact',
        time: contact.createdAt.toLocaleDateString()
      })),
      engagement: {
        totalViews: Math.floor(Math.random() * 10000) + 5000,
        engagementRate: Math.floor(Math.random() * 30) + 60,
        averageViewsPerPost: Math.floor(Math.random() * 500) + 200,
        totalComments: Math.floor(Math.random() * 100) + 50,
        totalLikes: Math.floor(Math.random() * 200) + 100
      },
      growth: {
        last30Days: {
          newBlogs: Math.floor(Math.random() * 10) + 5,
          newContacts: contactCount
        }
      }
    };

    res.json({
      success: true,
      data: dashboardData
    });

  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data'
    });
  }
};

// Change Password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const adminId = req.admin.id; // From auth middleware

    // Get admin
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Check current password
    const isCurrentPasswordValid = await admin.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Validate new password
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error changing password'
    });
  }
};

module.exports = {
  loginAdmin,
  createAdmin,
  getDashboardData,
  changePassword
};