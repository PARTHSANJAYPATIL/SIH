# KrishiBazar Features & User Guide 📋

Complete documentation of all features, user flows, and technical implementation.

---

## 📖 Table of Contents

1. [Home Page](#home-page)
2. [Marketplace](#marketplace)
3. [Farmer Dashboard](#farmer-dashboard)
4. [Buyer Interface](#buyer-interface)
5. [Logistics Management](#logistics-management)
6. [AI Insights Module](#ai-insights-module)
7. [Cart & Checkout](#cart--checkout)
8. [Authentication System](#authentication-system)
9. [Internationalization (i18n)](#internationalization-i18n)
10. [Advanced Features](#advanced-features)

---

## 🏠 Home Page

**File:** `index.html`

### Purpose
Landing page showcasing KrishiBazar's mission, value proposition, and problem statement.

### Key Components

#### 1. Hero Section
```html
<section class="hero">
  - Headline: "Better prices for farmers. Lower prices for Indian households."
  - Lead description: Platform mission & unique value
  - CTAs: "Shop produce" & "List your harvest"
  - Stats grid: 18–40% farmer lift, 15–35% consumer saving, 14 states
```

**Responsive Design:**
- Desktop: Side-by-side hero text + price comparison card
- Tablet: 2-column grid
- Mobile: Single column, stacked content

#### 2. Problem Statement Section
Three-card grid explaining:
- **Farmer Squeezed:** Distress sales, low realisation
- **Households Pay More:** Retail spikes, urban inflation
- **Wasted Kilometres:** Cold chain gaps, high loss

#### 3. Price Comparison Card
Live example (Nashik onion):
```
Farmer at APMC mandi        ₹18/kg
↓ (after 4 intermediaries)
Consumer retail             ₹42/kg
------
KrishiBazar farm-gate       ₹24 to farmer
KrishiBazar consumer        ₹28 delivered
```

### UX Features
- Smooth scroll navigation
- Responsive hero grid (2-col desktop, 1-col mobile)
- Touch-friendly buttons (44x44px min)
- Accessible color contrast (WCAG AA compliant)

### Navigation
```
Home (active) → Marketplace → Farmer/FPO → Buyers → Logistics → AI Insights → Orders → Login
```

---

## 🛒 Marketplace

**File:** `marketplace.html`  
**Scripts:** `js/marketplace.js`, `js/app.js`

### Purpose
Central hub for consumers & bulk buyers to browse farm-direct produce.

### Features

#### 1. Search & Filters
```html
<div class="filters">
  <input id="q" placeholder="Search crop, FPO, GI tag…">
  <select id="st">State filter (All, Maharashtra, Punjab, …)</select>
  <select id="cr">Crop filter (All, Onion, Wheat, Mango, …)</select>
</div>
```

**Live Filtering:** Real-time DOM updates (no page reload)

#### 2. Produce Grid Display
Displays 12+ sample produce from KB.produce array:

**Sample Listings:**
| Produce | State | FPO | Mandi | Farm Direct | Qty | Grade |
|---------|-------|-----|-------|-------------|-----|-------|
| Nashik Onion | Maharashtra | Sahyadri FPO | ₹18 | ₹24 | 12,000 kg | A |
| Sharbati Wheat | M.P. | Malwa Kisan | ₹22 | ₹27 | 40,000 kg | MSP+ |
| Alphonso Mango | Maharashtra | Konkan Fruit | ₹90 | ₹140 | 3,500 kg | GI |

#### 3. Card Components
Each produce card shows:
```
[🧅 Emoji art]
Tag: State · Grade
Title: Produce name
Subtitle: FPO · Qty available
Meta: Mandi price vs Platform price
Chip: "+Farmer lift / −Consumer saving"
Buttons:
  - "Buy" (household qty)
  - "Bulk 50 kg" (institutional)
```

#### 4. Price Transparency
**Consumer View:**
```
Mandi price    ₹18/kg  (reference)
Direct from us ₹24/kg  (platform margin: +₹4)
↓ Impact
Farmer earns   +₹6/kg vs mandi (+33% realisation lift)
Consumer pays  ₹28 delivered vs ₹42 retail (−₹14 saving, 33% cheaper)
```

### Responsive Behavior
- **Desktop:** 3-column grid
- **Tablet (480–768px):** 2-column grid
- **Mobile (< 480px):** 1-column stack
- **Search Input:** Full-width on mobile, auto-width on desktop

### JavaScript Logic (marketplace.js)
```javascript
// Render produce list
function renderProduce(list) { ... }

// Apply filters (state, crop, search)
function applyMarketFilters() { ... }

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Populate state & crop dropdowns dynamically
  // Attach input listeners
  // Call applyMarketFilters()
});
```

### Cart Integration
- Click "Buy" → `addToCart(id, qty, bulk=false)`
- Item added to localStorage with price, qty, unit
- Toast notification: "Added to cart: Nashik Onion"
- Cart count badge updates

---

## 👨‍🌾 Farmer Dashboard

**File:** `farmer.html`  
**Scripts:** `js/farmer.js`, `js/app.js`

### Purpose
Dashboard for farmers & FPOs to list harvest, track earnings, manage orders.

### Layout: Two-Column (Desktop) / Single (Mobile)

#### Left Sidebar (280px, collapsible on mobile)
```
[Card: Farmer Profile]
  Title: "Farmer / FPO"
  Name: Logged-in farmer name (or "Sign in to personalise")
  Location: Village, State
  
  [Nav Menu]
  - Listings & earnings (active)
  - Pickup requests
  - What to sow / store
  - Switch account
  
  [Chip] Extra earnings this week vs mandi
         e.g., "₹18,240 extra this week vs mandi"
```

#### Right Content Area

##### 1. Quick Stats
```
Three-stat row (responsive):
├─ ₹24/kg      → Onion live ask (you)
├─ ₹18/kg      → Nashik APMC modal
└─ +33%        → Realisation lift
```

##### 2. "Publish a Lot" Form
```html
<form id="listForm">
  <input id="cropName" placeholder="Crop / lot name e.g. Lasalgaon onion">
  <input id="qty" type="number" placeholder="Quantity (kg)">
  <input id="mandiP" type="number" placeholder="Nearby mandi price ₹">
  <input id="farmP" type="number" placeholder="Your asking price ₹">
  <button class="btn">Go live on KrishiBazar</button>
</form>
```

**Submission Flow:**
1. Validate inputs (required, numbers)
2. Create listing object: `{ id, name, crop, qty, mandi, farm, status: "Live" }`
3. Prepend to localStorage listings array
4. Toast: "Listing published to KrishiBazar marketplace"
5. Reset form
6. Re-render table

##### 3. "Active Lots" Table
Displays farmer's published listings:
```
| Lot | Qty | Mandi | Your Price | Status |
|-----|-----|-------|-----------|--------|
| 🧅 Nashik Onion | 12,000 kg | ₹18 | ₹24 | Live |
| 🌾 Sharbati Wheat | 4,000 kg | ₹22 | ₹27 | Live |
```

**Table Features:**
- Sortable by column (future enhancement)
- Status badge: "Live", "Pending", "Sold Out"
- Delete/Edit icons (future enhancement)

### Earnings Calculator
```javascript
function farmerListings() {
  return Store.get("listings", KB.produce.slice(0, 4).map(p => ({
    ...p, status: "Live", views: 120 + Math.random() * 400
  })));
}

// Calculate lift vs mandi for week
const extra = list.reduce((a, p) => a + (p.farm - p.mandi) * 80, 0);
// Shows: "₹18,240 extra this week vs mandi"
```

### Responsive Behavior
- **Desktop:** Sidebar (left) + Content (right) side-by-side
- **Tablet:** Sidebar stacked above content
- **Mobile:** Single column, sidebar collapses
- **Form:** Full-width inputs on mobile, flex-wrap on desktop

---

## 🏭 Buyer Interface

**File:** `buyer.html`  
**Scripts:** `js/buyer.js` (referenced)

### Purpose
Institutional & bulk buyer portal for restaurants, hotels, kiranas, warehouses.

### Key Sections

#### 1. Quick Stats (3-column)
```
Your monthly bulk spend    ₹2,18,000
Savings vs local mandi     ₹48,500 (18%)
FPOs you're connected with 12
```

#### 2. "Browse Bulk Lots" Section
Filtered 50+ kg listings with bulk pricing:
```
Filters:
├─ Crop (Onion, Wheat, Rice, …)
├─ State (Maharashtra, Punjab, …)
└─ Min qty (50 kg, 500 kg, 1000 kg)

Grid (3-col desktop, 1-col mobile):
├─ Lot card with emoji, FPO name
├─ Available qty & unit price
├─ Storage requirement (ambient, cold: 2–8°C)
├─ Delivery timeframe (T+1, T+2)
└─ "Add to bulk cart" button
```

#### 3. Logistics Hub Assignment
After adding to bulk cart:
```
Available hubs:
├─ Nashik Aggregation Hub (collection)
├─ Pune Cold Chain (cold store)
├─ Mumbai Retail Cluster (retail pickup)
└─ Delhi Azadpur Bypass (bulk buyer)

Auto-assigned based on:
• Buyer's registered location
• Lot origin (FPO state)
• Product type (needs cold chain?)
```

#### 4. Bulk Cart Summary
```
Item 1: Nashik Onion, 500 kg @ ₹24/kg = ₹12,000
Item 2: Sharbati Wheat, 1 MT @ ₹27/kg = ₹27,000
───────────────────────
Subtotal: ₹39,000
Logistics (hub-to-buyer): ₹2,850 (Reefer 9T, 75 km)
GST (5%): ₹2,142.50
───────────────────────
Total: ₹43,992.50

[Request Pickup] [Modify] [Continue to Checkout]
```

#### 5. Pickup Request Status
```
Status Timeline:
├─ T0: "Request submitted"
├─ T+4h: "Lot packed at collection hub"
├─ T+12h: "Loaded on reefer truck"
├─ T+18h: "In transit (55°C, 180 km remaining)"
├─ T+24h: "Delivered to your location"
└─ T+1: "UPI payout to FPO (farmer notified)"
```

---

## 🚚 Logistics Management

**File:** `logistics.html`  
**Scripts:** `js/logistics.js` (referenced)

### Purpose
Optimize routes, manage cold chain, track real-time vehicle movement.

### Features

#### 1. Hub Network Visualization
**Map View** (interactive, future: Leaflet.js):
```
Hubs (Node types):
├─ 🟢 Collection: Nashik (20.0°N, 73.8°E)
├─ 🔵 Cold Storage: Pune (18.5°N, 73.8°E)
├─ 🟠 Retail: Mumbai (19.07°N, 72.87°E)
├─ 🟡 Bulk Buyer: Delhi (28.7°N, 77.1°E)
├─ 🟣 Wholesale: Hyderabad (17.4°N, 78.5°E)
└─ 🔴 Retail: Bengaluru (12.97°N, 77.59°E)

Edges (Routes):
├─ Nashik → Pune (150 km, cold chain required)
├─ Pune → Mumbai (260 km, reefer route)
├─ Mumbai → Delhi (1,380 km, multi-day)
└─ Hyderabad → Bengaluru (580 km, HOPCOMS link)
```

#### 2. Vehicle Fleet
```html
<table class="vehicles">
  <tr>
    <th>Type</th>
    <th>Capacity</th>
    <th>Temperature</th>
    <th>Cost/km</th>
    <th>Best For</th>
  </tr>
  <tr>
    <td>Reefer 9T</td>
    <td>9,000 kg</td>
    <td>2–8°C</td>
    <td>₹38</td>
    <td>High-value, perishable (mango, milk)</td>
  </tr>
  <tr>
    <td>Insulated 4T</td>
    <td>4,000 kg</td>
    <td>8–12°C</td>
    <td>₹26</td>
    <td>Medium perishable (tomato, onion)</td>
  </tr>
  <tr>
    <td>Mini Truck 1.5T</td>
    <td>1,500 kg</td>
    <td>Ambient</td>
    <td>₹18</td>
    <td>Non-perishable (grains, spices)</td>
  </tr>
</table>
```

#### 3. Route Optimization Algorithm
```javascript
// Input: origin (FPO), destination (buyer), product type
// Logic:
// 1. Check product storage requirement
// 2. Filter hubs with matching capacity (cold, ambient)
// 3. Calculate distance & cost: dist * vehicle.costKm
// 4. Estimate loss: dist * perishable_loss_rate
// 5. Optimize: min(cost + loss_value)
// Output: Best route + vehicle + ETA

Example:
├─ Route 1: Nashik → Pune → Mumbai (direct, reefer)
│  Cost: (150 km * ₹38) + (260 km * ₹38) = ₹15,580
│  Loss: 3% spoilage = ₹1,170 value loss
│  Total: ₹16,750
│
├─ Route 2: Nashik → Hyderabad → Mumbai (indirect)
│  Cost: (750 km * ₹38) = ₹28,500
│  Loss: 5% spoilage = ₹1,950 value loss
│  Total: ₹30,450
│
└─ Recommendation: Route 1 (savings: ₹13,700)
```

#### 4. Live Tracking (Demo)
```
Order #KB-2024-1501
├─ Status: "In transit"
├─ Current location: Pune cold chain hub (73.8°E, 18.5°N)
├─ Vehicle: Reefer 9T (₹38/km)
├─ Next: Mumbai retail cluster (260 km, 6 hours ETA)
├─ Temp: −2°C (optimal for mango)
└─ Driver: +91-8765432109 (call/SMS)
```

---

## 🤖 AI Insights Module

**File:** `ai.html`  
**Scripts:** `js/ai.js` (referenced)

### Purpose
Provide farmers & buyers with demand forecasts, crop advisory, market intelligence.

### Features

#### 1. Price Forecast Chart
**12-month demand forecast** for major crops:
```javascript
KB.forecast = {
  Onion: [32, 28, 24, 22, 26, 40, 55, 48, 36, 30, 28, 34],
  Tomato: [22, 18, 16, 20, 28, 35, 42, 30, 22, 18, 20, 24],
  Wheat: [24, 24, 25, 26, 27, 26, 25, 25, 26, 27, 28, 27],
  Rice: [42, 43, 44, 45, 46, 44, 43, 44, 45, 47, 48, 46]
};
```

**Canvas-based line chart:**
```
         │
    ₹55  ├─── Onion (seasonal spike: Jun–Aug)
         │    /\          
    ₹40  ├   /  \  ┌─────
         │  /    \/
    ₹24  ├─/       \  /
         └─────────────────
          Jan  Apr  Jul  Oct
          
Insights:
• Onion peaks June–Aug (monsoon shortage)
• Tomato lowest April–May (glut, low realization)
• Wheat stable year-round (stored commodity)
```

#### 2. Crop Advisory (Farmer View)
```
Recommended Actions for Your State (Maharashtra):

🌾 SOWING WINDOW (Next 30 days)
├─ Onion: "Delay 7–10 days; monsoon cover not assured yet"
├─ Tomato: "Ideal window now; price spike expected in 2 months"
└─ Wheat: "Rabi prep; land preparation underway"

💧 MONSOON ALERT
├─ Rainfall forecast: 650 mm (normal: 720 mm)
├─ Dry-spell risk: Medium
└─ Storage recommendation: Covered shed + fungicide

📦 STORAGE GUIDE
├─ Onion: Cool, dry, 2–3 months shelf-life
├─ Tomato: 4–7 days (sell within week, no storage)
└─ Wheat: Grain store, 6–12 months shelf-life
```

#### 3. Market Intelligence
**Real-time feeds:**
```
📊 APMC Prices (Last updated: 2 hours ago)
├─ Nashik: Onion ₹18–20/kg (trading brisk)
├─ Indore: Wheat ₹24–25/kg (new arrival, +2% vs yesterday)
└─ Deharadun: Tomato ₹16–18/kg (volatile, 8% up)

📈 e-NAM Trending
├─ High: Guntur chilli +12% (export demand)
├─ Low: Bangkuri tomato −15% (oversupply)
└─ Stable: Basmati rice +3% (export orders strong)

🌍 Global Context
├─ Onion exports (Egypt): ₹14/kg (cheaper, competition)
├─ Wheat imports: Stable at MSP+₹2–3
└─ Spice demand: Strong (Diwali season prep)
```

#### 4. Seasonal Alerts
```
🔔 ALERTS FOR YOU

⚠️ RISK: Tomato price crash (April–May)
├─ Probability: 78% (historical pattern)
├─ Action: Store in cool room for 5–10 days
└─ Timeline: 2 weeks away

✅ OPPORTUNITY: Onion price spike (June–Aug)
├─ Probability: 85% (monsoon shortage)
├─ Action: Plan sowing NOW for June harvest
└─ Timeline: 45 days to harvest window

ℹ️ INFO: Wheat procurement (Jan–Feb)
├─ Government MSP: ₹2,125/quintal (locked)
├─ Market rate: ₹2,200–2,250/quintal
└─ Tip: Direct sales pre-harvest, avoid distress sale
```

#### 5. Buyer Decision Support
```
BULK BUYER: "Should I order onion now or wait?"

Analysis:
├─ Current price: ₹24/kg (farm gate)
├─ Forecast (next 2 weeks): ₹22–26/kg (stable)
├─ Forecast (next month): ₹26–32/kg (rising, monsoon effect)
├─ Storage cost: ₹2/kg/week (ambient shed)
│
└─ RECOMMENDATION: 
    "Order 50% now @ ₹24 (secure stock)"
    "Wait 2 weeks for 50% (price may drop ₹1–2)"
    "Expected net savings: ₹500–1000 on 500 kg"
```

---

## 🛍️ Cart & Checkout

**File:** `orders.html`  
**Scripts:** `js/app.js`

### Purpose
Manage shopping cart, view order history, process checkout (demo UPI).

### Features

#### 1. Cart Summary
```html
<section class="cart">
  <h2>Your Cart</h2>
  
  <table>
    <thead>
      <tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Total</th><th>Action</th></tr>
    </thead>
    <tbody id="cartBody">
      <!-- Dynamically rendered from localStorage cart array -->
      <tr>
        <td>Nashik Onion</td>
        <td>50 kg</td>
        <td>₹28/kg</td>
        <td>₹1,400</td>
        <td><button onclick="removeFromCart('p1')">Remove</button></td>
      </tr>
    </tbody>
  </table>
</section>
```

**Cart Logic (app.js):**
```javascript
function cart() { return Store.get("cart", []); }

function addToCart(id, qty = 1, bulk = false) {
  const item = KB.produce.find(p => p.id === id);
  if (!item) return;
  const c = cart();
  const found = c.find(x => x.id === id && x.bulk === bulk);
  if (found) found.qty += qty;
  else c.push({ id, qty, bulk, name: item.name, price: bulk ? item.farm : item.farm + 4, unit: item.unit });
  Store.set("cart", c);
  toast("Added to cart: " + item.name);
}

function removeFromCart(id) {
  let c = cart();
  c = c.filter(x => x.id !== id);
  Store.set("cart", c);
  toast("Removed from cart");
}
```

#### 2. Checkout Flow (Demo)
```
CHECKOUT SUMMARY
═══════════════════════════════════════════
Nashik Onion    50 kg  @ ₹28/kg   ₹1,400
Sharbati Wheat  100 kg @ ₹30/kg   ₹3,000
───────────────────────────────────────────
Subtotal                           ₹4,400
Shipping (Metro hub to you)        ₹350
GST (5%)                           ₹240
───────────────────────────────────────────
TOTAL                              ₹4,990

DELIVERY
├─ Expected: Tomorrow, 9 AM–12 PM
├─ Address: [From saved address]
└─ Instructions: [Contactless delivery]

PAYMENT
├─ [🔘] UPI (Recommended)
├─ [  ] Credit/Debit card
├─ [  ] Bank transfer (NEFT)
└─ [  ] Pay on delivery

[PLACE ORDER] [SAVE FOR LATER] [CONTINUE SHOPPING]
```

#### 3. Order History
```
Order #KB-2024-1492 (Jul 15, 2024)
├─ Status: "Delivered"
├─ Items: Nashik Onion (50 kg), Sharbati Wheat (100 kg)
├─ Total: ₹4,990
└─ Rating: ⭐⭐⭐⭐⭐ (Excellent quality, fresh)

Order #KB-2024-1401 (Jul 8, 2024)
├─ Status: "In transit"
├─ Items: Guntur Chilli (25 kg)
├─ Total: ₹8,250
└─ ETA: Jul 9, 2024, 6 PM
```

---

## 🔐 Authentication System

**File:** `login.html`  
**Scripts:** `js/app.js`

### Purpose
Demo role-based authentication (no real OTP/security).

### Four Roles

```html
<div class="roles">
  <div class="role on" data-role="farmer">👨‍🌾 Farmer</div>
  <div class="role" data-role="fpo">🏢 FPO</div>
  <div class="role" data-role="consumer">🏠 Consumer</div>
  <div class="role" data-role="bulk">🏭 Bulk buyer</div>
</div>
```

#### 1. Farmer / FPO Role
```
Form:
├─ Name: "Ramesh Joshi"
├─ Village, State: "Lasalgaon, Maharashtra"
└─ Phone: "9876543210"

Session object (stored in localStorage):
{
  role: "farmer",
  name: "Ramesh Joshi",
  place: "Lasalgaon, Maharashtra",
  phone: "9876543210"
}

Redirects to: farmer.html (dashboard)
Access: Can publish lots, track earnings, request pickups
```

#### 2. FPO (Farmer Producer Organization)
```
Form:
├─ Name: "Sahyadri FPO"
├─ City, State: "Nashik, Maharashtra"
└─ Phone: "+91-9876543210"

Session:
{
  role: "fpo",
  name: "Sahyadri FPO",
  place: "Nashik, Maharashtra"
}

Redirects to: farmer.html (aggregation dashboard)
Access: Bulk uploads, member management, quality control
```

#### 3. Consumer Role
```
Form:
├─ Name: "Priya Sharma"
├─ City, State: "Pune, Maharashtra"
└─ Phone: "9876543210"

Session:
{
  role: "consumer",
  name: "Priya Sharma",
  place: "Pune, Maharashtra"
}

Redirects to: marketplace.html
Access: Browse, search, add to cart, checkout, order tracking
```

#### 4. Bulk Buyer Role
```
Form:
├─ Name: "Taj Hotel Mumbai"
├─ City, State: "Mumbai, Maharashtra"
└─ Phone: "+91-9876543210"

Session:
{
  role: "bulk",
  name: "Taj Hotel Mumbai",
  place: "Mumbai, Maharashtra"
}

Redirects to: buyer.html (bulk ordering portal)
Access: Bulk lots, volume discounts, institutional pricing, logistics coordination
```

### Session Management
```javascript
function session() { return Store.get("session", null); }

function requireRole(roles) {
  const s = session();
  if (!s || (roles && !roles.includes(s.role))) {
    location.href = "login.html";  // Redirect if not authorized
  }
  return s;
}

// Usage: requireRole(["farmer", "fpo"]) on farmer.html
```

### Logout
```
Click "Switch account" on any page
→ Clears localStorage session
→ Redirects to login.html
```

---

## 🌐 Internationalization (i18n)

**File:** `js/data.js` (I18N object)  
**Implementation:** `js/app.js`

### Supported Languages
- 🇮🇳 **हिन्दी** (Hindi)
- 🇬🇧 **English** (Default)

### How It Works

#### 1. Translation Keys
```javascript
const I18N = {
  en: {
    brand: "KrishiBazar",
    tagline: "Farm to kitchen. No extra middlemen.",
    heroTitle: "Better prices for farmers. Lower prices for Indian households.",
    home: "Home",
    market: "Marketplace",
    farmer: "Farmer / FPO",
    // ... 50+ keys
  },
  hi: {
    brand: "कृषि बाज़ार",
    tagline: "खेत से रसोई। कोई अतिरिक्त बिचौलिया नहीं।",
    heroTitle: "किसानों के लिए बेहतर कीमतें। भारतीय घरों के लिए कम कीमतें।",
    home: "होम",
    market: "बाजार",
    farmer: "किसान / FPO",
    // ... हिन्दी अनुवाद
  }
};
```

#### 2. HTML Markup
```html
<h1 data-i18n="heroTitle">Better prices for farmers...</h1>
<a data-i18n="market">Marketplace</a>
<button data-i18n="login">Login</button>
```

#### 3. JavaScript Application
```javascript
function currentLang() { return Store.get("lang", "en"); }

function setLang(l) { 
  Store.set("lang", l); 
  applyI18n();  // Re-render all translatable elements
}

function applyI18n() {
  const pack = I18N[currentLang()] || I18N.en;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    if (pack[k]) el.textContent = pack[k];
  });
  
  // Update language toggle button
  const btn = document.getElementById("langBtn");
  if (btn) btn.textContent = currentLang() === "hi" ? "EN" : "हिन्दी";
}
```

#### 4. Language Toggle
```
Top-right button: "हिन्दी" or "EN"
Click → Switch language
Page re-renders with translations
localStorage.kb_lang → "hi" or "en"
```

### Supported Translations
- **UI labels:** Home, Marketplace, Farmer, Buyers, Logistics, Orders, Login
- **Forms:** Placeholders, button text, validation messages
- **Content:** Hero headline, descriptions, FAQs
- **Toasts:** Notifications (Added to cart, Listing published, etc.)

---

## 🚀 Advanced Features

### 1. Local Storage Persistence
All user data saved locally (no backend):
```javascript
Store.get(key, fallback) // Retrieve
Store.set(key, value)    // Save

Keys:
├─ kb_lang: "en" | "hi"
├─ kb_session: { role, name, place, phone }
├─ kb_cart: [{ id, qty, bulk, name, price, unit }, ...]
├─ kb_listings: [{ id, name, qty, mandi, farm, status }, ...]
└─ kb_orders: [{ id, items, total, status, date }, ...]
```

### 2. Toast Notifications
```javascript
function toast(msg) {
  // Shows temporary message (2.4 sec auto-hide)
  // Bottom-right corner, fixed position
  // Dark navy background, white text
  toast("Added to cart: Nashik Onion");
}
```

### 3. Currency Formatting (Indian Numbering)
```javascript
function inr(n) {
  return "₹" + Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

inr(1234567) → "₹12,34,567" (Indian system)
inr(28.5) → "₹28"
```

### 4. Dynamic Navigation Rendering
```javascript
function navHTML(active) {
  // Generates full navbar dynamically
  // Highlights current page
  // Updates cart count badge
}

// Called on every page load
document.getElementById("site-nav").innerHTML = navHTML(document.body.dataset.page);
```

### 5. Responsive Grid System
```css
/* Mobile-first */
.grid-3 { grid-template-columns: 1fr; }
.grid-4 { grid-template-columns: 1fr; }

/* Tablet (481–768px) */
@media (min-width: 481px) and (max-width: 768px) {
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop (769px+) */
@media (min-width: 769px) {
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-4 { grid-template-columns: repeat(4, 1fr); }
}
```

---

## 📊 Data Models

### KB Object (data.js)
```javascript
const KB = {
  org: "Ministry of Consumer Affairs, Food & Public Distribution",
  dept: "Department of Consumer Affairs (DoCA)",
  problem: "Multiple intermediaries reduce farmers' earnings...",
  
  states: ["Andhra Pradesh", "Bihar", …], // 14 states
  cities: ["Delhi NCR", "Mumbai", …],     // 12 major cities
  
  produce: [
    {
      id, name, crop, fpo, state,
      mandi, farm, retail, unit, qty, grade, emoji, color
    }, // 12 sample items
  ],
  
  forecast: {
    Onion: [32, 28, …],    // 12-month forecast
    Tomato: [22, 18, …],
    // …
  },
  
  hubs: [
    { id, name, type, lat, lng }, // 6 logistics hubs
  ],
  
  vehicles: [
    { id, type, temp, costKm, capacity }, // 3 vehicle types
  ]
};
```

### User Session Object
```javascript
{
  role: "farmer" | "fpo" | "consumer" | "bulk",
  name: string,
  place: string,  // "City, State"
  phone: string   // 10-digit mobile
}
```

### Cart Item
```javascript
{
  id: string,
  qty: number,
  bulk: boolean,
  name: string,
  price: number,  // ₹/unit
  unit: string    // "kg", "L", etc.
}
```

### Listing (Farmer)
```javascript
{
  id: string,
  name: string,
  crop: string,
  qty: number,
  unit: string,
  mandi: number,      // ₹/unit (reference)
  farm: number,       // ₹/unit (asking price)
  emoji: string,
  status: "Live" | "Pending" | "Sold Out",
  fpo: string,
  views: number       // Mock engagement metric
}
```

---

## 🧪 Testing & Debugging

### Testing Locally
1. **Open in browser:** `file:///path/to/krishiBazar/index.html`
2. **Or use Python server:** `python -m http.server 8000`
3. **Test flows:** Use dev tools → Application → Storage → Local Storage

### Browser DevTools Tips
```javascript
// Check session
JSON.parse(localStorage.getItem("kb_session"))

// Check cart
JSON.parse(localStorage.getItem("kb_cart"))

// Clear all data
localStorage.clear()

// Test language switch
localStorage.setItem("kb_lang", "hi")
location.reload()
```

### Common Test Scenarios
- ✅ Add item to cart → See count update
- ✅ Switch language → See translations apply
- ✅ Login as farmer → Publish listing → See in marketplace
- ✅ Resize window → See responsive grid adjust
- ✅ Switch roles → See different dashboards

---

## 📞 Support & Feedback

- **Report bug:** Open GitHub issue with reproduction steps
- **Feature request:** Describe use case & impact
- **Documentation:** Update this file & commit to repo

---

**Happy farming! 🌾 Together, we bridge the farm-to-kitchen gap.**
