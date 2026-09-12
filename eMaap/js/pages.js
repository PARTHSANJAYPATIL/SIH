function currentApp() {
  const q = new URLSearchParams(location.search).get("app");
  if (q) return apps().find(a => a.id === q);
  return apps().find(a => a.status === "Scheduled" || a.status === "Under inspection") || apps()[0];
}

function renderField() {
  const app = currentApp();
  if (!app) return;
  const inst = instruments().find(i => i.id === app.instrumentId);
  const box = document.getElementById("fieldCard");
  if (!box || !inst) return;
  const t = typeOf(inst.type);
  box.innerHTML = `
    <div class="phone">
      <div class="phone-in">
        <div class="phone-bar">eMaap Field · ${session()?.name || "LMO"}</div>
        <div class="phone-body">
          <span class="tag info">${app.id}</span>
          <h3>${t.name}</h3>
          <p>${inst.make} ${inst.model} · S/N ${inst.serial}</p>
          <p class="sub">${inst.loc} · Cap ${inst.cap} · e=${inst.e}</p>
          <div class="card" style="margin-bottom:10px">
            <b>GPS</b>
            <p>18.5204° N, 73.8567° E · Pune (demo pin)</p>
            <p>Offline-capable form. Syncs when network available.</p>
          </div>
          <form id="inspForm" class="form">
            <label>Zero / no-load</label>
            <select id="zero"><option>Within MPE</option><option>Out of MPE</option></select>
            <label>Span / load test</label>
            <select id="span"><option>Within MPE</option><option>Out of MPE</option></select>
            <label>Repeatability</label>
            <select id="rep"><option>Satisfactory</option><option>Unsatisfactory</option></select>
            <label>Seals / software version</label>
            <input id="seal" placeholder="Seal no. / checksum" value="LM-PNQ-${Math.floor(7000+Math.random()*999)}" />
            <label>Observation</label>
            <textarea id="notes" rows="3" placeholder="Digital observation..."></textarea>
            <label>Site photograph (stored locally)</label>
            <input id="photo" type="file" accept="image/*" capture="environment" />
            <label>Result</label>
            <select id="result"><option>Pass</option><option>Fail</option></select>
            <button class="btn green" type="submit">Lock inspection & stamp</button>
          </form>
        </div>
      </div>
    </div>`;
  document.getElementById("inspForm").addEventListener("submit", submitInspection);
}

function submitInspection(e) {
  e.preventDefault();
  const app = currentApp();
  if (!app) return;
  const result = document.getElementById("result").value;
  const file = document.getElementById("photo").files[0];
  const finish = (photo) => {
    const list = insp();
    list.push({
      appId: app.id, officer: session()?.id || "lmo1", result,
      error: document.getElementById("span").value,
      seal: document.getElementById("seal").value,
      notes: document.getElementById("notes").value,
      zero: document.getElementById("zero").value,
      photo, at: new Date().toISOString()
    });
    Store.set("lm_insp", list);
    const alist = apps();
    const rec = alist.find(a => a.id === app.id);
    rec.status = result === "Pass" ? "Certificate issued" : "Rejected";
    Store.set("lm_apps", alist);
    if (result === "Pass") {
      const inst = instruments().find(i => i.id === app.instrumentId);
      const t = typeOf(inst.type);
      const till = new Date(); till.setMonth(till.getMonth() + t.periodMonths);
      const clist = certs();
      const cert = {
        id: "LM/MH/PUN/2026/" + (8000 + clist.length),
        appId: app.id,
        instrumentId: inst.id,
        issued: new Date().toISOString().slice(0,10),
        validTill: till.toISOString().slice(0,10),
        officer: session()?.id || "lmo1",
        stamp: "PUNE-LM-2026",
        qr: ""
      };
      cert.qr = cert.id;
      clist.unshift(cert);
      Store.set("lm_certs", clist);
      const il = instruments();
      const ir = il.find(x => x.id === inst.id);
      if (ir) ir.status = "Valid";
      Store.set("lm_instruments", il);
      toast("Digital verification certificate generated.");
      location.href = "certificate.html?id=" + encodeURIComponent(cert.id);
    } else {
      toast("Fail recorded. User notified for rectification.");
      location.href = "queue.html";
    }
  };
  if (file) {
    const r = new FileReader();
    r.onload = () => finish(r.result);
    r.readAsDataURL(file);
  } else finish(null);
}

