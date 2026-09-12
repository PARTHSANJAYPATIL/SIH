const Store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem("kb_" + key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) { localStorage.setItem("kb_" + key, JSON.stringify(value)); }
};

function toast(msg) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.display = "block";
  setTimeout(() => { t.style.display = "none"; }, 2400);
}

function currentLang() { return Store.get("lang", "en"); }
function setLang(l) { Store.set("lang", l); applyI18n(); }

function applyI18n() {
  const pack = I18N[currentLang()] || I18N.en;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    if (pack[k]) el.textContent = pack[k];
  });
  const btn = document.getElementById("langBtn");
  if (btn) btn.textContent = currentLang() === "hi" ? "EN" : "हिन्दी";
}

function session() { return Store.get("session", null); }
function requireRole(roles) {
  const s = session();
  if (!s || (roles && !roles.includes(s.role))) {
    location.href = "login.html";
  }
  return s;
}

function inr(n) {
  return "₹" + Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

function cart() { return Store.get("cart", []); }
function addToCart(id, qty = 1, bulk = false) {
  const item = KB.produce.find(p => p.id === id);
  if (!item) return;
  const c = cart();
  const found = c.find(x => x.id === id && x.bulk === bulk);
  if (found) found.qty += qty;
  else c.push({ id, qty, bulk, name: item.name, price: bulk ? item.farm : item.farm + 4, unit: item.unit });
  Store.set("cart", c);
  toast((bulk ? "Bulk lot added: " : "Added to cart: ") + item.name);
  updateCartCount();
}
function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (el) el.textContent = cart().reduce((a, b) => a + b.qty, 0);
}

function toggleMobileMenu() {
  const nav = document.querySelector(".nav-links");
  const overlay = document.querySelector(".nav-overlay");
  nav?.classList.toggle("mobile-open");
  overlay?.classList.toggle("active");
}

function closeMobileMenu() {
  const nav = document.querySelector(".nav-links");
  const overlay = document.querySelector(".nav-overlay");
  nav?.classList.remove("mobile-open");
  overlay?.classList.remove("active");
}

function navHTML(active) {
  return `
  <div class="tricolor"></div>
  <div class="topbar"><div class="container">
    <span><span class="badge-org">DoCA</span> · ${KB.org}</span>
    <span style="display: none;">Smart India Hackathon · Agriculture, FoodTech & Rural Development</span>
  </div></div>
  <header class="nav"><div class="container">
    <a class="brand" href="index.html">
      <span class="logo">🌾</span>
      <span data-i18n="brand">KrishiBazar</span>
    </a>
    <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle menu" aria-expanded="false">☰</button>
    <nav class="nav-links">
      <a href="index.html" class="${active==="home"?"active":""}" data-i18n="home">Home</a>
      <a href="marketplace.html" class="${active==="market"?"active":""}" data-i18n="market">Marketplace</a>
      <a href="farmer.html" class="${active==="farmer"?"active":""}" data-i18n="farmer">Farmer / FPO</a>
      <a href="buyer.html" class="${active==="buyer"?"active":""}" data-i18n="buyer">Buyers</a>
      <a href="logistics.html" class="${active==="logistics"?"active":""}" data-i18n="logistics">Logistics</a>
      <a href="ai.html" class="${active==="ai"?"active":""}" data-i18n="ai">AI Insights</a>
      <a href="orders.html" class="${active==="orders"?"active":""}">Orders <span id="cartCount" class="chip">0</span></a>
      <button class="lang-toggle" id="langBtn" type="button">हिन्दी</button>
      <a class="btn" href="login.html" data-i18n="login">Login</a>
    </nav>
    <div class="nav-overlay" id="navOverlay"></div>
  </div></header>`;
}

function footerHTML() {
  return `<footer>
    <div class="container foot-grid">
      <div>
        <h4>KrishiBazar</h4>
        <p>A digital marketplace connecting Indian farmers & FPOs directly with consumers and bulk buyers. Logistics + AI demand forecasting & route optimisation.</p>
      </div>
      <div>
        <h4>Organisation</h4>
        <a>${KB.org}</a>
        <a>${KB.dept}</a>
        <a>Category: Software</a>
      </div>
      <div>
        <h4>For India</h4>
        <a href="marketplace.html">e-NAM style listings</a>
        <a href="ai.html">Demand & monsoon forecast</a>
        <a href="logistics.html">Cold-chain & last mile</a>
      </div>
    </div>
    <div class="container copy">Prototype for demonstration. Prices are indicative. MSP / APMC / e-NAM concepts used for education.</div>
  </footer>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const mount = document.getElementById("site-nav");
  const foot = document.getElementById("site-footer");
  if (mount) mount.innerHTML = navHTML(document.body.dataset.page || "home");
  if (foot) foot.innerHTML = footerHTML();
  
  // Mobile menu setup
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navOverlay = document.getElementById("navOverlay");
  const navLinks = document.querySelectorAll(".nav-links a");
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", toggleMobileMenu);
  }
  
  if (navOverlay) {
    navOverlay.addEventListener("click", closeMobileMenu);
  }
  
  // Close menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });
  
  document.getElementById("langBtn")?.addEventListener("click", () => {
    setLang(currentLang() === "en" ? "hi" : "en");
  });
  applyI18n();
  updateCartCount();
});
