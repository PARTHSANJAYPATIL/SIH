# KrishiBazar Setup & Customization Guide 🛠️

Complete guide to run, customize, and deploy KrishiBazar locally and to production.

---

## 📖 Table of Contents

1. [Quick Start](#quick-start)
2. [Installation Methods](#installation-methods)
3. [Project Structure](#project-structure)
4. [Customization](#customization)
5. [Adding New Features](#adding-new-features)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start (5 Minutes)

### Option 1: Python HTTP Server (Easiest)
```bash
# Navigate to project directory
cd path/to/krishiBazar

# Start server (Python 3)
python -m http.server 8000

# Open browser
# Visit: http://localhost:8000
```

### Option 2: Node.js HTTP Server
```bash
# Install http-server globally (one-time)
npm install -g http-server

# Start server in project directory
http-server

# Visit: http://localhost:8080
```

### Option 3: Browser Direct (No Server)
```bash
# Just open index.html in browser
# File → Open → krishiBazar/index.html

# ⚠️ Note: Some features may not work due to CORS restrictions
```

### Option 4: VS Code Live Server
```bash
# Install Live Server extension in VS Code
# Right-click index.html → Open with Live Server
# Visit: http://127.0.0.1:5500
```

---

## 📥 Installation Methods

### Method 1: GitHub Clone
```bash
git clone https://github.com/yourusername/krishibazar.git
cd krishibazar
python -m http.server 8000
```

### Method 2: Download ZIP
```bash
# Download from GitHub (Code → Download ZIP)
# Extract: krishiBazar-main.zip
# Open: krishiBazar-main/index.html in browser
```

### Method 3: Local Folder
```bash
# Copy krishiBazar folder to desired location
# Open terminal in that folder
# python -m http.server 8000
```

---

## 📁 Project Structure

```
krishiBazar/
│
├── 📄 index.html              # Home page
├── 📄 marketplace.html        # Marketplace listing page
├── 📄 farmer.html             # Farmer dashboard
├── 📄 buyer.html              # Bulk buyer portal
├── 📄 logistics.html          # Logistics management
├── 📄 ai.html                 # AI insights & forecasting
├── 📄 orders.html             # Cart & checkout
├── 📄 login.html              # Authentication page
│
├── 📁 css/
│   └── style.css              # All styling (responsive)
│                              # Breakpoints: 480px, 768px, 1024px+
│
├── 📁 js/
│   ├── data.js                # KB object, produce data, translations
│   ├── app.js                 # Core utilities, nav, auth, cart
│   ├── farmer.js              # Farmer page logic
│   ├── marketplace.js         # Marketplace filters & rendering
│   ├── buyer.js               # Buyer page logic
│   ├── logistics.js           # Logistics optimization
│   └── ai.js                  # AI forecasting & chart
│
├── 📄 README.md               # Main documentation
├── 📄 FEATURES.md             # Detailed feature guide
├── 📄 SETUP.md                # This file
├── 📄 LICENSE                 # MIT License
└── 📄 .gitignore              # Git ignore patterns
```

---

## 🎨 Customization

### 1. Change Brand Colors

**File:** `css/style.css`

Locate CSS variables section and update:
```css
:root {
  --saffron: #ff9933;        /* Change primary color */
  --green: #138808;          /* Change accent color */
  --green-dark: #0b5c05;     /* Change dark accent */
  --green-soft: #e8f6e6;     /* Change soft background */
  --navy: #0f2744;           /* Change secondary color */
  --ink: #1a2332;            /* Change text color */
  --muted: #5b667a;          /* Change subtext color */
  --line: #e4eadf;           /* Change border color */
  --paper: #f7f4ee;          /* Change background color */
  /* ... other variables ... */
}
```

**Example: Make it Orange & Blue**
```css
:root {
  --saffron: #ff6b35;        /* Orange primary */
  --green: #004e89;          /* Blue accent */
  --green-dark: #003a70;     /* Dark blue */
  --green-soft: #e8f1f9;     /* Light blue background */
  /* ... */
}
```

Then reload page in browser (Ctrl+F5 hard refresh).

### 2. Add New Produce Item

**File:** `js/data.js`

Find `KB.produce` array and add new object:
```javascript
const KB = {
  // ... other properties ...
  
  produce: [
    { 
      id: "p1", 
      name: "Nashik Red Onion", 
      crop: "Onion", 
      fpo: "Sahyadri FPO", 
      state: "Maharashtra", 
      mandi: 18, 
      farm: 24, 
      retail: 42, 
      unit: "kg", 
      qty: 12000, 
      grade: "A", 
      emoji: "🧅", 
      color: "#8b3a62" 
    },
    // ADD NEW ITEM HERE
    { 
      id: "p13",                    // New unique ID
      name: "Organic Honey (Apiaries)", 
      crop: "Honey", 
      fpo: "Sahyadri Apiary Co-op", 
      state: "Maharashtra", 
      mandi: 280, 
      farm: 350, 
      retail: 480, 
      unit: "kg", 
      qty: 2500, 
      grade: "Organic", 
      emoji: "🍯", 
      color: "#d4a574" 
    },
    // ... rest of produce ...
  ]
};
```

**Reload page** → New item appears in marketplace.

### 3. Add New State/City

**File:** `js/data.js`

Update states and cities arrays:
```javascript
const KB = {
  org: "Ministry of Consumer Affairs, Food & Public Distribution",
  dept: "Department of Consumer Affairs (DoCA)",
  
  states: [
    "Andhra Pradesh", 
    "Bihar", 
    "Gujarat", 
    "Haryana", 
    "Karnataka", 
    "Madhya Pradesh",
    "Maharashtra", 
    "Odisha", 
    "Punjab", 
    "Rajasthan", 
    "Tamil Nadu", 
    "Telangana",
    "Uttar Pradesh", 
    "West Bengal",
    "Assam",              // ADD NEW STATE
    "Himachal Pradesh",   // ADD NEW STATE
  ],
  
  cities: [
    "Delhi NCR", 
    "Mumbai", 
    "Pune", 
    "Bengaluru", 
    "Hyderabad", 
    "Ahmedabad", 
    "Kolkata", 
    "Lucknow", 
    "Chennai", 
    "Jaipur", 
    "Nashik", 
    "Nagpur",
    "Guwahati",          // ADD NEW CITY
    "Shimla",            // ADD NEW CITY
  ],
  
  // ... rest of KB ...
};
```

### 4. Change Language Translations

**File:** `js/data.js`

Find `I18N` object and update:
```javascript
const I18N = {
  en: {
    brand: "KrishiBazar",
    tagline: "Farm to kitchen. No extra middlemen.",
    heroTitle: "Better prices for farmers. Lower prices for Indian households.",
    home: "Home",
    market: "Marketplace",
    // ... more keys ...
  },
  hi: {
    brand: "कृषि बाज़ार",
    tagline: "खेत से रसोई। कोई अतिरिक्त बिचौलिया नहीं।",
    heroTitle: "किसानों के लिए बेहतर कीमतें। भारतीय घरों के लिए कम कीमतें।",
    home: "होम",
    market: "बाजार",
    // ... more हिन्दी translations ...
  }
};
```

**Add new language (e.g., Spanish):**
```javascript
const I18N = {
  en: { /* ... */ },
  hi: { /* ... */ },
  es: {
    brand: "KrishiBazar",
    tagline: "Granja a cocina. Sin intermediarios extra.",
    heroTitle: "Mejores precios para agricultores...",
    home: "Inicio",
    market: "Mercado",
    // ... Spanish translations ...
  }
};
```

Update navigation button to include Spanish toggle:
```html
<!-- In js/app.js navHTML() function -->
<button class="lang-toggle" id="langBtn" type="button">हिन्दी</button>
<!-- Change to cycle through en → hi → es → en -->
```

### 5. Add New Logistics Hub

**File:** `js/data.js`

Update `hubs` array:
```javascript
const KB = {
  // ... other properties ...
  
  hubs: [
    { id: "h1", name: "Nashik Aggregation Hub", type: "FPO Collection", lat: 20.0, lng: 73.8 },
    { id: "h2", name: "Pune Cold Chain", type: "Cold Store", lat: 18.5, lng: 73.8 },
    { id: "h3", name: "Mumbai Retail Cluster", type: "Buyer", lat: 19.07, lng: 72.87 },
    // ADD NEW HUB
    { id: "h7", name: "Indore Grain Hub", type: "Wholesale", lat: 22.71, lng: 75.86 },
  ]
};
```

### 6. Update Price Forecast

**File:** `js/data.js`

Modify forecast array (12-month prices):
```javascript
const KB = {
  // ... other properties ...
  
  forecast: {
    Onion: [32, 28, 24, 22, 26, 40, 55, 48, 36, 30, 28, 34],  // Current forecast
    Tomato: [22, 18, 16, 20, 28, 35, 42, 30, 22, 18, 20, 24],
    Wheat: [24, 24, 25, 26, 27, 26, 25, 25, 26, 27, 28, 27],
    Rice: [42, 43, 44, 45, 46, 44, 43, 44, 45, 47, 48, 46],
    // ADD NEW CROP FORECAST
    Honey: [280, 290, 300, 310, 320, 330, 340, 330, 320, 310, 300, 290],
  }
};
```

---

## ✨ Adding New Features

### Feature 1: Add a New Page (e.g., Ratings & Reviews)

**Step 1:** Create HTML file `ratings.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Ratings & Reviews · KrishiBazar</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body data-page="ratings">
  <div id="site-nav"></div>
  
  <section class="section">
    <div class="container">
      <h2>FPO & Farmer Ratings</h2>
      <p class="sub">Transparent feedback from consumers, bulk buyers, and logistics partners.</p>
      
      <div id="ratingsGrid" class="grid-3"></div>
    </div>
  </section>
  
  <div id="site-footer"></div>
  <script src="js/data.js"></script>
  <script src="js/app.js"></script>
  <script src="js/ratings.js"></script>
</body>
</html>
```

**Step 2:** Create logic file `js/ratings.js`
```javascript
function renderRatings() {
  const grid = document.getElementById("ratingsGrid");
  if (!grid) return;
  
  const ratings = [
    { fpo: "Sahyadri FPO", rating: 4.8, reviews: 342, emoji: "⭐" },
    { fpo: "Malwa Kisan FPO", rating: 4.6, reviews: 215, emoji: "⭐" },
    // ... more ratings ...
  ];
  
  grid.innerHTML = ratings.map(r => `
    <div class="card">
      <h3>${r.emoji} ${r.fpo}</h3>
      <p>${r.rating}/5 (${r.reviews} reviews)</p>
      <a class="btn" href="#">View reviews</a>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderRatings();
});
```

**Step 3:** Add navigation link in `js/app.js`
```javascript
function navHTML(active) {
  return `
  <!-- ... existing nav ... -->
  <nav class="nav-links">
    <a href="index.html" class="${active==="home"?"active":""}">Home</a>
    <a href="marketplace.html" class="${active==="market"?"active":""}">Marketplace</a>
    <a href="ratings.html" class="${active==="ratings"?"active":""}">Ratings</a>  <!-- ADD THIS LINE -->
    <!-- ... rest of nav ... -->
  </nav>
  `;
}
```

**Step 4:** Reload → New page appears in navigation.

### Feature 2: Add Dark Mode

**Step 1:** Add dark mode CSS to `css/style.css`
```css
/* Dark mode palette */
@media (prefers-color-scheme: dark) {
  :root {
    --paper: #1a1f2e;
    --white: #2a3142;
    --ink: #e0e0e0;
    --muted: #a0a0b0;
    --line: #3a4052;
  }
}

/* Or add manual toggle */
body.dark-mode {
  --paper: #1a1f2e;
  --white: #2a3142;
  --ink: #e0e0e0;
  --muted: #a0a0b0;
  --line: #3a4052;
}
```

**Step 2:** Add toggle button in `app.js`
```javascript
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  Store.set("darkMode", document.body.classList.contains("dark-mode"));
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  if (Store.get("darkMode", false)) {
    document.body.classList.add("dark-mode");
  }
});
```

**Step 3:** Add button to navigation HTML.

### Feature 3: Add Push Notifications (Demo)

**Step 1:** Create function in `app.js`
```javascript
function showNotification(title, options) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, options);
  }
}

