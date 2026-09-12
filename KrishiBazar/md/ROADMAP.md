# KrishiBazar Development Roadmap 🗺️

Product vision and technical roadmap for KrishiBazar 2024–2025+.

---

## 📋 Vision

Transform India's farm-to-consumer supply chain by:
- **Eliminating intermediaries:** Direct farmer-to-buyer connections
- **Ensuring farmer profitability:** 18–40% higher realisation vs APMC
- **Providing consumer savings:** 15–35% reduction in retail prices
- **Optimizing logistics:** AI-driven routing, cold-chain management
- **Building trust:** Transparent pricing, quality assurance, payment security

---

## 🏗️ Phase 1: MVP (Smart India Hackathon - July 2024)

### ✅ Completed
- [x] Multi-role authentication (Farmer, FPO, Consumer, Bulk Buyer)
- [x] Responsive marketplace with filters
- [x] Farmer listing & earnings dashboard
- [x] Bulk buyer portal with institutional pricing
- [x] Logistics hub network & route visualization (mock)
- [x] AI demand forecasting (12-month chart)
- [x] Multi-language support (English, Hindi)
- [x] Cart & order tracking (demo)
- [x] Mobile-responsive design (< 480px, 480–768px, > 768px)
- [x] Local storage data persistence (no backend)

### 📊 Key Metrics
- **Demo Users:** Farmer (Lasalgaon), Buyer (Mumbai), Consumer (Pune)
- **Sample Produce:** 12 items across 14 states
- **Logistics Hubs:** 6 regional collection/distribution centers
- **Vehicles:** 3 temperature-controlled options
- **Language Support:** English + Hindi

---

## 🎯 Phase 2: Production Backend (Aug–Sep 2024)

### 2.1 Backend Infrastructure
**Timeline:** 6–8 weeks  
**Team:** 2 Backend Devs, 1 DevOps

#### Database Design (PostgreSQL)
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  role ENUM ('farmer', 'fpo', 'consumer', 'bulk_buyer'),
  name VARCHAR,
  email VARCHAR UNIQUE,
  phone VARCHAR,
  location GEOMETRY,  -- Geo-location
  verified BOOLEAN,
  kyc_status ENUM ('pending', 'approved', 'rejected'),
  created_at TIMESTAMP
);

-- Produce listings
CREATE TABLE listings (
  id UUID PRIMARY KEY,
  farmer_id UUID REFERENCES users,
  crop VARCHAR,
  quantity INTEGER,
  unit VARCHAR,
  mandi_price DECIMAL,
  farmer_price DECIMAL,
  state VARCHAR,
  fpo_id UUID,
  status ENUM ('live', 'pending', 'sold'),
  created_at TIMESTAMP
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  buyer_id UUID REFERENCES users,
  items JSONB,
  total DECIMAL,
  status ENUM ('pending', 'confirmed', 'in_transit', 'delivered'),
  payment_status ENUM ('pending', 'paid', 'refunded'),
  created_at TIMESTAMP
);

-- Logistics tracking
CREATE TABLE shipments (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders,
  vehicle_id UUID,
  route_id UUID,
  current_location GEOMETRY,
  temperature DECIMAL,
  status ENUM ('packed', 'in_transit', 'delivered'),
  eta TIMESTAMP,
  updated_at TIMESTAMP
);
```

#### API Endpoints (REST/GraphQL)

**REST Endpoints:**
```
GET    /api/v1/produce              → List all produce
POST   /api/v1/produce              → Create listing (auth: farmer)
GET    /api/v1/produce/:id          → Get listing details
PUT    /api/v1/produce/:id          → Update listing
DELETE /api/v1/produce/:id          → Remove listing

GET    /api/v1/orders               → Get user's orders
POST   /api/v1/orders               → Create order
PUT    /api/v1/orders/:id/status    → Update order status

GET    /api/v1/shipments/:id        → Get shipment tracking
POST   /api/v1/shipments            → Create shipment (admin)

GET    /api/v1/forecast/:crop       → Get price forecast
GET    /api/v1/forecast/advisory    → Get crop advisory
```

**GraphQL Alternative:**
```graphql
query {
  produce(state: "Maharashtra", crop: "Onion") {
    id, name, mandi, farm, qty, fpo { name, rating }
  }
}

