import nodemailer from 'nodemailer';
export { renderers } from '../../renderers.mjs';

const prerender = false;
async function POST({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");
  if (!name || !email || !subject || !message) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: "Please enter a valid email address" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("Email configuration missing - SMTP_USER or SMTP_PASS not set");
      console.log("Contact form submission (email not configured):", {
        name,
        email,
        subject,
        message,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      return new Response(null, {
        status: 302,
        headers: {
          "Location": "/thank-you"
        }
      });
    }
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "steltner.cc",
      // Your mailcow server
      port: parseInt(process.env.SMTP_PORT || "587"),
      // 587 for STARTTLS, 465 for SSL
      secure: process.env.SMTP_PORT === "465",
      // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        // your email
        pass: process.env.SMTP_PASS
        // your password
      },
      tls: {
        rejectUnauthorized: false
        // You might need this for self-signed certificates
      }
    });
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
      <hr>
      <p><small>This message was sent from the contact form at steltner.cc on ${(/* @__PURE__ */ new Date()).toLocaleString()}</small></p>
    `;
    const textContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from the contact form at steltner.cc on ${(/* @__PURE__ */ new Date()).toLocaleString()}
    `;
    await transporter.sendMail({
      from: `"Steltner.cc Contact Form" <contact@steltner.cc>`,
      to: "tobias@steltner.cc",
      subject: `Contact Form: ${subject}`,
      text: textContent,
      html: htmlContent,
      replyTo: email
    });
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/thank-you"
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
    console.log("Contact form submission (email failed):", {
      name,
      email,
      subject,
      message,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/thank-you"
      }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
