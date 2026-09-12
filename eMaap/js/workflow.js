function fillTypeSelect(el) {
  if (!el) return;
  el.innerHTML = LM.types.map(t => `<option value="${t.id}">${t.name} · fee ${inr(t.fee)} · ${t.periodMonths} mo</option>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const s = session();
  fillTypeSelect(document.getElementById("itype"));
  fillTypeSelect(document.getElementById("atype"));
  const insSel = document.getElementById("ainstr");
  if (insSel && s) {
    const mine = instruments().filter(i => i.userId === s.id);
    insSel.innerHTML = mine.map(i => `<option value="${i.id}">${i.id} · ${typeOf(i.type).name} · ${i.serial}</option>`).join("")
      || `<option value="">Add an instrument first</option>`;
  }
  const asg = document.getElementById("assignTo");
  if (asg) {
    asg.innerHTML = `<optgroup label="LMOs">${LM.officers.map(o => `<option value="${o.id}">${o.name} · ${o.district}</option>`).join("")}</optgroup>
      <optgroup label="GATCs">${LM.gatcs.map(g => `<option value="${g.id}">${g.name}</option>`).join("")}</optgroup>`;
  }

  document.getElementById("instForm")?.addEventListener("submit", e => {
    e.preventDefault();
    if (!requireLogin(["user","admin"])) return;
    const list = instruments();
    const rec = {
      id: "IN-" + (session().state||"IN").slice(0,2).toUpperCase() + "-" + (10000 + list.length),
      userId: session().id,
      type: document.getElementById("itype").value,
      make: document.getElementById("make").value,
      model: document.getElementById("model").value,
      serial: document.getElementById("serial").value,
      cap: document.getElementById("cap").value,
      e: document.getElementById("evalue").value,
      loc: document.getElementById("loc").value,
      year: Number(document.getElementById("year").value),
      status: "Unverified"
    };
    list.push(rec); Store.set("lm_instruments", list);
    toast("Instrument " + rec.id + " added to your repository.");
    location.href = "instruments.html";
  });

  document.getElementById("appForm")?.addEventListener("submit", e => {
    e.preventDefault();
    if (!requireLogin(["user","admin"])) return;
    const iid = document.getElementById("ainstr").value;
    const inst = instruments().find(i => i.id === iid);
    if (!inst) { toast("Register the instrument first."); return; }
    const t = typeOf(inst.type);
    const list = apps();
    const rec = {
      id: "APP-2026-" + String(10000 + list.length).slice(-5),
      userId: session().id,
      instrumentId: iid,
      kind: document.getElementById("akind").value,
      status: "Submitted",
      assigned: null,
      slot: document.getElementById("apref").value || null,
      fee: t.fee,
      paid: true,
      created: new Date().toISOString().slice(0,10),
      remarks: document.getElementById("aremark").value
    };
    list.unshift(rec); Store.set("lm_apps", list);
    toast("Application " + rec.id + " filed. Fee " + inr(t.fee) + " (UPI demo).");
    location.href = "applications.html";
  });

  document.getElementById("schedForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const id = document.getElementById("sapp").value;
    const list = apps();
    const rec = list.find(a => a.id === id);
    if (!rec) return;
    rec.assigned = document.getElementById("assignTo").value;
    rec.slot = document.getElementById("sdate").value + " " + document.getElementById("stime").value;
    rec.status = "Scheduled";
    Store.set("lm_apps", list);
    toast("Allocated to " + officerBy(rec.assigned).name);
    location.href = "queue.html";
  });
});

function renderInstruments() {
  const s = session(); if (!s) return;
  const mine = s.role === "user" ? instruments().filter(i => i.userId === s.id) : instruments();
  const tb = document.getElementById("instBody");
  if (!tb) return;
  tb.innerHTML = mine.map(i => {
    const cert = certs().find(c => c.instrumentId === i.id);
    const due = cert ? daysTo(c.validTill) : null;
    let st = i.status;
    if (cert) st = due < 0 ? "Expired" : due <= 30 ? "Expiring" : "Valid";
    return `<tr>
      <td><a href="instrument.html?id=${encodeURIComponent(i.id)}">${i.id}</a></td>
      <td>${typeOf(i.type).name}</td>
      <td>${i.make} ${i.model}<br><small>${i.serial}</small></td>
      <td>${i.cap} / e=${i.e}</td>
      <td>${i.loc}</td>
      <td>${statusTag(st)}</td>
      <td>${cert ? cert.validTill : "—"}</td>
    </tr>`;
  }).join("") || `<tr><td colspan="7">No instruments yet.</td></tr>`;
}

function renderApps(filterRole) {
  const s = session(); if (!s) return;
  let list = apps();
  if (s.role === "user") list = list.filter(a => a.userId === s.id);
  if (s.role === "lmo") list = list.filter(a => !a.assigned || a.assigned === s.id || a.status === "Submitted");
  if (s.role === "gatc") list = list.filter(a => a.assigned === s.id || a.status === "Submitted");
  const q = (document.getElementById("q")?.value || "").toLowerCase();
  const st = document.getElementById("st")?.value || "";
  list = list.filter(a => (!st || a.status === st) && (a.id + a.instrumentId).toLowerCase().includes(q));
  const tb = document.getElementById("appBody");
  if (!tb) return;
  tb.innerHTML = list.map(a => {
    const inst = instruments().find(i => i.id === a.instrumentId) || {};
    return `<tr>
      <td>${a.id}</td>
      <td>${a.kind}</td>
      <td>${a.instrumentId}<br><small>${typeOf(inst.type).name || ""}</small></td>
      <td>${statusTag(a.status)}</td>
      <td>${a.assigned ? officerBy(a.assigned).name : "Unallocated"}</td>
      <td>${a.slot || "—"}</td>
      <td>${inr(a.fee)}</td>
      <td class="no-print">${a.status==="Submitted" && (s.role==="lmo"||s.role==="admin"||s.role==="gatc")
        ? `<a class="btn small" href="schedule.html?app=${a.id}">Allocate</a>`
        : (a.status==="Scheduled" || a.status==="Under inspection") && (s.role==="lmo"||s.role==="gatc"||s.role==="admin")
        ? `<a class="btn small" href="field.html?app=${a.id}">Inspect</a>`
        : a.status==="Certificate issued" ? `<a href="certificate.html?id=${encodeURIComponent((certs().find(c=>c.appId===a.id)||{}).id||"")}">Certificate</a>` : ""}</td>
    </tr>`;
  }).join("") || `<tr><td colspan="8">No applications.</td></tr>`;
}

function renderQueue() { renderApps(); }

function fillScheduleFromQuery() {
  const app = new URLSearchParams(location.search).get("app");
  const sel = document.getElementById("sapp");
  if (!sel) return;
  const open = apps().filter(a => ["Submitted","Scheduled"].includes(a.status));
  sel.innerHTML = open.map(a => `<option value="${a.id}">${a.id} · ${a.instrumentId}</option>`).join("");
  if (app) sel.value = app;
}