function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        showNotification("KrishiBazar", {
          body: "Push notifications enabled!",
          icon: "🌾"
        });
      }
    });
  }
}
```

**Step 2:** Call on page load:
```javascript
document.addEventListener("DOMContentLoaded", () => {
  // ... existing code ...
  requestNotificationPermission();
});
```

---

## 🚀 Deployment

### Option 1: Deploy to GitHub Pages (Free)

**Step 1:** Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/krishibazar.git
git push -u origin main
```

**Step 2:** Enable GitHub Pages
- Go to repository → Settings → Pages
- Source: main branch, / (root)
- Wait 1–2 minutes
- Visit: `https://yourusername.github.io/krishibazar/`

### Option 2: Deploy to Netlify (Free, Easy)

**Step 1:** Connect GitHub
- Visit netlify.com → Sign up with GitHub
- Authorize Netlify
- Click "New site from Git"
- Select your krishibazar repository

**Step 2:** Configure
- Build command: (leave blank—no build needed)
- Publish directory: `.` (root)
- Click "Deploy site"

**Step 3:** Access
- Netlify assigns domain: `random-name-12345.netlify.app`
- Visit to see live site

### Option 3: Deploy to AWS S3 + CloudFront

**Step 1:** Create S3 bucket
```bash
aws s3 mb s3://krishibazar-demo
aws s3 sync . s3://krishibazar-demo --delete
```