mutation {
  createListing(input: {
    crop: "Onion",
    qty: 5000,
    mandiPrice: 18,
    farmerPrice: 24
  }) {
    id, status
  }
}
```

#### Authentication & Authorization
- **OTP Verification:** Twilio SMS for phone verification
- **JWT Tokens:** Access + Refresh tokens
- **Role-Based Access Control (RBAC):** Farmer can only edit own listings
- **Session Management:** Redis-based with 24-hour expiry
- **2FA Optional:** For institutional buyers

### 2.2 Payment Integration

**Stripe/Razorpay Integration:**
```javascript
// Payment flow
1. User adds to cart
2. Click "Checkout" → Razorpay form
3. User enters UPI/card details
4. Payment processed
5. Webhook: payment.success → Create order in DB
6. Farmer notified → Payout initiated (T+1 UPI)
```

**Payment Models:**
- **B2C (Consumer):** Credit card, UPI, Net banking
- **B2B (Bulk Buyer):** Net banking, NEFT, Credit line
- **Farmer Payouts:** UPI (T+1), Bank transfer (T+2)

**Compliance:**
- PCI DSS Level 1 (if storing cards)
- GST Invoice generation (GSTR-1 integration)
- FSSAI compliance checks

### 2.3 Real Notifications

**Implementation:**
```
SMS (Twilio):
├─ Farmer: "Your lot published! 50 kg onion @ ₹24/kg"
├─ Buyer: "Order confirmed. Pickup scheduled for T+1"
└─ Consumer: "Order delivered. Rate this farmer."

Push Notifications (Firebase Cloud Messaging):
├─ Mobile app: Real-time order updates
├─ Logistics: Vehicle tracking alerts
└─ Demand: "Onion price dropping! List now."

Email (SendGrid):
├─ Order receipts
├─ Invoice & GST details
└─ Monthly summary reports
```

---

## 🚀 Phase 3: Mobile App (Sep–Dec 2024)

### 3.1 Native Mobile App (iOS + Android)

**Technology Stack:**
- **Frontend:** React Native or Flutter
- **Backend:** Existing REST API (Phase 2)
- **Analytics:** Firebase Analytics
- **Offline:** SQLite local cache

**Key Features:**
- Push notifications for orders/payments
- GPS-based hub locator
- Real-time shipment tracking (maps)
- Camera scan for QR codes (delivery verification)
- Voice support (Hindi/English crop names)
- Offline mode for farmers (sync when online)

**MVP Timeline:** 8–10 weeks (2 Devs: 1 iOS, 1 Android)

### 3.2 Web App Enhancements
- [ ] Dark mode toggle
- [ ] PWA support (offline-first)
- [ ] Advanced analytics dashboard
- [ ] Video tutorials (on-boarding)

---

## 🤖 Phase 4: AI & ML (Oct 2024–Mar 2025)

### 4.1 Demand Forecasting (ML Model)

**Current:** Static 12-month forecast  
**Future:** Dynamic forecasting based on:
- Historical price trends (APMC, e-NAM)
- Weather data (rainfall, temperature)
- Market events (festivals, pandemics, government policies)
- Global commodity prices (oil, fertilizer)

**Model:** ARIMA / Prophet / LSTM neural network

```python
# Pseudocode
from statsmodels.tsa.arima.model import ARIMA

# Train on 5-year APMC onion prices
history = load_apmc_prices('onion', state='maharashtra', years=5)
model = ARIMA(history, order=(1,1,1))
forecast = model.fit().get_forecast(steps=12)

# API endpoint
GET /api/v1/forecast/onion?state=Maharashtra
→ {
  "crop": "onion",
  "state": "Maharashtra",
  "forecast": [22, 21, 24, 28, 32, 40, 55, 48, 36, 30, 28, 34],
  "confidence": [0.85, 0.84, 0.83, ...],
  "factors": ["monsoon", "festival", "export"]
}
```

### 4.2 Route Optimization (TSP Solver)

**Current:** Simple distance calculation  
**Future:** Multi-objective optimization

```python
# Vehicle Routing Problem (VRP)
# Minimize: total_cost + spoilage_loss + delivery_time

from ortools.linear_solver import pywraplp

