# KrishiBazar 🌾

**A Digital Marketplace Connecting Indian Farmers & FPOs with Consumers & Bulk Buyers**

![Responsive Design](https://img.shields.io/badge/responsive-mobile%20%2B%20desktop-brightgreen)
![Status](https://img.shields.io/badge/status-demo%20prototype-yellow)
![India](https://img.shields.io/badge/for-India-saffron)

---

## 🎯 Mission

**KrishiBazar** is a digital mandi that bridges the gap between farmers/FPOs and consumers by:
- Eliminating multiple intermediaries in the supply chain
- Providing **18–40% higher earnings for farmers** vs traditional APMC mandis
- Offering **15–35% lower prices for consumers** vs neighborhood mandi-to-kirana markup
- Using **AI-driven demand forecasting** and **route optimization** for logistics
- Supporting **14+ states** with pilot corridors (onion, tomato, grain, spice, dairy)

**Aligned to:** Ministry of Consumer Affairs, Food & Public Distribution (DoCA) - Smart India Hackathon 2024

---

## 📊 The Problem & Solution

### The Problem
Multiple intermediaries in India's farm-to-kitchen supply chain:
- **Farmer Squeezed:** Distress sales at mandis when storage & buyers are opaque
- **Consumers Pay More:** Onions, tomatoes, pulses see retail spikes even when farm-gate is low
- **Wasted Kilometers:** Empty return trips, no cold chain, APMC-centric routing add 15–25% horticulture loss

### The Solution
```
Traditional: Farmer → Commission Agent → Trader → Transporter → Urban Wholesaler → Kirana
   Mandi (₹18) → ₹42 retail · 7-10 days, high spoilage

KrishiBazar: Farmer → Direct Listing → Consumer + Bulk Buyer → Logistics Hub → Delivery
   Farm (₹24) → ₹28 delivered · T+1 payout, GST invoice, FSSAI compliance
```

---

## ✨ Key Features

### 🏠 For Consumers
- **Farm-Direct Marketplace:** Browse & buy from FPOs across 14 states
- **Price Transparency:** See mandi reference, platform rate, and savings
- **Household & Bulk Orders:** Individual purchases or institutional bulk lots
- **Real-Time Search & Filters:** By crop, state, FPO, GI tag, availability
- **Secure Checkout:** UPI settlement with GST invoice & FSSAI lot ID

### 👨‍🌾 For Farmers & FPOs
- **Live Listing Desk:** Publish lots in ₹/kg with mandi reference
- **Earnings Dashboard:** Track realisation lift vs APMC modal price
- **Order Management:** View buyer requests, acceptance, and payout status
- **Pickup Coordination:** Request logistics through integrated hubs
- **AI Insights:** Sowing & storage recommendations based on demand forecast

### 🏭 For Bulk Buyers (Institutions, Hotels, Kiranas)
- **Bulk Ordering:** 50+ kg lots with wholesale pricing
- **FPO Aggregation:** Consistent supply across seasons
- **Cold-Chain Options:** Reefer trucks (2–8°C), insulated (8–12°C), ambient
- **Demand Broadcasting:** Instant notifications on matching availability

### 🚚 For Logistics
- **Multi-Hub Network:** Collection → Cold chain → Wholesale → Last-mile
- **Route Optimization:** AI-minimized empty return trips
- **Vehicle Pool:** Reefer 9T, Mini Truck 1.5T, Insulated 4T with cost/km
- **Live Tracking:** Hub location, vehicle capacity, temperature monitoring

### 🤖 AI Insights Module
- **Demand Forecasting:** 12-month price trends for onion, tomato, wheat, rice
- **Monsoon & Sowing Guide:** State-level rainfall, crop advisory
- **Market Intelligence:** Real-time e-NAM & APMC price feeds
- **Seasonal Alerts:** Optimal harvest & storage windows

---

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- No backend/database required (localStorage demo)
- Responsive on mobile, tablet, desktop

### Setup
```bash
# Clone or download the project
git clone https://github.com/yourusername/krishibazar.git
cd krishiBazar

# Serve locally (Python)
python -m http.server 8000

# Or Node.js
npx http-server

# Or using a simple file:// protocol
# Open index.html in your browser
```

**Visit:** `http://localhost:8000` → Home page loads with live marketplace

---

## 📁 Project Structure

```
krishiBazar/
├── index.html              # Home & hero section
├── marketplace.html        # Produce listing & filtering
├── farmer.html            # Farmer dashboard & listing form
├── buyer.html             # Bulk buyer interface
├── logistics.html         # Pickup requests & route map
├── ai.html                # Demand forecast & crop advisory
├── orders.html            # Cart & order tracking
├── login.html             # Role-based auth demo (4 roles)
│
├── css/
│   └── style.css          # Fully responsive design (mobile-first)
│                          # Breakpoints: 480px, 768px, 1024px+
│
├── js/
│   ├── data.js            # KB object: produce, forecasts, hubs, vehicles
│   ├── app.js             # Core: Store, i18n, nav, cart, toast, auth
│   ├── farmer.js          # Farmer listing & earnings logic
│   ├── marketplace.js     # Produce render & filter
│   ├── buyer.js           # Bulk order interface
│   ├── logistics.js       # Route map & vehicle selection
│   └── ai.js              # Forecast chart & advisory
│
├── README.md              # This file
├── FEATURES.md            # Detailed feature documentation
├── SETUP.md               # Installation & customization
└── ROADMAP.md             # Future enhancements
```

---

## 🎬 Demo Flows

### 1️⃣ Consumer Marketplace Flow
```
1. Open index.html → Home
2. Click "Shop produce" → marketplace.html
3. Filter by state (e.g., Maharashtra) or crop (e.g., Onion)
4. Click "Buy" → Added to cart (localStorage)
5. Go to orders.html → View cart summary
6. Proceed to checkout (demo UPI flow)
```

### 2️⃣ Farmer Listing Flow
```
1. Open login.html → Select "👨‍🌾 Farmer" role
2. Enter name, village, phone → Continue
3. Redirects to farmer.html → Your dashboard
4. See sample listings & earnings lift
5. Fill "Publish a lot" form (crop, qty, mandi price, your price)
6. Click "Go live" → Listing appears in marketplace
7. Check "Active lots" table for status
```

### 3️⃣ Buyer Institutional Order Flow
```
1. Open login.html → Select "🏭 Bulk buyer" role
2. Enter hotel/institution name, city, phone
3. Redirects to buyer.html → Bulk order desk
4. Browse "Featured bulk lots" (50+ kg)
5. Select crop, state, quantity → Add to bulk cart
6. Logistics hub auto-assigned based on pickup location
7. Click "Request pickup" → Status updates (T+1 dispatch)
```

### 4️⃣ Logistics Optimization Flow
```
1. Open logistics.html → Route map loads
2. View hubs: Nashik (collection) → Pune (cold store) → Mumbai (retail) → Delhi (bulk)
3. See vehicle options: Reefer 9T @ ₹38/km, Mini Truck @ ₹18/km
4. AI calculates best route → Minimize cost & loss
5. Track real-time on map
```

---

## 🔧 Technical Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Frontend** | HTML5, CSS3, Vanilla JS | No framework—pure web standards |
| **Styling** | Custom CSS + CSS variables | Mobile-first, responsive grids |
| **State** | localStorage | Demo-only (no persistence) |
| **i18n** | Custom i18n module | English & हिन्दी (Hindi) |
| **Charts** | Canvas API | Price forecasts & trends |
| **Maps** | Leaflet.js (optional future) | Route visualization |

---

## 🌐 Responsive Design

### Breakpoints
- **Mobile (< 480px):** Single-column, hamburger menu, touch-friendly buttons (44x44px min)
- **Tablet (480–768px):** 2-column grids, expanded menu on tap
- **Desktop (> 768px):** 3–4 column grids, full navigation, hover effects

### Features
✅ Mobile-first CSS  
✅ Hamburger menu on mobile  
✅ Touch-friendly buttons & inputs (min 44x44px)  
✅ Responsive images & typography scaling  
✅ Landscape support  
✅ Dark mode ready (CSS variables)  

---

## 🔑 Key Pages & Components

| Page | Purpose | Key Components |
|------|---------|-----------------|
| `index.html` | Home & hero | Hero section, problem statement, CTA buttons |
| `marketplace.html` | Browse produce | Search, state/crop filters, price comparison |
| `farmer.html` | Farmer dashboard | Listing form, earnings calculator, active lots |
| `buyer.html` | Bulk orders | Featured lots, quantity selector, logistics hub |
| `logistics.html` | Route optimization | Map view, hub details, vehicle cost matrix |
| `ai.html` | Insights | Demand forecast chart, sowing guide, alerts |
| `orders.html` | Cart & checkout | Cart summary, order history, UPI (demo) |
| `login.html` | Auth | 4 roles (farmer, FPO, consumer, bulk buyer) |

---

## 🎨 Design System

### Color Palette
```css
--saffron: #ff9933    /* India flag orange */
--green: #138808      /* India flag green, primary action */
--navy: #0f2744       /* Secondary, navbar, footer */
--ink: #1a2332        /* Text color */
--muted: #5b667a      /* Subtext, secondary labels */
--line: #e4eadf       /* Borders, dividers */
--paper: #f7f4ee      /* Background */
--white: #ffffff      /* Cards, overlays */
```

### Typography
- **Font Stack:** "Segoe UI", "Nirmala UI", "Mangal", system-ui
- **Headings:** Semibold 600–800 weight, clamp() for scaling
- **Body:** Regular 400 weight, 1.55 line-height

### Components
- **Card:** White background, subtle shadow, 18px padding, border-radius 18px
- **Button:** 8x14px padding, 999px border-radius, full-width on mobile
- **Input:** 10px12px padding, 12px border-radius, min-width 160px
- **Badge/Chip:** 4x8px padding, green-soft background, small font

---

## 🔐 Privacy & Security (Demo)

⚠️ **Important:** This is a prototype for demonstration.

- **No real data collection:** All data stored in browser localStorage
- **No backend API:** Requests/orders simulated locally
- **No payments processed:** UPI/checkout flows are UI demos only
- **Demo credentials:** Any phone/name accepted (no OTP verification)
- **FSSAI/GST:** Mock invoice generation for education only

**In production:**
- Encrypt sensitive data (PII, bank details)
- Use HTTPS only
- Implement OAuth/OTP verification
- Store data in secure backend (PostgreSQL + Redis)
- Integrate real payment gateway (PayU, Razorpay, NEFT)
- FSSAI license & GST registration validation

---

## 🚀 Future Roadmap

- [ ] **Backend API:** Node.js/Express or Django REST with PostgreSQL
- [ ] **Payment Integration:** Razorpay/PayU for UPI, NEFT, credit
- [ ] **Real Notifications:** SMS (Twilio), push notifications (Firebase)
- [ ] **Live Chat:** Farmer-buyer messaging with support escalation
- [ ] **GPS Tracking:** Real-time logistics tracking with Mapbox/Leaflet
- [ ] **Mobile App:** React Native or Flutter for iOS/Android
- [ ] **Analytics Dashboard:** Admin view of transactions, trends, anomalies
- [ ] **Crop Insurance:** Integration with PMFBY, weather-indexed coverage
- [ ] **Aggregation:** Automated FPO lot bundling for bulk buyers
- [ ] **Carbon Credit:** Track supply-chain emissions, monetize ESG savings

---

## 🤝 Contributing

This is a Smart India Hackathon prototype. Contributions welcome:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

**Development Guidelines:**
- Keep CSS mobile-first
- Use semantic HTML
- Add accessibility attributes (aria-*, alt, role)
- Test on mobile & desktop
- Update README/FEATURES when adding new pages

---

## 📚 Documentation

- **[FEATURES.md](FEATURES.md)** — Detailed feature descriptions & user flows
- **[SETUP.md](SETUP.md)** — Installation, customization, deployment
- **[ROADMAP.md](ROADMAP.md)** — Future enhancements & technical debt

---

## 📞 Contact & Support

**Hackathon:** Smart India Hackathon 2024 (Agriculture, FoodTech, Rural Development)  
**Organization:** Ministry of Consumer Affairs, Food & Public Distribution  
**Department:** Department of Consumer Affairs (DoCA)  

---

## 📄 License

This project is released under the **MIT License**. See LICENSE file for details.

---

## 🙏 Acknowledgments

- **DoCA & SIH** for the problem statement & opportunity
- **Farmers & FPOs** across 14 states for inspiration
- **APMC/e-NAM** infrastructure knowledge
- **India's agriculture tech community** for support

---

## 🌟 Star This Project

If KrishiBazar helps you understand farm-to-consumer supply chain innovation, please ⭐ this repository!

**Together, we bridge the farm-to-kitchen gap. No extra middlemen.**

---

**Made with ❤️ for Indian Farmers & Agriculture**