**Step 2:** Enable static website hosting
- AWS S3 console → Bucket → Properties
- Static website hosting: Enable
- Index: index.html

**Step 3:** Create CloudFront distribution
- CloudFront → Distributions → Create
- Origin: S3 bucket
- Wait for deployment (5–10 min)
- Visit CloudFront domain

### Option 4: Deploy to Heroku (With Backend)

For a production backend (Node.js example):

**Create `server.js`:**
```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('.'));

app.get('/api/produce', (req, res) => {
  // Return produce from database
  res.json({ produce: KB.produce });
});

app.listen(PORT, () => console.log(`Server running on :${PORT}`));
```

**Deploy:**
```bash
heroku login
heroku create krishibazar-app
git push heroku main
heroku open
```

---

## 🔧 Troubleshooting

### Issue 1: "Cannot load local resource" (CORS Error)

**Problem:** Opening `index.html` directly shows CORS error.

**Solution:**
Use a local server (Python, Node.js, or VS Code Live Server):
```bash
python -m http.server 8000
```

### Issue 2: Images/CSS Not Loading

**Problem:** Browser shows broken images or unstyled page.

**Solution:**
- Check file paths are relative (e.g., `css/style.css`, not `/css/style.css`)
- Verify files exist: `ls -la css/style.css`
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Issue 3: Data Not Persisting

