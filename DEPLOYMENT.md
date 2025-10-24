# Café Palu - Deployment Guide

## ✅ Deployment Status

**Status:** Successfully deployed to GitHub
**Repository:** https://github.com/f246632/cafe-palu
**GitHub Pages URL:** https://f246632.github.io/cafe-palu/

---

## 🚀 GitHub Pages Setup

### Automatic Setup (Recommended)

1. **Visit GitHub Pages Settings:**
   ```
   https://github.com/f246632/cafe-palu/settings/pages
   ```

2. **Configure Source:**
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
   - Click **Save**

3. **Wait for Deployment:**
   - GitHub will build and deploy automatically (1-2 minutes)
   - Check deployment status at: https://github.com/f246632/cafe-palu/deployments

4. **Access Live Site:**
   ```
   https://f246632.github.io/cafe-palu/
   ```

### Manual GitHub API Setup

If you prefer using the GitHub API:

```bash
curl -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/f246632/cafe-palu/pages \
  -d '{"source":{"branch":"main","path":"/"}}'
```

---

## 📁 Repository Structure

```
cafe-palu/
├── index.html              # Main entry point
├── css/
│   ├── style.css          # Main styles
│   └── responsive.css     # Responsive design
├── js/
│   ├── main.js           # Core functionality
│   └── gallery.js        # Gallery features
├── images/
│   ├── optimized/        # Web-ready images
│   └── downloaded/       # Original images
├── data/
│   ├── menu.json         # Menu data
│   └── reviews.json      # Customer reviews
├── README.md              # Documentation
└── DEPLOYMENT.md          # This file
```

---

## 🔄 Update Workflow

### Making Changes to the Website

1. **Edit Files Locally:**
   ```bash
   cd /Users/m./berlinwebsites/252_Caf\'e\ Palu\ncaf_palu
   # Edit files as needed
   ```

2. **Test Locally:**
   ```bash
   # Open in browser
   open index.html

   # Or use local server
   python3 -m http.server 8000
   # Visit: http://localhost:8000
   ```

3. **Commit Changes:**
   ```bash
   git add .
   git commit -m "Update: [describe your changes]"
   ```

4. **Push to GitHub:**
   ```bash
   git push origin main
   ```

5. **Wait for Deployment:**
   - GitHub Pages will automatically rebuild (1-2 minutes)
   - Check: https://github.com/f246632/cafe-palu/actions

---

## 🎨 Common Updates

### Update Menu

Edit `data/menu.json`:
```json
{
  "name": "New Item",
  "description": "Description",
  "price": "€5.50"
}
```

### Update Reviews

Edit `data/reviews.json`:
```json
{
  "author": "Customer Name",
  "rating": 5,
  "text": "Review text"
}
```

### Add New Images

1. Optimize image (< 500KB recommended)
2. Place in `images/optimized/`
3. Update `index.html` gallery section:
```html
<div class="gallery-item" data-image="images/optimized/new-image.jpg">
    <img src="images/optimized/new-image.jpg" alt="Description">
</div>
```

### Change Colors

Edit `css/style.css` CSS variables (lines 10-20):
```css
:root {
    --primary-cream: #FAF3E0;
    --secondary-terracotta: #C87941;
    /* ... more colors ... */
}
```

---

## 🔍 SEO & Analytics

### Add Google Analytics

Add before `</head>` in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Custom Domain (Optional)

1. **Add CNAME file:**
   ```bash
   echo "www.cafepalu.de" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. **Configure DNS:**
   - Add CNAME record: `www → f246632.github.io`
   - Add A records for apex domain (@ or cafepalu.de):
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **Update GitHub Settings:**
   - Go to: https://github.com/f246632/cafe-palu/settings/pages
   - Enter custom domain: `www.cafepalu.de`
   - Enable HTTPS (recommended)

---

## 📊 Performance Optimization

### Image Optimization

Use online tools:
- **TinyPNG:** https://tinypng.com/
- **Squoosh:** https://squoosh.app/
- **ImageOptim:** https://imageoptim.com/mac

Target:
- Hero images: < 500KB
- Gallery images: < 300KB
- Thumbnails: < 100KB

### Minification

For production, minify CSS and JS:
```bash
# Using npm packages
npm install -g clean-css-cli uglify-js

