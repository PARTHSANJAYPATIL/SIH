document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".role").forEach(r => r.addEventListener("click", () => {
    document.querySelectorAll(".role").forEach(x => x.classList.remove("on"));
    r.classList.add("on");
  }));

  document.getElementById("loginForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const pass = document.getElementById("pass").value;
    const roleHint = document.querySelector(".role.on")?.dataset.role;
    const u = users().find(x => x.email.toLowerCase() === email && x.pass === pass);
    if (!u) { toast("Invalid email or password. Try demo accounts."); return; }
    if (roleHint && u.role !== roleHint) { toast("This account is registered as " + u.role.toUpperCase()); }
    Store.set("lm_session", u);
    toast("Namaste, " + u.name);
    location.href = "dashboard.html";
  });

  document.getElementById("regForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const role = document.querySelector(".role.on")?.dataset.role || "user";
    const list = users();
    const rec = {
      id: "u" + Date.now(),
      role,
      name: document.getElementById("rname").value,
      email: document.getElementById("remail").value,
      phone: document.getElementById("rphone").value,
      state: document.getElementById("rstate").value,
      district: document.getElementById("rdist").value,
      gstin: document.getElementById("rgst").value || "—",
      pass: document.getElementById("rpass").value
    };
    list.push(rec);
    Store.set("lm_users", list);
    Store.set("lm_session", rec);
    toast("Profile created. Welcome to eMaap.");
    location.href = "dashboard.html";
  });

  const st = document.getElementById("rstate");
  if (st && !st.options.length) {
    st.innerHTML = LM.states.map(s => `<option>${s}</option>`).join("");
  }
});