function renderCertificate() {
  const id = new URLSearchParams(location.search).get("id") || (certs()[0] && certs()[0].id);
  const c = certs().find(x => x.id === id) || certs()[0];
  const box = document.getElementById("certBox");
  if (!c || !box) {
    if (box) box.innerHTML = "<p>Certificate not found. Search from the public verify page.</p>";
    return;
  }
  const inst = instruments().find(i => i.id === c.instrumentId) || {};
  const app = apps().find(a => a.id === c.appId) || {};
  const off = officerBy(c.officer);
  const user = users().find(u => u.id === (instruments().find(i => i.id === c.instrumentId)||{}).userId);
  const due = daysTo(c.validTill);
  box.innerHTML = `
    <div class="cert" id="printCert">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
        <div>
          <div class="kicker">Government of India · DoCA</div>
          <h2 style="margin-top:8px">Digital Verification Certificate</h2>
          <p>Issued under the ${LM.act} read with ${LM.rules}</p>
        </div>
        <div class="stamp">VERIFIED<br>${c.stamp}<br>LEGAL<br>METROLOGY</div>
      </div>
      <table style="margin-top:12px">
        <tr><th>Certificate no.</th><td>${c.id}</td><th>Application</th><td>${c.appId}</td></tr>
        <tr><th>Instrument ID</th><td>${c.instrumentId}</td><th>Kind</th><td>${app.kind || "Verification"}</td></tr>
        <tr><th>Type</th><td>${typeOf(inst.type).name || "—"}</td><th>Class / MPE</th><td>${typeOf(inst.type).class || "—"}</td></tr>
        <tr><th>Make / model</th><td>${inst.make || ""} ${inst.model || ""}</td><th>Serial</th><td>${inst.serial || ""}</td></tr>
        <tr><th>Max / e</th><td>${inst.cap || ""} / ${inst.e || ""}</td><th>Location</th><td>${inst.loc || ""}</td></tr>
        <tr><th>User</th><td>${user?.name || "—"}</td><th>GSTIN</th><td>${user?.gstin || "—"}</td></tr>
        <tr><th>Issued</th><td>${c.issued}</td><th>Valid until</th><td><b>${c.validTill}</b> ${due<0?statusTag("Expired"):due<=30?statusTag("Expiring"):statusTag("Valid")}</td></tr>
        <tr><th>Verified by</th><td>${off.name}<br><small>${off.desig || "GATC"} · ${off.district || ""}</small></td><th>Authentication</th><td>QR + SHA demo hash<br><small>${btoa(c.id).slice(0,20)}…</small></td></tr>
      </table>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px">
        <canvas class="qr" id="qrCanvas" width="132" height="132"></canvas>
        <p style="max-width:48ch;font-size:13px;color:#5a6780">Scan to authenticate on eMaap. Any alteration of the certificate without a matching QR payload is invalid. This is a prototype watermark — production would use NIC eSign / Digital Signature Certificate.</p>
      </div>
    </div>
    <div class="actions no-print" style="justify-content:center;margin-top:16px">
      <button class="btn" onclick="window.print()">Print / PDF</button>
      <a class="btn outline" href="search.html?q=${encodeURIComponent(c.id)}">Public verify link</a>
    </div>`;
  drawQR(document.getElementById("qrCanvas"), "https://emaap.gov.in/verify?id=" + c.id);
}

function renderCertList() {
  const s = session();
  let list = certs();
  if (s?.role === "user") {
    const ids = instruments().filter(i => i.userId === s.id).map(i => i.id);
    list = list.filter(c => ids.includes(c.instrumentId));
  }
  const tb = document.getElementById("certBody");
  if (!tb) return;
  tb.innerHTML = list.map(c => `<tr>
    <td><a href="certificate.html?id=${encodeURIComponent(c.id)}">${c.id}</a></td>
    <td>${c.instrumentId}</td>
    <td>${c.issued}</td>
    <td>${c.validTill}</td>
    <td>${daysTo(c.validTill) < 0 ? statusTag("Expired") : daysTo(c.validTill) <= 30 ? statusTag("Expiring") : statusTag("Valid")}</td>
    <td>${officerBy(c.officer).name}</td>
  </tr>`).join("") || `<tr><td colspan="6">No certificates.</td></tr>`;
}

function renderSearch() {
  const q = (new URLSearchParams(location.search).get("q") || document.getElementById("sq")?.value || "").trim().toLowerCase();
  const out = document.getElementById("searchOut");
  if (!out) return;
  if (!q) { out.innerHTML = "<p class='sub'>Enter certificate number, instrument ID or serial.</p>"; return; }
  const c = certs().find(x => x.id.toLowerCase().includes(q) || x.instrumentId.toLowerCase().includes(q));
  const inst = c && instruments().find(i => i.id === c.instrumentId);
  const bySerial = instruments().find(i => (i.serial||"").toLowerCase() === q);
  const hit = c || (bySerial && certs().find(x => x.instrumentId === bySerial.id));
  if (!hit) { out.innerHTML = "<p class='warnbox'>No matching digital certificate. Instrument may be unverified or number mistyped.</p>"; return; }
  out.innerHTML = `<div class="okbox">Authentic eMaap record found.</div>
    <p><a class="btn" href="certificate.html?id=${encodeURIComponent(hit.id)}">Open QR certificate ${hit.id}</a></p>
    <p class="sub">Instrument ${hit.instrumentId} ${inst? "· "+typeOf(inst.type).name:""} · valid till ${hit.validTill}</p>`;
}

