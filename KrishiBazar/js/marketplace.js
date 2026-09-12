function renderProduce(list) {
  const grid = document.getElementById("produceGrid");
  if (!grid) return;
  grid.innerHTML = list.map(p => {
    const saveConsumer = p.retail - (p.farm + 4);
    const extraFarmer = p.farm - p.mandi;
    return `<article class="card produce">
      <div class="art" style="background:${p.color}">${p.emoji}</div>
      <span class="tag">${p.state} · ${p.grade}</span>
      <h3>${p.name}</h3>
      <p>${p.fpo} · ${p.qty.toLocaleString("en-IN")} ${p.unit} available</p>
      <div class="meta">
        <span>Mandi ${inr(p.mandi)}</span>
        <span>Direct ${inr(p.farm + 4)}/${p.unit}</span>
      </div>
      <p class="chip">Farmer +${inr(extraFarmer)}/${p.unit} · Consumer −${inr(saveConsumer)}</p>
      <div class="row-btns" style="margin-top:12px">
        <button class="btn" onclick="addToCart('${p.id}',1,false)">Buy</button>
        <button class="btn outline" onclick="addToCart('${p.id}',50,true)">Bulk 50 ${p.unit}</button>
      </div>
    </article>`;
  }).join("");
}

function applyMarketFilters() {
  const q = (document.getElementById("q")?.value || "").toLowerCase();
  const st = document.getElementById("st")?.value || "";
  const cr = document.getElementById("cr")?.value || "";
  const list = KB.produce.filter(p =>
    (!st || p.state === st) &&
    (!cr || p.crop === cr) &&
    (p.name + p.fpo + p.crop).toLowerCase().includes(q)
  );
  renderProduce(list);
}

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("produceGrid")) return;
  const st = document.getElementById("st");
  const cr = document.getElementById("cr");
  const states = [...new Set(KB.produce.map(p => p.state))];
  const crops = [...new Set(KB.produce.map(p => p.crop))];
  st.innerHTML = `<option value="">All states</option>` + states.map(s => `<option>${s}</option>`).join("");
  cr.innerHTML = `<option value="">All crops</option>` + crops.map(s => `<option>${s}</option>`).join("");
  ["q","st","cr"].forEach(id => document.getElementById(id)?.addEventListener("input", applyMarketFilters));
  applyMarketFilters();
});
