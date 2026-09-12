# KrishiBazar Quick Start Guide ⚡

Get KrishiBazar running in 2 minutes.

---

## 🚀 Start in 2 Minutes

### Option 1: Python (Recommended)
```bash
# Open terminal in krishiBazar folder
cd path/to/krishiBazar

# Start server
python -m http.server 8000

# Open browser → http://localhost:8000
```

### Option 2: Node.js
```bash
npx http-server
# Visit: http://localhost:8080
```

### Option 3: VS Code
1. Install **Live Server** extension
2. Right-click `index.html` → "Open with Live Server"
3. Browser opens automatically

---

## 🎬 Demo Flows (Copy-Paste Ready)

### Test as Farmer
1. Go to [Login Page](http://localhost:8000/login.html)
2. Select "👨‍🌾 Farmer"
3. Fill form:
   ```
   Name: Ramesh Joshi
   Village: Lasalgaon, Maharashtra
   Phone: 9876543210
   ```
4. Continue → Farmer dashboard loads

### Test as Buyer
1. Go to [Login Page](http://localhost:8000/login.html)
2. Select "🏭 Bulk buyer"
3. Fill form:
   ```
   Name: Taj Hotel Mumbai
   City: Mumbai, Maharashtra
   Phone: 9876543210
   ```
4. Continue → Bulk buyer portal loads

### Add to Cart
1. Go to [Marketplace](http://localhost:8000/marketplace.html)
2. Click "Buy" on any produce card
3. Check [Orders](http://localhost:8000/orders.html) → Item in cart

---

## 📱 Responsive Testing

### Desktop (> 768px)
```
View → Zoom: 100%
Navigation: Full horizontal menu
Grid: 3 columns
```

### Tablet (480–768px)
```
View → Zoom: 75% or resize browser to 600px
Navigation: Horizontal menu
Grid: 2 columns
```

### Mobile (< 480px)
```
View → Toggle Device Toolbar (F12 → Ctrl+Shift+M)
Navigation: Hamburger menu (☰)
Grid: 1 column
```

---

## 🎨 Customize in 5 Minutes

### Change Colors
Edit `css/style.css` line 1:
```css
:root {
  --saffron: #ff6b35;    /* Orange → Your color */
  --green: #004e89;      /* Green → Your color */
  /* ... other variables ... */
}
```
Refresh page (Ctrl+F5).

### Add Produce Item
Edit `js/data.js` line ~70:
```javascript
{ 
  id: "p13",
  name: "Your Produce",
  crop: "Crop Name",
  fpo: "Your FPO",
  state: "Your State",
  mandi: 100,
  farm: 120,
  retail: 200,
  unit: "kg",
  qty: 5000,
  grade: "A",
  emoji: "🍎",
  color: "#ff0000"
}
```
Refresh → Item appears in marketplace.

### Switch Language
Click "हिन्दी" button (top-right) → UI translates.

---

## 🔍 Debug Tips

### Check Console
```javascript
// DevTools Console (F12)

// View current session
JSON.parse(localStorage.getItem("kb_session"))

// View cart
JSON.parse(localStorage.getItem("kb_cart"))

// Clear all data
localStorage.clear()

// Manually trigger language change
setLang("hi")
```

### Test Mobile Menu
```javascript
// Toggle mobile menu programmatically
toggleMobileMenu()
```

---

## 📚 Documentation Map

| File | Purpose | Read Time |
|------|---------|-----------|
| [README.md](README.md) | Overview & mission | 5 min |
| [FEATURES.md](FEATURES.md) | Feature deep-dive | 15 min |
| [SETUP.md](SETUP.md) | Installation & customization | 10 min |
| [ROADMAP.md](ROADMAP.md) | Future plans & phases | 8 min |
| **QUICK_START.md** | This file | 2 min |

---

## ❓ Common Questions

**Q: How do I deploy this?**
A: See [SETUP.md → Deployment](SETUP.md#-deployment)

**Q: Can I use a real backend?**
A: Yes. See [SETUP.md → Adding New Features](SETUP.md#-adding-new-features)

**Q: How do I add a new page?**
A: See [SETUP.md → Feature 1: Add New Page](SETUP.md#feature-1-add-a-new-page-eg-ratings--reviews)

**Q: Is this production-ready?**
A: No, it's a demo prototype. See [ROADMAP.md](ROADMAP.md) for production plans.

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| CORS error | Use Python server, not file:// |
| CSS not loading | Hard refresh: Ctrl+Shift+R |
| Mobile menu broken | Check `@media (max-width: 768px)` in CSS |
| Language not switching | Check `data-i18n` attributes in HTML |
| Cart disappears | Use normal browser mode (not incognito) |

---

**Need help?** Open an issue on GitHub or check [SETUP.md → Troubleshooting](SETUP.md#-troubleshooting)

**Ready to code?** Jump to [FEATURES.md](FEATURES.md) to understand architecture! 🚀
