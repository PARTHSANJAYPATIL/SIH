function haversine(a, b) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const s = Math.sin(dLat/2)**2 + Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLng/2)**2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

function nearestNeighbor(startId, destIds) {
  const nodes = KB.hubs.filter(h => destIds.includes(h.id) || h.id === startId);
  const start = nodes.find(n => n.id === startId);
  const remaining = nodes.filter(n => n.id !== startId);
  const path = [start];
  let km = 0;
  while (remaining.length) {
    let bestI = 0, bestD = Infinity;
    remaining.forEach((n, i) => {
      const d = haversine(path[path.length-1], n);
      if (d < bestD) { bestD = d; bestI = i; }
    });
    km += bestD;
    path.push(remaining.splice(bestI, 1)[0]);
  }
  return { path, km: Math.round(km) };
}

function renderTracking() {
  const jobs = Store.get("shipments", [
    { id: "KB-4412", crop: "Onion", from: "Nashik FPO", to: "Mumbai Andheri", status: "In transit · Pune bypass", eta: "6 hrs", temp: "6°C" },
    { id: "KB-4418", crop: "Basmati", from: "Doaba FPO, Punjab", to: "Delhi NCR kirana cluster", status: "Loaded", eta: "11 hrs", temp: "Ambient" },
    { id: "KB-4421", crop: "Tomato", from: "Kolar FPO", to: "Bengaluru HOPCOMS", status: "Cold store hold", eta: "Tonight", temp: "8°C" }
  ]);
  const tb = document.getElementById("shipBody");
  if (!tb) return;
  tb.innerHTML = jobs.map(j => `<tr>
    <td>${j.id}</td><td>${j.crop}</td><td>${j.from}</td><td>${j.to}</td>
    <td>${j.status}</td><td>${j.eta}</td><td>${j.temp}</td>
  </tr>`).join("");
}

function bookLogistics(e) {
  e.preventDefault();
  const jobs = Store.get("shipments", []);
  jobs.unshift({
    id: "KB-" + Math.floor(4000 + Math.random()*5000),
    crop: document.getElementById("lgCrop").value,
    from: document.getElementById("lgFrom").value,
    to: document.getElementById("lgTo").value,
    status: "Assigned · waiting pickup",
    eta: document.getElementById("lgWhen").value || "Tomorrow",
    temp: document.getElementById("lgVeh").selectedOptions[0].dataset.temp
  });
  Store.set("shipments", jobs);
  toast("Logistics booked. Driver & cold-chain assigned.");
  renderTracking();
  e.target.reset();
}

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("shipBody")) return;
  const veh = document.getElementById("lgVeh");
  if (veh) veh.innerHTML = KB.vehicles.map(v =>
    `<option data-temp="${v.temp}">${v.type} · ${v.temp} · ₹${v.costKm}/km</option>`
  ).join("");
  const from = document.getElementById("lgFrom");
  const to = document.getElementById("lgTo");
  if (from) from.innerHTML = KB.hubs.map(h => `<option>${h.name}</option>`).join("");
  if (to) to.innerHTML = KB.cities.map(c => `<option>${c}</option>`).join("");
  document.getElementById("lgForm")?.addEventListener("submit", bookLogistics);
  renderTracking();
});
