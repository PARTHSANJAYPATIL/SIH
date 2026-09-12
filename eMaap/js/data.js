const LM = {
  org: "Ministry of Consumer Affairs, Food & Public Distribution",
  dept: "Department of Consumer Affairs (DoCA)",
  act: "Legal Metrology Act, 2009",
  rules: "Legal Metrology (General) Rules, 2011",
  iilm: "Indian Institute of Legal Metrology, Ranchi",
  types: [
    { id: "EWM", name: "Electronic Weighing Machine (counter)", class: "III", periodMonths: 12, fee: 200 },
    { id: "PLT", name: "Platform scale", class: "III", periodMonths: 12, fee: 400 },
    { id: "WBR", name: "Weighbridge (road)", class: "III", periodMonths: 12, fee: 2500 },
    { id: "FDS", name: "Fuel dispenser / flow meter", class: "0.5", periodMonths: 12, fee: 1500 },
    { id: "ATM", name: "Auto-rickshaw / taxi fare meter", class: "—", periodMonths: 12, fee: 150 },
    { id: "WTM", name: "Water meter", class: "B", periodMonths: 24, fee: 120 },
    { id: "TAP", name: "Tape / length measure", class: "II", periodMonths: 24, fee: 50 },
    { id: "CTH", name: "Clinical thermometer", class: "—", periodMonths: 24, fee: 40 },
    { id: "BPM", name: "Sphygmomanometer (BP apparatus)", class: "—", periodMonths: 24, fee: 80 },
    { id: "CNG", name: "CNG / LNG dispenser", class: "1.0", periodMonths: 12, fee: 2000 }
  ],
  states: ["Andhra Pradesh","Assam","Bihar","Delhi","Goa","Gujarat","Haryana","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Odisha","Punjab","Rajasthan","Tamil Nadu","Telangana","Uttar Pradesh","West Bengal"],
  officers: [
    { id: "lmo1", name: "Smt. Kavita Deshmukh", desig: "Inspector, LM", district: "Pune", state: "Maharashtra", phone: "020-25501234" },
    { id: "lmo2", name: "Shri R. Venkatesh", desig: "Assistant Controller", district: "Bengaluru Urban", state: "Karnataka", phone: "080-22221100" },
    { id: "lmo3", name: "Shri Amit Tiwari", desig: "Inspector, LM", district: "Lucknow", state: "Uttar Pradesh", phone: "0522-2233445" },
    { id: "lmo4", name: "Smt. Ananya Bose", desig: "Inspector, LM", district: "Kolkata", state: "West Bengal", phone: "033-22113322" }
  ],
  gatcs: [
    { id: "g1", name: "Pune GATC — Automotive Research", district: "Pune", state: "Maharashtra", cap: "Weighbridges, dispensers" },
    { id: "g2", name: "NTH GATC Bengaluru", district: "Bengaluru Urban", state: "Karnataka", cap: "EWM, length, volume" },
    { id: "g3", name: "IILM Ranchi Reference Lab", district: "Ranchi", state: "Jharkhand", cap: "Calibration / training" }
  ]
};