**Problem:** Cart/listings disappear after refresh.

**Reason:** localStorage cleared or browser in private mode.

**Solution:**
- Use normal (non-private) browser mode
- Check: DevTools → Application → Storage → Local Storage
- Manually set data: `localStorage.setItem("kb_cart", "[]")`

### Issue 4: Translations Not Showing

**Problem:** Language toggle button appears but text doesn't change.

**Solution:**
- Check HTML has `data-i18n` attribute: `<h1 data-i18n="heroTitle">`
- Check translation key exists in `I18N` object
- Open DevTools Console: `applyI18n()` to manually trigger

### Issue 5: Mobile Menu Not Opening

**Problem:** Hamburger menu doesn't appear or doesn't toggle menu.

**Solution:**
- Check CSS responsive breakpoint: `@media (max-width: 768px)`
- Verify JavaScript: `js/app.js` has `toggleMobileMenu()` function
- Check HTML has `<button class="mobile-menu-toggle">`
- Open DevTools Console: `toggleMobileMenu()` to manually toggle

### Issue 6: Browser Console Errors

**Approach:**
1. Open DevTools: F12 or Ctrl+Shift+I
2. Go to Console tab
3. Look for red error messages
4. Common errors:
   - `Uncaught SyntaxError: Unexpected token` → Check JSON in data.js
   - `Cannot read property 'textContent' of null` → Element doesn't exist in HTML
   - `localStorage is undefined` → Check browser supports localStorage

---

## 📝 Best Practices

### Code Organization
- Keep data in `data.js`
- Keep utilities in `app.js`
- Keep page-specific logic in separate files (`farmer.js`, `marketplace.js`, etc.)
- CSS breakpoints: 480px, 768px, 1024px (mobile-first)

### Performance
- Minimize external dependencies
- Use localStorage for caching
- Lazy-load images (future enhancement)
- Test on slow 3G network (DevTools → Network throttling)

### Accessibility
- Add `alt` text to images
- Use semantic HTML (`<nav>`, `<header>`, `<main>`, `<footer>`)
- Use `aria-label` for icon buttons
- Ensure color contrast (WCAG AA minimum)
- Test with keyboard navigation (Tab, Enter, Esc)

### Testing
- Test on mobile (< 480px), tablet (768px), desktop (1024px+)
- Test in Chrome, Firefox, Safari, Edge
- Test with screen reader (NVDA on Windows, VoiceOver on Mac)
- Test with slow network (DevTools → Network tab → Slow 3G)

---

## 🎓 Learning Resources

- **Web Standards:**
  - MDN Web Docs: https://developer.mozilla.org
  - CSS Tricks: https://css-tricks.com
  
- **Responsive Design:**
  - Mobile-First CSS: https://www.w3.org/TR/mobile-bp/
  - CSS Media Queries: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries
  
- **Agriculture Tech:**
  - e-NAM Platform: https://www.enam.gov.in
  - APMC Systems: Indian Ministry of Agriculture resources
  - FPO Information: https://fpo.gov.in

---

## 📞 Support

- **Issues:** Open GitHub issue with details
- **Questions:** Email to support@krishibazar.local
- **Contributions:** Fork → Branch → Pull Request

---

**Happy coding! 🌾 Let's build the future of Indian agriculture together.**
