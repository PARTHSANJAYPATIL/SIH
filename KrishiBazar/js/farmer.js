function farmerListings() {
  return Store.get("listings", KB.produce.slice(0, 4).map(p => ({
    ...p, status: "Live", views: 120 + Math.floor(Math.random() * 400)
  })));
}

function renderFarmer() {
  const s = session() || { name: "Guest Farmer", role: "farmer", place: "Nashik, Maharashtra" };
  const nameEl = document.getElementById("farmerName");
  if (nameEl) nameEl.textContent = s.name + " · " + (s.place || "India");

  const list = farmerListings();
  const extra = list.reduce((a, p) => a + (p.farm - p.mandi) * 80, 0);
  const el = document.getElementById("earnDelta");
  if (el) el.textContent = inr(extra) + " extra this week vs mandi";

  const tb = document.getElementById("listingBody");
  if (tb) {
    tb.innerHTML = list.map(p => `<tr>
      <td>${p.emoji} ${p.name}</td>
      <td>${p.qty.toLocaleString("en-IN")} ${p.unit}</td>
      <td>${inr(p.mandi)}</td>
      <td>${inr(p.farm)}</td>
      <td><span class="chip">${p.status || "Live"}</span></td>
    </tr>`).join("");
  }
}

function addListing(e) {
  e.preventDefault();
  const listings = farmerListings();
  listings.unshift({
    id: "u" + Date.now(),
    name: document.getElementById("cropName").value,
    crop: document.getElementById("cropName").value,
    qty: Number(document.getElementById("qty").value),
    unit: "kg",
    mandi: Number(document.getElementById("mandiP").value),
    farm: Number(document.getElementById("farmP").value),
    emoji: "🧺",
    status: "Live",
    fpo: session()?.name || "My FPO"
  });
  Store.set("listings", listings);
  toast("Listing published to KrishiBazar marketplace");
  e.target.reset();
  renderFarmer();
}

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("listingBody")) return;
  renderFarmer();
  document.getElementById("listForm")?.addEventListener("submit", addListing);
});
