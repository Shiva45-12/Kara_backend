require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const connectDB = require('./db/connection');

const createInitialAdmin = async () => {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (existingAdmin) {
      console.log('Admin already exists!');
      console.log('Email:', existingAdmin.email);
      process.exit(0);
    }

    // Create new admin
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL || 'admin@karagroup.com',
      password: process.env.ADMIN_PASSWORD || 'KaraAdmin@2025',
      name: 'KARA Group Admin'
    });

    await admin.save();
    
    console.log('✅ Initial admin created successfully!');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password:', process.env.ADMIN_PASSWORD || 'KaraAdmin@2025');
    console.log('🌐 Login URL: http://localhost:3000/admin/login');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createInitialAdmin();