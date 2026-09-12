const KB = {
  org: "Ministry of Consumer Affairs, Food & Public Distribution",
  dept: "Department of Consumer Affairs (DoCA)",
  problem: "Multiple intermediaries reduce farmers' earnings and increase consumer prices.",
  states: [
    "Andhra Pradesh", "Bihar", "Gujarat", "Haryana", "Karnataka", "Madhya Pradesh",
    "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana",
    "Uttar Pradesh", "West Bengal"
  ],
  cities: ["Delhi NCR", "Mumbai", "Pune", "Bengaluru", "Hyderabad", "Ahmedabad", "Kolkata", "Lucknow", "Chennai", "Jaipur", "Nashik", "Nagpur"],
  produce: [
    { id: "p1", name: "Nashik Red Onion", crop: "Onion", fpo: "Sahyadri FPO", state: "Maharashtra", mandi: 18, farm: 24, retail: 42, unit: "kg", qty: 12000, grade: "A", emoji: "🧅", color: "#8b3a62" },
    { id: "p2", name: "Sharbati Wheat", crop: "Wheat", fpo: "Malwa Kisan FPO", state: "Madhya Pradesh", mandi: 22, farm: 27, retail: 38, unit: "kg", qty: 40000, grade: "MSP+", emoji: "🌾", color: "#c9a227" },
    { id: "p3", name: "Alphonso Mango (Devgad)", crop: "Mango", fpo: "Konkan Fruit FPO", state: "Maharashtra", mandi: 90, farm: 140, retail: 280, unit: "kg", qty: 3500, grade: "GI", emoji: "🥭", color: "#e67e22" },
    { id: "p4", name: "Guntur Chilli", crop: "Chilli", fpo: "Rayalaseema Spice FPO", state: "Andhra Pradesh", mandi: 160, farm: 210, retail: 340, unit: "kg", qty: 8000, grade: "A", emoji: "🌶️", color: "#c0392b" },
    { id: "p5", name: "Punjab Basmati 1121", crop: "Rice", fpo: "Doaba Grain FPO", state: "Punjab", mandi: 48, farm: 58, retail: 95, unit: "kg", qty: 18000, grade: "Export", emoji: "🍚", color: "#27ae60" },
    { id: "p6", name: "Himachal Apple (Shimla)", crop: "Apple", fpo: "Hill Horti FPO", state: "Himachal Pradesh", mandi: 70, farm: 95, retail: 180, unit: "kg", qty: 6000, grade: "A", emoji: "🍎", color: "#e74c3c" },
    { id: "p7", name: "Kolar Tomato", crop: "Tomato", fpo: "Bengaluru Rural FPO", state: "Karnataka", mandi: 12, farm: 18, retail: 36, unit: "kg", qty: 9000, grade: "A", emoji: "🍅", color: "#d35400" },
    { id: "p8", name: "Bikaner Cumin", crop: "Cumin", fpo: "Maru Masala FPO", state: "Rajasthan", mandi: 320, farm: 390, retail: 540, unit: "kg", qty: 2200, grade: "A", emoji: "🌿", color: "#1e8449" },
    { id: "p9", name: "Nadia Potato", crop: "Potato", fpo: "Bengal Tuber FPO", state: "West Bengal", mandi: 10, farm: 14, retail: 28, unit: "kg", qty: 25000, grade: "A", emoji: "🥔", color: "#b9770e" },
    { id: "p10", name: "Anand Milk (FPO Dairy)", crop: "Milk", fpo: "Charotar Dairy FPO", state: "Gujarat", mandi: 38, farm: 48, retail: 62, unit: "L", qty: 15000, grade: "Fresh", emoji: "🥛", color: "#5dade2" },
    { id: "p11", name: "Turmeric (Erode)", crop: "Turmeric", fpo: "Kongu Spice FPO", state: "Tamil Nadu", mandi: 95, farm: 125, retail: 210, unit: "kg", qty: 4500, grade: "A", emoji: "🟡", color: "#d4ac0d" },
    { id: "p12", name: "Mustard Oilseed", crop: "Mustard", fpo: "Bharatpur Tilli FPO", state: "Rajasthan", mandi: 52, farm: 64, retail: 98, unit: "kg", qty: 11000, grade: "A", emoji: "🌼", color: "#f4d03f" }
  ],
  forecast: {
    Onion: [32, 28, 24, 22, 26, 40, 55, 48, 36, 30, 28, 34],
    Tomato: [22, 18, 16, 20, 28, 35, 42, 30, 22, 18, 20, 24],
    Wheat: [24, 24, 25, 26, 27, 26, 25, 25, 26, 27, 28, 27],
    Rice: [42, 43, 44, 45, 46, 44, 43, 44, 45, 47, 48, 46]
  },
  months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  hubs: [
    { id: "h1", name: "Nashik Aggregation Hub", type: "FPO Collection", lat: 20.0, lng: 73.8 },
    { id: "h2", name: "Pune Cold Chain", type: "Cold Store", lat: 18.5, lng: 73.8 },
    { id: "h3", name: "Mumbai Retail Cluster", type: "Buyer", lat: 19.07, lng: 72.87 },
    { id: "h4", name: "Delhi Azadpur Bypass", type: "Bulk Buyer", lat: 28.7, lng: 77.1 },
    { id: "h5", name: "Hyderabad Bowenpally", type: "Wholesale", lat: 17.4, lng: 78.5 },
    { id: "h6", name: "Bengaluru HOPCOMS Link", type: "Retail", lat: 12.97, lng: 77.59 }
  ],
  vehicles: [
    { id: "v1", type: "Reefer 9T", temp: "2–8°C", costKm: 38, capacity: 9000 },
    { id: "v2", type: "Mini Truck 1.5T", temp: "Ambient", costKm: 18, capacity: 1500 },
    { id: "v3", type: "Insulated 4T", temp: "8–12°C", costKm: 26, capacity: 4000 }
  ]
};

const I18N = {
  en: {
    brand: "KrishiBazar",
    tagline: "Farm to kitchen. No extra middlemen.",
    home: "Home", market: "Marketplace", farmer: "Farmer / FPO", buyer: "Buyers", logistics: "Logistics", ai: "AI Insights", login: "Login",
    heroTitle: "Better prices for farmers. Lower prices for Indian households.",
    heroLead: "KrishiBazar is a digital mandi that connects farmers and FPOs directly with consumers and bulk buyers, with logistics and AI demand-route intelligence — aligned to DoCA’s goal of cutting supply-chain waste.",
    ctaMarket: "Shop produce", ctaFarmer: "List your harvest",
    problem: "The problem",
    solution: "Expected solution"
  },
  hi: {
    brand: "कृषिबाज़ार",
    tagline: "खेत से रसोई तक। अतिरिक्त बिचौलिये नहीं।",
    home: "होम", market: "बाज़ार", farmer: "किसान / FPO", buyer: "खरीदार", logistics: "लॉजिस्टिक्स", ai: "एआई इनसाइट", login: "लॉगिन",
    heroTitle: "किसानों को बेहतर भाव, घरों को सस्ता राशन।",
    heroLead: "कृषिबाज़ार एक डिजिटल मंडी है जो किसानों और FPO को सीधे उपभोक्ताओं और थोक खरीदारों से जोड़ती है — लॉजिस्टिक्स और एआई मांग-रूट अनुकूलन के साथ।",
    ctaMarket: "उत्पाद देखें", ctaFarmer: "फसल सूचीबद्ध करें",
    problem: "समस्या",
    solution: "अपेक्षित समाधान"
  }
};
