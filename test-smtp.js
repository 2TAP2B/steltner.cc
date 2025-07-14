#!/usr/bin/env node
// Test script to verify SMTP configuration
// Run with: node test-smtp.js

import nodemailer from 'nodemailer';
import { config } from 'dotenv';

// Load environment variables
config();

async function testSMTP() {
  console.log('Testing SMTP configuration...');
  
  // Check if environment variables are set
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('❌ Environment variables not set!');
    console.log('Please create a .env file with:');
    console.log('SMTP_HOST=steltner.cc');
    console.log('SMTP_PORT=587');
    console.log('SMTP_USER=your-email@steltner.cc');
    console.log('SMTP_PASS=your-password');
    process.exit(1);
  }
  
  console.log('Configuration:');
  console.log(`Host: ${process.env.SMTP_HOST || 'steltner.cc'}`);
  console.log(`Port: ${process.env.SMTP_PORT || '587'}`);
  console.log(`User: ${process.env.SMTP_USER}`);
  console.log(`Pass: ${'*'.repeat(process.env.SMTP_PASS.length)}`);
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'steltner.cc',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  try {
    // Test connection
    console.log('\n🔍 Testing connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');
    
    // Send test email
    console.log('\n📧 Sending test email...');
    await transporter.sendMail({
      from: `"Steltner.cc Test" <${process.env.SMTP_USER}>`,
      to: 'tobias@steltner.cc',
      subject: 'SMTP Test Email',
      text: 'This is a test email from your contact form setup.',
      html: '<h2>SMTP Test Email</h2><p>This is a test email from your contact form setup.</p>'
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('Check your inbox at tobias@steltner.cc');
    
  } catch (error) {
    console.error('❌ SMTP test failed:');
    console.error(error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n💡 Authentication failed. Please check:');
      console.log('- Username and password are correct');
      console.log('- SMTP is enabled for your mailcow account');
      console.log('- Your mailcow server allows SMTP connections');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Connection refused. Please check:');
      console.log('- SMTP host is correct (try: steltner.cc or mail.steltner.cc)');
      console.log('- SMTP port is correct (587 for STARTTLS, 465 for SSL)');
      console.log('- Your firewall allows outbound connections');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('\n💡 Connection timeout. Please check:');
      console.log('- Your server can reach steltner.cc');
      console.log('- No firewall blocking the connection');
    }
  }
}

testSMTP().catch(console.error);
