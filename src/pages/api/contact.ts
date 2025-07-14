import nodemailer from 'nodemailer';

export const prerender = false; // This ensures the API route runs on the server

export async function POST({ request }: { request: Request }) {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return new Response(JSON.stringify({ error: 'All fields are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: 'Please enter a valid email address' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Check if email configuration is available
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('Email configuration missing - SMTP_USER or SMTP_PASS not set');
      // Log the form data for manual follow-up
      console.log('Contact form submission (email not configured):', {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
      });
      
      // Still redirect to thank you page, but you'll need to check logs
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/thank-you'
        }
      });
    }

    // Create nodemailer transporter
    // Configure this to use your mailcow SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'steltner.cc', // Your mailcow server
      port: parseInt(process.env.SMTP_PORT || '587'), // 587 for STARTTLS, 465 for SSL
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // your email
        pass: process.env.SMTP_PASS, // your password
      },
      tls: {
        rejectUnauthorized: false // You might need this for self-signed certificates
      }
    });

    // Email content
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>This message was sent from the contact form at steltner.cc on ${new Date().toLocaleString()}</small></p>
    `;

    const textContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from the contact form at steltner.cc on ${new Date().toLocaleString()}
    `;

    // Send email
    await transporter.sendMail({
      from: `"Steltner.cc Contact Form" <contact@steltner.cc>`,
      to: 'tobias@steltner.cc',
      subject: `Contact Form: ${subject}`,
      text: textContent,
      html: htmlContent,
      replyTo: email
    });

    // Redirect to thank you page
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/thank-you'
      }
    });
  } catch (error) {
    console.error('Error sending email:', error);
    
    // For now, log the form data and redirect anyway
    // In production, you might want to store this in a database
    console.log('Contact form submission (email failed):', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // Still redirect to thank you page
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/thank-you'
      }
    });
  }
}