function renderAlerts() {
  const s = session();
  const mine = s?.role === "user" ? instruments().filter(i => i.userId === s.id) : instruments();
  const rows = mine.map(i => {
    const c = certs().find(x => x.instrumentId === i.id);
    if (!c) return { i, msg: "Never verified / no digital certificate", level: "warn", due: "—" };
    const d = daysTo(c.validTill);
    if (d < 0) return { i, msg: "Validity lapsed — trading with this instrument is an offence under the Act until re-verified.", level: "bad", due: c.validTill };
    if (d <= 7) return { i, msg: "Critical: re-verification due in " + d + " days", level: "bad", due: c.validTill };
    if (d <= 30) return { i, msg: "Reminder: apply for re-verification (due in " + d + " days)", level: "warn", due: c.validTill };
    return { i, msg: "Valid", level: "ok", due: c.validTill };
  });
  const tb = document.getElementById("alertBody");
  if (!tb) return;
  tb.innerHTML = rows.map(r => `<tr>
    <td>${r.i.id}</td><td>${typeOf(r.i.type).name}</td><td>${r.due}</td>
    <td>${statusTag(r.level==="ok"?"Valid":r.level==="warn"?"Expiring":"Expired")}</td>
    <td>${r.msg}</td>
    <td>${r.level!=="ok"?`<a class="btn small" href="apply.html">Renew</a>`:""}</td>
  </tr>`).join("");
}

function renderDashboard() {
  const s = session(); if (!document.getElementById("kpiBox")) return;
  const allA = apps();
  const pend = allA.filter(a => !["Certificate issued","Rejected"].includes(a.status)).length;
  const expiring = instruments().filter(i => {
    const c = certs().find(x => x.instrumentId === i.id);
    return c && daysTo(c.validTill) <= 30;
  }).length;
  document.getElementById("kpiBox").innerHTML = `
    <div class="kpi"><b>${instruments().length}</b><span>Instruments in repository</span></div>
    <div class="kpi"><b>${allA.length}</b><span>Applications (FY demo)</span></div>
    <div class="kpi"><b>${pend}</b><span>Pendency (open workflow)</span></div>
    <div class="kpi"><b>${certs().length}</b><span>Digital certificates</span></div>
    <div class="kpi"><b>${expiring}</b><span>Expiring in 30 days</span></div>
    <div class="kpi"><b>${insp().length}</b><span>Field inspections logged</span></div>
    <div class="kpi"><b>${users().length}</b><span>Registered stakeholders</span></div>
    <div class="kpi"><b>${LM.states.length}</b><span>States in directory</span></div>`;
  const tb = document.getElementById("recentBody");
  if (tb) tb.innerHTML = allA.slice(0,8).map(a => `<tr>
    <td>${a.id}</td><td>${a.kind}</td><td>${a.instrumentId}</td><td>${statusTag(a.status)}</td><td>${a.created}</td>
  </tr>`).join("");
}

function renderReports() {
  const tb = document.getElementById("misBody");
  if (!tb) return;
  const by = {};
  apps().forEach(a => { by[a.status] = (by[a.status]||0)+1; });
  tb.innerHTML = Object.entries(by).map(([k,v]) => `<tr><td>${k}</td><td>${v}</td><td>${Math.round(v*100/apps().length)}%</td></tr>`).join("");
}

function exportCSV() {
  const rows = [["Application","Kind","Instrument","Status","Fee","Created"]].concat(
    apps().map(a => [a.id,a.kind,a.instrumentId,a.status,a.fee,a.created])
  );
  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "emaap-mis.csv";
  a.click();
  toast("MIS CSV downloaded.");
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("kpiBox")) renderDashboard();
  if (document.getElementById("instBody")) renderInstruments();
  if (document.getElementById("appBody")) renderApps();
  if (document.getElementById("sapp")) fillScheduleFromQuery();
  if (document.getElementById("fieldCard")) renderField();
  if (document.getElementById("certBox")) renderCertificate();
  if (document.getElementById("certBody")) renderCertList();
  if (document.getElementById("alertBody")) renderAlerts();
  if (document.getElementById("misBody")) renderReports();
  if (document.getElementById("searchOut")) {
    renderSearch();
    document.getElementById("searchForm")?.addEventListener("submit", e => { e.preventDefault(); renderSearch(); });
  }
  document.getElementById("exportBtn")?.addEventListener("click", exportCSV);
  ["q","st"].forEach(id => document.getElementById(id)?.addEventListener("input", renderApps));
});
