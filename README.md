# Steltner.cc - Email Hosting Landing Page

A professional landing page for steltner.cc email hosting services, built with Astro and Tailwind CSS.

## Features

- **Professional Design**: Clean, modern landing page showcasing mailcow email hosting
- **Contact Form**: Integrated contact form that sends emails to tobias@steltner.cc
- **Responsive**: Mobile-first design that works on all devices
- **Fast**: Built with Astro for optimal performance
- **SEO Optimized**: Proper meta tags and structured data

## Email Hosting Features Highlighted

- Self-hosted mailcow mail server
- Docker containerized infrastructure
- Advanced security (SPF, DKIM, DMARC)
- Professional webmail interface (SOGo)
- High availability and reliability
- Easy management and administration

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Settings

**⚠️ IMPORTANT SECURITY NOTE**: Never commit your `.env` file to version control!

Copy the environment template and configure your SMTP settings:

```bash
cp .env.example .env
```

Edit `.env` with your mailcow SMTP settings:

```
SMTP_HOST=steltner.cc
SMTP_PORT=587
SMTP_USER=contact@steltner.cc
SMTP_PASS=your-secure-password-here
```

**SMTP Port Options:**
- **587**: STARTTLS (recommended for most setups)
- **465**: SSL/TLS (use if 587 doesn't work)
- **25**: Plain (usually blocked by ISPs)

### 3. Test Email Configuration

Before using the contact form, test your SMTP settings:

```bash
npm run test-smtp
```

This will verify your SMTP connection and send a test email.

### 4. Development

```bash
npm run dev
```

### 5. Production Build

```bash
npm run build
```

## Contact Form Configuration

The contact form is configured to:
- Validate all input fields
- Send emails to `tobias@steltner.cc`
- Redirect to a thank you page after submission
- Handle errors gracefully

### Email Configuration

The contact form uses nodemailer to send emails through your mailcow server. Make sure to:

1. Create a dedicated email account for contact forms (e.g., `contact@steltner.cc`)
2. Configure SMTP settings in your `.env` file
3. Ensure your mailcow server allows SMTP connections from your web server

### Production Deployment

For production deployment:

1. Set up environment variables on your server
2. Configure your web server to serve the built files
3. Ensure your mailcow server is accessible from your web server
4. Test the contact form thoroughly

## File Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── About.astro       # About section
│   │   ├── Features.astro    # Features grid
│   │   ├── Header.astro      # Hero section
│   │   └── Register.astro    # Contact form
│   ├── Footer.astro
│   ├── Head.astro
│   └── Navbar.astro
├── data/
│   ├── features.json         # Feature list
│   └── site.json            # Site metadata
├── pages/
│   ├── api/
│   │   └── contact.ts       # Contact form handler
│   ├── imprint.md
│   ├── privacy.md
│   ├── thank-you.astro
│   └── index.astro
└── styles/
    └── global.css
```

## Customization

### Updating Content

- **Site information**: Edit `src/data/site.json`
- **Features**: Edit `src/data/features.json`
- **About section**: Edit `src/content/sections/about.md`
- **Contact section**: Edit `src/content/sections/register.md`

### Styling

The site uses Tailwind CSS for styling. You can customize the theme by editing:
- `tailwind.config.cjs` - Tailwind configuration
- `src/styles/global.css` - Global styles

## Security Considerations

1. **Environment Variables**: Never commit your `.env` file to version control
2. **SMTP Credentials**: Use strong passwords for your SMTP account
3. **Rate Limiting**: Consider implementing rate limiting on the contact form
4. **SSL/TLS**: Ensure your mailcow server uses proper SSL/TLS certificates

## Support

If you have questions about the email hosting services, please contact:
- Email: tobias@steltner.cc
- Website: https://steltner.cc

## License

This project is licensed under the MIT License.

**Change Content:**

Page content is stored in

- `./src/pages/`
  - `imprint.md`
  - `privacy.md`
- `./src/content/sections/`
- `./src/data/features.json`

**Change Templates/Layout:**

Page structure and templates are stored in `./src/layouts/` and can be edited there.

Best have a look at `./layouts/Base.astro` first to understand how it all comes together - the page itself is constructed from partial templates stored in `./src/components/` and each section has a corresponding template file in the `sections` subfolder.

Sections are a so called [collection](https://docs.astro.build/en/guides/content-collections/) that's defined in `./src/content/config.ts`. They are processed in alphabetical order (as stored in `./src/content/sections/`) by the `Wrapper.astro` component (`./src/components/sections/`). The wrapper passes them into the `SectionResolver.astro` component (`./src/components/sections/`); this intermediary resolver should help reduce redundancy in keeping the actual section components as "dumb" as possible.

**Change images:**

Images are stored in `./public/img/`; everything in there can be considered a placeholder that should eventually be replaced with your actual production images.
# steltner.cc
