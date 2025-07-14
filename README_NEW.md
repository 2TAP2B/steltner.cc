# 🏠 Steltner.cc - Static Site

A German static website showcasing self-hosted services and digital sovereignty.

## 🚀 Features

- **Static Site**: Pure HTML/CSS/JS - no server required
- **German Content**: Fully translated interface and content
- **Self-Hosting Focus**: Showcases Matrix, Mastodon, Email, and file sharing
- **Contact Form**: Uses mailto links for direct email contact
- **Responsive Design**: Works on all devices
- **Fast Performance**: Static files load instantly

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment

This is a **static site** that can be deployed to any static hosting service:

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect the Astro framework
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. No additional configuration needed

### Other Static Hosts
- **Netlify**: Upload `dist` folder or connect via Git
- **GitHub Pages**: Use the `dist` folder
- **Cloudflare Pages**: Connect repository, build with `npm run build`

## 🏗️ Build Output

The build creates a `dist` folder containing:
- `index.html` - Main page
- `imprint/` - German imprint page  
- `privacy/` - German privacy policy
- `_astro/` - CSS and JavaScript assets
- `img/` - Images and icons
- `robots.txt` - SEO file

## 📧 Contact Form

The contact form uses `mailto:` links to open the user's email client with pre-filled information. No server-side processing required.

## 🔧 Configuration

Site configuration is in `astro.config.mjs`:
- Site URL: `https://www.steltner.cc/`
- Output: Static files only
- Build directory: `dist`

## 📄 License

MIT License