function seedIfEmpty() {
  if (localStorage.getItem("lm_seeded")) return;
  const users = [
    { id: "u1", role: "user", name: "Shree Mart Pvt Ltd", email: "accounts@shreemart.in", phone: "9876543210", state: "Maharashtra", district: "Pune", gstin: "27AABCS1234A1Z5", pass: "demo123" },
    { id: "u2", role: "user", name: "HPCL Dealer — Baner", email: "baner@hpcl.demo", phone: "9822123456", state: "Maharashtra", district: "Pune", gstin: "27AAACH1111A1Z1", pass: "demo123" },
    { id: "lmo1", role: "lmo", name: "Smt. Kavita Deshmukh", email: "kavita.lmo@maharashtra.gov.in", phone: "9000000001", state: "Maharashtra", district: "Pune", pass: "demo123" },
    { id: "g1", role: "gatc", name: "Pune GATC", email: "gatc.pune@demo.gov.in", phone: "9000000002", state: "Maharashtra", district: "Pune", pass: "demo123" },
    { id: "a1", role: "admin", name: "DoCA LM Cell", email: "lm.admin@nic.in", phone: "011-23000000", state: "Delhi", district: "New Delhi", pass: "demo123" }
  ];
  const instruments = [
    { id: "IN-MH-10021", userId: "u1", type: "EWM", make: "Essae", model: "DS-852", serial: "ES-88210", cap: "30 kg", e: "5 g", loc: "Counter 2, FC Road, Pune", year: 2023, status: "Valid" },
    { id: "IN-MH-10022", userId: "u1", type: "PLT", make: "Avery", model: "L117", serial: "AV-44190", cap: "300 kg", e: "50 g", loc: "Back store, FC Road", year: 2022, status: "Expiring" },
    { id: "IN-MH-20001", userId: "u2", type: "FDS", make: "Gilbarco", model: "SK700", serial: "GB-77821", cap: "50 L/min", e: "0.5%", loc: "HPCL Baner Pump 3", year: 2024, status: "Valid" },
    { id: "IN-MH-20002", userId: "u2", type: "WBR", make: "Weightronix", model: "WB-60", serial: "WX-1022", cap: "60 t", e: "10 kg", loc: "Baner tanker bay", year: 2021, status: "Expired" }
  ];
  const today = new Date();
  const iso = d => d.toISOString().slice(0,10);
  const addM = (d, m) => { const x = new Date(d); x.setMonth(x.getMonth()+m); return x; };
  const applications = [
    { id: "APP-2026-00081", userId: "u1", instrumentId: "IN-MH-10021", kind: "Re-verification", status: "Certificate issued", assigned: "lmo1", slot: iso(today), fee: 200, paid: true, created: "2026-07-12" },
    { id: "APP-2026-00102", userId: "u1", instrumentId: "IN-MH-10022", kind: "Re-verification", status: "Scheduled", assigned: "lmo1", slot: iso(addM(today,0)), fee: 400, paid: true, created: iso(today) },
    { id: "APP-2026-00118", userId: "u2", instrumentId: "IN-MH-20002", kind: "Re-verification", status: "Submitted", assigned: null, slot: null, fee: 2500, paid: true, created: iso(today) },
    { id: "APP-2026-00044", userId: "u2", instrumentId: "IN-MH-20001", kind: "Initial verification", status: "Under inspection", assigned: "g1", slot: iso(today), fee: 1500, paid: true, created: "2026-08-02" }
  ];
  const inspections = [
    { appId: "APP-2026-00081", officer: "lmo1", result: "Pass", error: "Within MPE", seal: "LM-PNQ-7781", notes: "Zero tracking OK. Repeatability 3 readings within 1e.", photos: 2, at: "2026-07-14T10:40:00" }
  ];
  const certificates = [
    { id: "LM/MH/PUN/2026/7781", appId: "APP-2026-00081", instrumentId: "IN-MH-10021", issued: "2026-07-14", validTill: "2027-07-13", officer: "lmo1", stamp: "PUNE-LM-2026", qr: "LM/MH/PUN/2026/7781" }
  ];
  localStorage.setItem("lm_users", JSON.stringify(users));
  localStorage.setItem("lm_instruments", JSON.stringify(instruments));
  localStorage.setItem("lm_apps", JSON.stringify(applications));
  localStorage.setItem("lm_insp", JSON.stringify(inspections));
  localStorage.setItem("lm_certs", JSON.stringify(certificates));
  localStorage.setItem("lm_seeded", "1");
}

const Store = {
  get(k, f) { try { return JSON.parse(localStorage.getItem(k)) ?? f; } catch { return f; } },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
};
function users() { return Store.get("lm_users", []); }
function instruments() { return Store.get("lm_instruments", []); }
function apps() { return Store.get("lm_apps", []); }
function insp() { return Store.get("lm_insp", []); }
function certs() { return Store.get("lm_certs", []); }
function session() { return Store.get("lm_session", null); }
function typeOf(id) { return LM.types.find(t => t.id === id) || { name: id, periodMonths: 12, fee: 0 }; }
function inr(n) { return "₹" + Number(n).toLocaleString("en-IN"); }
function officerBy(id) { return LM.officers.find(o => o.id === id) || LM.gatcs.find(g => g.id === id) || { name: id, desig: "" }; }
function daysTo(dateStr) {
  const t = (new Date(dateStr) - new Date()) / 86400000;
  return Math.ceil(t);
}
