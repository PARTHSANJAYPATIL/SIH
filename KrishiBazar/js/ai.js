function drawForecast(crop) {
  const canvas = document.getElementById("forecastChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth, h = canvas.clientHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0,0,w,h);
  const data = KB.forecast[crop];
  const max = Math.max(...data) * 1.15;
  const pad = 36;
  ctx.strokeStyle = "#d8e0d4";
  ctx.beginPath(); ctx.moveTo(pad,10); ctx.lineTo(pad,h-28); ctx.lineTo(w-10,h-28); ctx.stroke();
  ctx.beginPath();
  data.forEach((v, i) => {
    const x = pad + i * ((w - pad - 16) / (data.length - 1));
    const y = (h-28) - (v / max) * (h - 50);
    i ? ctx.lineTo(x,y) : ctx.moveTo(x,y);
  });
  ctx.strokeStyle = "#138808"; ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = "#5b667a"; ctx.font = "11px Segoe UI";
  KB.months.forEach((m,i) => {
    const x = pad + i * ((w - pad - 16) / (data.length - 1));
    ctx.fillText(m, x-10, h-8);
  });
  const now = new Date().getMonth();
  const next = data[(now+1)%12];
  const insight = document.getElementById("forecastNote");
  if (insight) {
    const spike = next > data[now];
    insight.innerHTML = spike
      ? `<strong>${crop}</strong> demand is projected to rise next month (₹${next}/kg model price). FPOs should stagger harvest & book reefer capacity early. Households can lock rates on KrishiBazar.`
      : `<strong>${crop}</strong> demand eases next month (₹${next}/kg). Bulk buyers (hotels, MDM, hostels) get better lots; farmers are advised to store via FPO cold rooms rather than distress-sell at mandi.`;
  }
}

function projectToMap(lat, lng, w, h) {
  const minLat = 8, maxLat = 35, minLng = 68, maxLng = 97;
  const x = ((lng - minLng) / (maxLng - minLng)) * (w - 40) + 20;
  const y = ((maxLat - lat) / (maxLat - minLat)) * (h - 40) + 20;
  return { x, y };
}

function drawRoutes() {
  const svg = document.getElementById("indiaRoutes");
  if (!svg) return;
  const w = 640, h = 360;
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  const start = document.getElementById("rtStart")?.value || "h1";
  const dests = [...document.querySelectorAll(".dest:checked")].map(x => x.value);
  const use = dests.length ? dests : ["h3","h2"];
  const { path, km } = nearestNeighbor(start, use);
  let dots = "";
  let lines = "";
  path.forEach((n, i) => {
    const p = projectToMap(n.lat, n.lng, w, h);
    dots += `<circle cx="${p.x}" cy="${p.y}" r="7" fill="${i===0?"#ff9933":"#138808"}"/>
      <text x="${p.x+10}" y="${p.y-8}" font-size="11" fill="#0f2744">${n.name}</text>`;
    if (i) {
      const prev = projectToMap(path[i-1].lat, path[i-1].lng, w, h);
      lines += `<line x1="${prev.x}" y1="${prev.y}" x2="${p.x}" y2="${p.y}" stroke="#0f2744" stroke-width="2" stroke-dasharray="6 4"/>`;
    }
  });
  const naive = use.reduce((a,id) => {
    const h0 = KB.hubs.find(x => x.id === start);
    const h1 = KB.hubs.find(x => x.id === id);
    return a + haversine(h0, h1) * 2;
  }, 0);
  svg.innerHTML = `
    <rect width="${w}" height="${h}" fill="#eaf3ea" rx="16"/>
    <text x="16" y="28" font-size="13" fill="#5b667a">Optimised milk-run across Indian hubs (nearest-neighbour heuristic)</text>
    ${lines}${dots}`;
  const veh = KB.vehicles[0];
  const saved = Math.max(0, Math.round(naive - km));
  document.getElementById("routeStats").innerHTML = `
    <div class="card"><b>${km} km</b><span>Optimised distance</span></div>
    <div class="card"><b>${inr(km * veh.costKm)}</b><span>Reefer cost estimate</span></div>
    <div class="card"><b>${saved} km saved</b><span>Vs going-and-returning to each city</span></div>
    <div class="card"><b>${path.map(p=>p.name.split(" ")[0]).join(" → ")}</b><span>Suggested sequence</span></div>`;
}

function loginSubmit(e) {
  e.preventDefault();
  const role = document.querySelector(".role.on")?.dataset.role || "farmer";
  Store.set("session", {
    role,
    name: document.getElementById("name").value,
    place: document.getElementById("place").value,
    phone: document.getElementById("phone").value
  });
  toast("Namaste. Session started as " + role);
  const go = { farmer: "farmer.html", fpo: "farmer.html", consumer: "marketplace.html", bulk: "buyer.html" };
  location.href = go[role] || "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".role").forEach(r => r.addEventListener("click", () => {
    document.querySelectorAll(".role").forEach(x => x.classList.remove("on"));
    r.classList.add("on");
  }));
  document.getElementById("loginForm")?.addEventListener("submit", loginSubmit);

  const cropSel = document.getElementById("cropForecast");
  if (cropSel) {
    cropSel.innerHTML = Object.keys(KB.forecast).map(c => `<option>${c}</option>`).join("");
    cropSel.addEventListener("change", () => drawForecast(cropSel.value));
    drawForecast("Onion");
    window.addEventListener("resize", () => drawForecast(cropSel.value));
  }

  const start = document.getElementById("rtStart");
  if (start) {
    start.innerHTML = KB.hubs.map(h => `<option value="${h.id}">${h.name}</option>`).join("");
    const box = document.getElementById("destBox");
    box.innerHTML = KB.hubs.slice(1).map(h =>
      `<label><input class="dest" type="checkbox" value="${h.id}" ${["h2","h3"].includes(h.id)?"checked":""}/> ${h.name}</label>`
    ).join("<br>");
    start.addEventListener("change", drawRoutes);
    box.addEventListener("change", drawRoutes);
    drawRoutes();
  }

  const orders = document.getElementById("orderList");
  if (orders) {
    const c = cart();
    if (!c.length) {
      orders.innerHTML = `<p class="sub">Cart is empty. Visit the marketplace to buy directly from FPOs.</p>`;
    } else {
      const total = c.reduce((a, x) => a + x.price * x.qty, 0);
      orders.innerHTML = `<table><thead><tr><th>Item</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
        <tbody>${c.map(x => `<tr><td>${x.name}${x.bulk?" (bulk)":""}</td><td>${x.qty} ${x.unit}</td><td>${inr(x.price)}</td><td>${inr(x.price*x.qty)}</td></tr>`).join("")}</tbody></table>
        <p style="margin:16px 0"><strong>Pay ${inr(total)}</strong> · UPI / Bharat QR (demo)</p>
        <button class="btn" id="payBtn">Place order (UPI demo)</button>`;
      document.getElementById("payBtn").onclick = () => {
        const hist = Store.get("orders", []);
        hist.unshift({ id: "ORD-" + Date.now(), total, items: c, at: new Date().toLocaleString("en-IN") });
        Store.set("orders", hist);
        Store.set("cart", []);
        toast("Order placed. Farmer payout initiated after delivery.");
        updateCartCount();
        location.href = "logistics.html";
      };
    }
  }
});
