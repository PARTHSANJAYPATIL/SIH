seedIfEmpty();

function toast(msg) {
  let t = document.getElementById("toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg; t.style.display = "block";
  setTimeout(() => t.style.display = "none", 2600);
}

function statusTag(s) {
  const map = {
    "Valid": "ok", "Pass": "ok", "Certificate issued": "ok", "Paid": "ok",
    "Scheduled": "info", "Submitted": "info", "Under inspection": "exp",
    "Expiring": "warn", "Pending": "warn",
    "Expired": "bad", "Fail": "bad", "Rejected": "bad"
  };
  return `<span class="tag ${map[s] || "info"}">${s}</span>`;
}

function navHTML(active) {
  const s = session();
  const extra = s ? `<a href="dashboard.html" class="${active==="dash"?"active":""}">Dashboard</a>
    <a class="btn small" href="#" id="logoutBtn">Logout</a>` : `<a class="btn" href="login.html">Login</a>`;
  return `<div class="tricolor"></div>
  <div class="topbar"><div class="container">
    <span><span class="em">DoCA</span> · ${LM.org}</span>
    <span>${LM.act} · ${LM.rules}</span>
  </div></div>
  <header class="nav"><div class="container">
    <a class="brand" href="index.html"><span class="logo">⚖</span> eMaap</a>
    <span class="header-menu-toggle" id="menuToggle">☰</span>
    <nav class="links" id="navLinks">
      <a href="index.html" class="${active==="home"?"active":""}">Home</a>
      <a href="search.html" class="${active==="search"?"active":""}">Verify certificate</a>
      <a href="apply.html" class="${active==="apply"?"active":""}">Apply</a>
      <a href="field.html" class="${active==="field"?"active":""}">Field app</a>
      <a href="reports.html" class="${active==="reports"?"active":""}">Reports</a>
      <a href="architecture.html" class="${active==="arch"?"active":""}">Architecture</a>
      <a href="help.html" class="${active==="help"?"active":""}">Help</a>
      ${extra}
    </nav>
  </div></header>`;
}

function footerHTML() {
  return `<footer><div class="container foot">
    <div><h4>eMaap</h4><p>Online verification, digital stamping and lifecycle management of weighing & measuring instruments under Legal Metrology.</p></div>
    <div><h4>Organisation</h4><a>${LM.dept}</a><a>${LM.org}</a><a>IILM Ranchi</a></div>
    <div><h4>Stakeholders</h4><a href="register.html">Users of weights & measures</a><a href="login.html">State LMOs</a><a href="login.html">GATCs</a></div>
    <div><h4>Law</h4><a href="https://consumeraffairs.gov.in/pages/legal-metrology-act" target="_blank" rel="noopener">Legal Metrology Act, 2009</a><a>General Rules, 2011</a><a href="help.html">Consumer search</a></div>
  </div><div class="container copy">SIH prototype. Not an official Government of India service. Demo credentials: demo123</div></footer>`;
}

function sideHTML(role, active) {
  const u = [
    ["dashboard.html","Overview"],["instruments.html","My instruments"],["apply.html","New application"],
    ["applications.html","Applications"],["certificates.html","Certificates"],["alerts.html","Expiry alerts"]
  ];
  const l = [
    ["dashboard.html","LMO desk"],["queue.html","Verification queue"],["schedule.html","Scheduling"],
    ["field.html","Field inspection"],["certificates.html","Issue / view certs"],["enforcement.html","Enforcement"]
  ];
  const g = [
    ["dashboard.html","GATC desk"],["queue.html","Lab queue"],["schedule.html","Slots"],["field.html","Test results"],["certificates.html","Certificates"]
  ];
  const a = [
    ["dashboard.html","India monitor"],["admin.html","Pendency & SLA"],["reports.html","MIS export"],["enforcement.html","Enforcement"],["architecture.html","Security"]
  ];
  const map = { user: u, lmo: l, gatc: g, admin: a };
  const items = map[role] || u;
  return `<aside class="side card">${items.map(([h,l]) => `<a href="${h}" class="${active===h?"active":""}">${l}</a>`).join("")}</aside>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const n = document.getElementById("site-nav");
  const f = document.getElementById("site-footer");
  if (n) n.innerHTML = navHTML(document.body.dataset.page || "home");
  if (f) f.innerHTML = footerHTML();
  
  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle) {
    menuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      navLinks?.classList.toggle("mobile-open");
    });
    // Close menu when a link is clicked
    navLinks?.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
      });
    });
  }
  
  // Mobile sidebar toggle
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.querySelector(".side");
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", (e) => {
      e.preventDefault();
      sidebar.classList.toggle("mobile-open");
    });
    // Close sidebar when a link is clicked
    sidebar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        sidebar.classList.remove("mobile-open");
      });
    });
  }
  
  document.getElementById("logoutBtn")?.addEventListener("click", e => {
    e.preventDefault();
    localStorage.removeItem("lm_session");
    location.href = "index.html";
  });
  const who = document.getElementById("who");
  if (who && session()) who.textContent = session().name + " · " + session().role.toUpperCase();
});

function requireLogin(roles) {
  const s = session();
  if (!s) { location.href = "login.html"; return null; }
  if (roles && !roles.includes(s.role)) { toast("This desk is for " + roles.join("/")); }
  return s;
}

function drawQR(canvas, text) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const n = 25;
  const size = canvas.width;
  const cell = size / n;
  ctx.fillStyle = "#fff"; ctx.fillRect(0,0,size,size);
  ctx.fillStyle = "#0b1f3a";
  const finder = (x,y) => {
    ctx.fillRect(x*cell, y*cell, 7*cell, 7*cell);
    ctx.fillStyle = "#fff"; ctx.fillRect((x+1)*cell,(y+1)*cell,5*cell,5*cell);
    ctx.fillStyle = "#0b1f3a"; ctx.fillRect((x+2)*cell,(y+2)*cell,3*cell,3*cell);
  };
  finder(0,0); finder(n-7,0); finder(0,n-7);
  let h = 0;
  for (let i=0;i<text.length;i++) h = (h * 33 + text.charCodeAt(i)) >>> 0;
  for (let y=0;y<n;y++) for (let x=0;x<n;x++) {
    if ((x<8 && y<8) || (x>n-9 && y<8) || (x<8 && y>n-9)) continue;
    h = (h * 1103515245 + 12345) >>> 0;
    if (h & 1) ctx.fillRect(x*cell, y*cell, cell, cell);
  }
}

function nextId(prefix, list, key="id") {
  return prefix + String(10000 + list.length + Math.floor(Math.random()*90));
}