solver = pywraplp.Solver.CreateSolver('ROUTING_INDEX_MANAGER')

# Add constraints:
# - Vehicle capacity (9T reefer, 4T insulated, 1.5T ambient)
# - Temperature requirement (cold chain: 2–8°C, ambient, etc.)
# - Delivery time windows (T+1, T+2)
# - Hub opening hours

# Optimize route
solution = routing.SolveFromAssignmentWithParameters(...)
```

### 4.3 Quality Grading (Computer Vision)

**Using TensorFlow/PyTorch:**
- Farmer uploads photo → ML model grades produce
- Grades: A (premium), B (standard), C (utility)
- Automatic pricing based on grade

```python
import tensorflow as tf

model = tf.keras.applications.MobileNetV2(...)
# Train on 10K produce images

def grade_produce(image_path):
    img = tf.keras.preprocessing.image.load_img(image_path, target_size=(224, 224))
    prediction = model.predict(np.expand_dims(img, axis=0))
    grade = ['A', 'B', 'C'][np.argmax(prediction)]
    confidence = np.max(prediction)
    return grade, confidence
```

### 4.4 Demand-Supply Matching (Recommendation Engine)

**Algorithm:** Collaborative filtering + content-based

```
When farmer publishes lot:
1. Extract features (crop, qty, state, price)
2. Find similar buyer requests
3. Notify top 5 matching bulk buyers
4. Track success rate
5. Improve model with feedback
```

---

## 📊 Phase 5: Analytics & Admin Dashboard (Jan–Mar 2025)

### 5.1 Admin Dashboard

**Metrics:**
- Total users (farmers, consumers, bulk buyers)
- Live listings by state/crop
- Transaction volume & revenue
- Average farmer realisation lift (vs APMC)
- Average consumer savings (vs retail)
- Logistics utilization rate
- Quality complaints & resolution rate

**Features:**
- User KYC/verification management
- Listing moderation (approve/reject)
- Order dispute resolution
- Payout batch processing
- GST settlement reports
- FSSAI compliance checks

### 5.2 Farmer Analytics

**Dashboard shows:**
- Earnings over time (daily/weekly/monthly)
- Price trends for their crops
- Buyer feedback & ratings
- Pickup request history
- Forecast recommendations

### 5.3 Buyer Analytics

**Insights:**
- Total spend, average order value
- Supplier performance (quality, timeliness)
- Cost savings vs market
- Peak demand periods
- Seasonal usage patterns

### 5.4 Business Intelligence

**Reports:**
- State-wise market analysis
- FPO performance comparison
- Cold-chain utilization
- Last-mile delivery KPIs
- Customer acquisition cost (CAC)
- Lifetime value (LTV)

---

## 🌍 Phase 6: Expansion & Partnerships (Apr 2025+)

### 6.1 Government Integration

- **e-NAM Integration:** Real-time APMC price feeds
- **PM-FASAL Integration:** Crop insurance linkage
- **APMC Reform:** Reduce mandi fees for KrishiBazar listings
- **Subsidy Routing:** Cold-chain cost sharing with MIDH

### 6.2 Payment Partner Expansion

- **Bank Partnerships:** Direct settlement
- **NEFT/RTGS:** For bulk transactions (> ₹1L)
- **Digital Rupee:** When RBI launches e₹
- **TradeFi:** Buy-now-pay-later for bulk buyers

### 6.3 Farmer Producer Organizations (FPOs)

- **Bulk Aggregation:** Auto-combine small farmer lots
- **Quality Certification:** Lab testing integration
- **Market Linkage:** Direct contracts with retailers
- **Input Supply:** Fertilizer/seed tie-ups

### 6.4 Export Enablement

- **International Buyers:** Connect to UAE, Singapore, UK
- **Export Compliance:** FSSAI, FSANZ certification
- **Currency Exchange:** Forex hedging for farmers
- **Shipping Coordination:** FCL/LCL consolidation

### 6.5 Insurance & Risk Management

- **Crop Insurance:** PMFBY integration
- **Payment Insurance:** Protect buyers from farmer default
- **Logistics Insurance:** Cover goods in transit
- **Price Insurance:** Farmer minimum floor price guarantee

---

## 🔧 Technical Debt & Refactoring

### Phase 2–3 Improvements

- [ ] **Split JavaScript:** Break `app.js` into modules (ES6 imports)
- [ ] **CSS Architecture:** Move to SCSS/PostCSS for maintainability
- [ ] **Component Library:** Reusable web components (web standards)
- [ ] **API Documentation:** Swagger/OpenAPI specification
- [ ] **Testing:** Unit tests (Jest), E2E tests (Playwright)
- [ ] **CI/CD:** GitHub Actions for automated testing & deployment
- [ ] **Logging:** Structured logs (ELK stack)
- [ ] **Monitoring:** Sentry for error tracking, DataDog for metrics
- [ ] **Security:** OWASP Top 10 audit, penetration testing

---

## 📅 Timeline Summary

| Phase | Title | Timeline | Status | Team |
|-------|-------|----------|--------|------|
| 1 | MVP | Jun–Jul 2024 | ✅ Complete | 4 people |
| 2 | Production Backend | Aug–Sep 2024 | ⏳ In Progress | 3 people |
| 3 | Mobile App | Sep–Dec 2024 | 📋 Planned | 2 people |
| 4 | AI & ML | Oct 2024–Mar 2025 | 📋 Planned | 2 people |
| 5 | Analytics Dashboard | Jan–Mar 2025 | 📋 Planned | 1 person |
| 6 | Expansion & Partnerships | Apr 2025+ | 📋 Planned | Team |

---

## 💰 Funding & Business Model

### Revenue Streams

**1. Commission on Transactions**
- Consumer orders: 2–3% commission
- Bulk orders: 1–1.5% commission
- Farmer guarantee: No commission for first 100 listings

**2. Value-Added Services**
- Logistics coordination: ₹50 per shipment
- Quality certification: ₹200 per batch
- Farmer training: ₹1000 per course
- Market data subscription: ₹500/month (bulk buyers)

**3. Advertising**
- Input suppliers (fertilizer, seeds): Banner ads
- Equipment manufacturers (tractors): Featured listings
- Logistics partners: Hub promotion

**4. Data Monetization** (Privacy-first)
- Anonymous market trends to retailers
- Demand patterns to input suppliers
- Quality insights to processors
- Performance metrics to policy makers (NGO)

---

## 🎯 Success Criteria (24-Month Goals)

| Metric | Target | Status |
|--------|--------|--------|
| **Active Users** | 50K farmers, 100K consumers | 📊 Tracking |
| **Monthly GMV** | ₹50 crores | 📊 Tracking |
| **States Covered** | 14 states | ✅ Phase 1 |
| **Cold-chain Hubs** | 50+ regional hubs | 📋 Phase 2 |
| **Avg Farmer Lift** | 25% vs APMC | 📊 Tracking |
| **Avg Consumer Saving** | 20% vs retail | 📊 Tracking |
| **Mobile App Downloads** | 100K+ | 📋 Phase 3 |
| **NPS Score** | > 50 | 📊 Tracking |
| **Farmer Retention** | > 80% month-on-month | 📊 Tracking |

---

## 🤝 Partnership Opportunities

- **Input Suppliers:** Bayer, Syngenta, ITC
- **Logistics:** Blackbuck, Rivigo, Ather
- **Retailers:** DMart, BigBasket, Blinkit
- **Cooperatives:** IFFCO, NAFED, State govt agricultural depts
- **NGOs:** SFAC, SERP, Practical Action
- **Banks:** RBI, SBI, HDFC, Yes Bank

---

## 📚 Resources & References

- **Agriculture Tech:** https://fpo.gov.in, https://enam.gov.in
- **ML/AI:** TensorFlow, PyTorch, Hugging Face
- **Backend:** PostgreSQL, Redis, Node.js, Python Django
- **DevOps:** Docker, Kubernetes, AWS/GCP/Azure
- **Analytics:** Apache Superset, Metabase, Tableau

---

## ✍️ Contributing to Roadmap

Have ideas? Open GitHub issues with label `roadmap-enhancement`. Include:
- Problem statement
- Proposed solution
- Estimated effort
- Success criteria

---

**Together, we're building the future of India's agricultural supply chain! 🌾**

---

**Last Updated:** September 12, 2024  
**Maintained By:** KrishiBazar Development Team