# Minify CSS
cleancss -o css/style.min.css css/style.css

# Minify JS
uglifyjs js/main.js -o js/main.min.js
```

Then update `index.html` to use `.min.css` and `.min.js` files.

---

## 🐛 Troubleshooting

### Site Not Loading

1. **Check GitHub Pages Status:**
   - Visit: https://github.com/f246632/cafe-palu/deployments
   - Ensure latest deployment succeeded

2. **Check Repository Settings:**
   - Visit: https://github.com/f246632/cafe-palu/settings/pages
   - Verify source branch is `main` and path is `/`

3. **Clear Browser Cache:**
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

4. **Check Console Errors:**
   - Open browser DevTools (F12)
   - Look for errors in Console tab

### Images Not Displaying

1. **Check File Paths:**
   - Ensure paths are relative: `images/optimized/hero-1.jpg`
   - NOT absolute: `/images/optimized/hero-1.jpg`

2. **Check File Names:**
   - Ensure no special characters
   - Case-sensitive on GitHub Pages

3. **Verify Image Size:**
   - Large images (> 1MB) may load slowly
   - Optimize before uploading

### CSS Not Applying

1. **Clear Cache:**
   - Hard refresh browser

2. **Check File Path:**
   - Verify `<link href="css/style.css">` is correct

3. **Check CSS Syntax:**
   - Use CSS validator: https://jigsaw.w3.org/css-validator/

---

## 📱 Testing Checklist

Before deploying major changes:

- [ ] Test on mobile (< 768px width)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Check all links work
- [ ] Check all images load
- [ ] Test contact form
- [ ] Test gallery lightbox
- [ ] Verify Google Maps loads
- [ ] Check accessibility (screen reader, keyboard nav)
- [ ] Run Lighthouse audit (Chrome DevTools)
- [ ] Validate HTML: https://validator.w3.org/
- [ ] Validate CSS: https://jigsaw.w3.org/css-validator/

---

## 🔐 Security

### HTTPS

GitHub Pages automatically provides HTTPS for `*.github.io` domains.

For custom domains:
1. Enable HTTPS in repository settings
2. Certificate is provided by GitHub (Let's Encrypt)

### Best Practices

- Never commit sensitive data (API keys, passwords)
- Keep `.gitignore` updated
- Use environment variables for secrets
- Regularly update dependencies

---

## 📞 Support

### Technical Issues

**Repository Owner:** f246632
**Repository:** https://github.com/f246632/cafe-palu

### Café Contact

**Phone:** 030 34 62 51 39
**Address:** Albrechtstraße 74, 12167 Berlin

---

## 📈 Monitoring

### Track Performance

1. **Google Search Console:**
   - Add property: https://f246632.github.io/cafe-palu/
   - Monitor search performance

2. **Google Analytics:**
   - Track visitors, page views, conversions
   - See setup instructions above

3. **GitHub Insights:**
   - Traffic: https://github.com/f246632/cafe-palu/graphs/traffic
   - Visitors: https://github.com/f246632/cafe-palu/graphs/visitors

---

## ✅ Deployment Checklist

- [x] Repository created
- [x] Initial commit pushed
- [x] All files committed
- [x] `.gitignore` configured
- [ ] GitHub Pages enabled (manual step required)
- [ ] Custom domain configured (optional)
- [ ] Google Analytics added (optional)
- [ ] SEO meta tags verified
- [ ] Mobile responsiveness tested
- [ ] Cross-browser testing completed
- [ ] Lighthouse audit passed

---

**Last Updated:** 2025-10-25
**Website Status:** Ready for deployment
**Next Step:** Enable GitHub Pages in repository settings

---

🎉 **Your beautiful website is ready to go live!** 🎉
