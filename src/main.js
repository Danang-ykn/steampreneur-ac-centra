import "./style.css";

const STORAGE_KEY = "accentra.devices.v1";
const SELECTED_KEY = "accentra.selected.v1";
const TARIF_RP_PER_KWH = 1500;

/* ---------- store ---------- */
function loadDevices() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}
function saveDevices(d) { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); }
function loadSelectedId() { return localStorage.getItem(SELECTED_KEY); }
function saveSelectedId(id) {
  if (id) localStorage.setItem(SELECTED_KEY, id);
  else localStorage.removeItem(SELECTED_KEY);
}

let devices = loadDevices();
let selectedId = loadSelectedId();
let searchKeyword = "";
let statusFilter = "ALL"; // ALL | ON | OFF
const DEFAULT_SORT = "DEFAULT";
let sortBy = DEFAULT_SORT;
// Staged (unconfirmed) values edited inside the filter popover
let draftStatus = statusFilter;
let draftSort = sortBy;

const SORTS = [
  { id: "DEFAULT", label: "Default order" },
  { id: "ID_ASC", label: "ID A–Z" },
  { id: "ID_DESC", label: "ID Z–A" },
  { id: "ROOM_ASC", label: "Room A–Z" },
  { id: "ON_FIRST", label: "On first" },
  { id: "NEWEST", label: "Newest first" },
];
const sortLabel = (id) => SORTS.find((s) => s.id === id)?.label ?? id;

const getSelected = () => devices.find((d) => d.id === selectedId) || null;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- helpers ---------- */
function formatDurasi(hours) {
  if (!isFinite(hours) || hours < 0) return "-";
  const totalDetik = Math.round(hours * 3600);
  if (totalDetik < 60) return `${Math.max(totalDetik, 1)} dtk`;
  const m = Math.round(totalDetik / 60);
  const j = Math.floor(m / 60), s = m % 60;
  if (j === 0) return `${s} mnt`;
  if (s === 0) return `${j} jam`;
  return `${j} jam ${s} mnt`;
}
function formatTanggal(ts) {
  try { return new Date(ts).toLocaleString("id-ID", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }); }
  catch { return String(ts); }
}
function formatFull(ts) {
  try { return new Date(ts).toLocaleString("id-ID"); } catch { return String(ts); }
}
function calcRekap(d) {
  let totalJam = 0, totalEnergi = 0, totalBiaya = 0;
  for (const h of d.history || []) {
    if (typeof h.durationH !== "number" || h.durationH <= 0) continue;
    const e = h.energyKwh ?? d.powerKw * h.durationH;
    totalJam += h.durationH; totalEnergi += e;
    totalBiaya += h.costRp ?? e * TARIF_RP_PER_KWH;
  }
  return { totalJam, totalEnergi, totalBiaya };
}
function matchesSearch(d, kw) {
  return kw === "" || d.id.toLowerCase().includes(kw) || (d.room || "").toLowerCase().includes(kw);
}
function getVisibleDevices() {
  const kw = searchKeyword.trim().toLowerCase();
  const withIdx = [];
  devices.forEach((d, idx) => {
    const okKw = matchesSearch(d, kw);
    const okSt = statusFilter === "ALL" || d.status === statusFilter;
    if (okKw && okSt) withIdx.push({ d, idx });
  });
  const cmp = {
    ID_ASC: (a, b) => a.d.id.localeCompare(b.d.id),
    ID_DESC: (a, b) => b.d.id.localeCompare(a.d.id),
    ROOM_ASC: (a, b) => (a.d.room || "").localeCompare(b.d.room || "") || a.d.id.localeCompare(b.d.id),
    ON_FIRST: (a, b) => Number(b.d.status === "ON") - Number(a.d.status === "ON") || a.idx - b.idx,
    NEWEST: (a, b) => b.idx - a.idx,
    DEFAULT: (a, b) => a.idx - b.idx,
  }[sortBy] || ((a, b) => a.idx - b.idx);
  withIdx.sort(cmp);
  return withIdx.map((x) => x.d);
}
function countForStatus(status) {
  const kw = searchKeyword.trim().toLowerCase();
  return devices.filter((d) => matchesSearch(d, kw) && (status === "ALL" || d.status === status)).length;
}
function isFilterActive() {
  return statusFilter !== "ALL" || sortBy !== DEFAULT_SORT;
}
function activeFilterCount() {
  return (statusFilter !== "ALL" ? 1 : 0) + (sortBy !== DEFAULT_SORT ? 1 : 0);
}
function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}
function animateIn() {
  if (!window.gsap) return;
  gsap.fromTo(".anim-in",
    { y: 14, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power3.out", overwrite: true, clearProps: "transform" });
}
function toast(msg) {
  document.querySelector(".toast")?.remove();
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<i data-lucide="check"></i>${esc(msg)}`;
  document.body.appendChild(el);
  refreshIcons();
  if (window.gsap) {
    gsap.fromTo(el, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" });
    gsap.to(el, { y: 8, opacity: 0, delay: 2.2, duration: 0.3, onComplete: () => el.remove() });
  } else setTimeout(() => el.remove(), 2200);
}

/* ---------- nav ---------- */
function renderNav() {
  const nav = document.querySelector("#device-nav");
  if (!nav) return;

  const visible = getVisibleDevices();

  // Filter button badge reflects committed (confirmed) filter state
  const toggle = document.querySelector("#filter-toggle");
  const badge = document.querySelector("#filter-badge");
  if (toggle && badge) {
    const n = activeFilterCount();
    toggle.classList.toggle("has-active", isFilterActive());
    badge.hidden = n === 0;
    badge.textContent = n;
  }
  document.querySelector("#list-total").textContent =
    visible.length === devices.length ? `${devices.length} unit` : `${visible.length} of ${devices.length}`;
  document.querySelector("#filter-reset")?.toggleAttribute("hidden", searchKeyword.trim() === "");

  if (devices.length === 0) {
    nav.innerHTML = `<div class="nav-empty"><i data-lucide="air-vent"></i><br/>Belum ada perangkat.<br/>Tambahkan unit pertama Anda.</div>`;
    refreshIcons(); return;
  }
  if (visible.length === 0) {
    const isSearching = searchKeyword.trim() !== "";
    const filtering = isFilterActive();
    nav.innerHTML = `<div class="nav-empty"><i data-lucide="search-x"></i><br/>${isSearching ? "Tidak ditemukan." : filtering ? "No units match." : `No ${esc(statusFilter)} units.`}<br/>${isSearching ? "Coba kata kunci lain." : filtering ? "Adjust filter or search." : "Try another filter."}</div>`;
    refreshIcons(); return;
  }
  nav.innerHTML = visible.map((d) => `
    <div class="nav-item${d.id === selectedId ? " active" : ""}">
      <button class="nav-device" data-id="${esc(d.id)}" data-status="${d.status}">
        <span class="device-dot" aria-hidden="true"></span>
        <span class="nav-main">
          <span class="nav-label" style="display:block">${esc(d.id)}</span>
          <span class="nav-sub" style="display:block">${esc(d.room || "—")}</span>
        </span>
        <span class="nav-meta">${esc(Number(d.powerKw).toFixed(1))}kW</span>
      </button>
      <button class="nav-delete" data-del="${esc(d.id)}" title="Hapus" aria-label="Hapus ${esc(d.id)}">
        <i data-lucide="trash-2"></i>
      </button>
    </div>`).join("");

  nav.querySelectorAll(".nav-device").forEach((b) => b.addEventListener("click", () => {
    selectedId = b.dataset.id; saveSelectedId(selectedId);
    closeNav();
    renderNav(); renderMain();
  }));
  nav.querySelectorAll(".nav-delete").forEach((b) => b.addEventListener("click", (e) => {
    e.stopPropagation(); deleteDevice(b.dataset.del);
  }));
  refreshIcons();
}

/* ---------- filter popover ---------- */
function renderFilterPop() {
  const pop = document.querySelector("#filter-pop");
  if (!pop) return;
  pop.querySelector('[data-fstatus="ALL"] .count').textContent = countForStatus("ALL");
  pop.querySelector('[data-fstatus="ON"] .count').textContent = countForStatus("ON");
  pop.querySelector('[data-fstatus="OFF"] .count').textContent = countForStatus("OFF");
  pop.querySelectorAll("[data-fstatus]").forEach((b) => {
    const sel = b.dataset.fstatus === draftStatus;
    b.classList.toggle("selected", sel);
    b.setAttribute("aria-checked", sel);
  });
  const list = pop.querySelector("#fp-sort-list");
  if (list) {
    list.innerHTML = SORTS.map((s) => `
      <button class="fp-sort-opt${s.id === draftSort ? " selected" : ""}" data-fsort="${s.id}" role="radio" aria-checked="${s.id === draftSort}">
        <i data-lucide="check" class="fp-check"></i>${esc(s.label)}
      </button>`).join("");
    list.querySelectorAll("[data-fsort]").forEach((b) => b.addEventListener("click", () => {
      draftSort = b.dataset.fsort;
      renderFilterPop();
    }));
  }
  const preview = countForStatus(draftStatus);
  const apply = document.querySelector("#filter-apply");
  if (apply) apply.textContent = `Show ${preview} unit${preview === 1 ? "" : "s"}`;
  refreshIcons();
}
function isFilterPopOpen() {
  return !document.querySelector("#filter-pop")?.hasAttribute("hidden");
}
function openFilterPop() {
  const pop = document.querySelector("#filter-pop");
  const toggle = document.querySelector("#filter-toggle");
  if (!pop || !toggle) return;
  draftStatus = statusFilter;
  draftSort = sortBy;
  renderFilterPop();
  pop.hidden = false;
  toggle.setAttribute("aria-expanded", "true");
  if (window.gsap) gsap.fromTo(pop, { y: -6, opacity: 0 }, { y: 0, opacity: 1, duration: 0.18, ease: "power2.out" });
  document.addEventListener("pointerdown", filterOutsideClose);
  document.addEventListener("keydown", filterEscClose);
}
function closeFilterPop() {
  const pop = document.querySelector("#filter-pop");
  const toggle = document.querySelector("#filter-toggle");
  if (!pop || !toggle) return;
  pop.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
  document.removeEventListener("pointerdown", filterOutsideClose);
  document.removeEventListener("keydown", filterEscClose);
}
function toggleFilterPop() {
  if (isFilterPopOpen()) closeFilterPop();
  else openFilterPop();
}
function filterOutsideClose(e) {
  const pop = document.querySelector("#filter-pop");
  const toggle = document.querySelector("#filter-toggle");
  if (!pop || pop.hasAttribute("hidden")) return;
  if (pop.contains(e.target) || toggle?.contains(e.target)) return;
  closeFilterPop();
}
function filterEscClose(e) {
  if (e.key === "Escape" && isFilterPopOpen()) {
    e.stopPropagation();
    closeFilterPop();
  }
}

/* ---------- main ---------- */
function renderMain(animate = true) {
  const main = document.querySelector("#main-content");
  if (!main) return;

  if (devices.length === 0) {
    main.innerHTML = `
      <div class="welcome-wrap">
        <section class="welcome anim-in">
          <div class="welcome-mark"><i data-lucide="air-vent"></i></div>
          <div class="welcome-eyebrow">AC-Centra · Monitor</div>
          <h1>Start with your<br/>first unit.</h1>
          <p>Track runtime, energy and cost per AC unit. Everything is stored locally in your browser — no setup needed.</p>
          <button class="add-device" id="welcome-add" style="max-width:240px;margin:0 auto"><i data-lucide="plus"></i><span>Add device</span></button>
        </section>
      </div>`;
    refreshIcons(); animateIn();
    document.querySelector("#welcome-add")?.addEventListener("click", showAddModal);
    return;
  }

  const d = getSelected();
  if (!d) {
    selectedId = devices[0].id; saveSelectedId(selectedId);
    renderNav(); return renderMain();
  }

  const rekap = calcRekap(d);
  const isOn = d.status === "ON";
  const hist = [...(d.history || [])].reverse();
  const histCount = (d.history || []).length;

  const historyRows = hist.length ? hist.map((h, i) => `
    <div class="hist-row">
      <div class="hist-idx mono">${String(hist.length - i).padStart(2, "0")}</div>
      <div class="hist-main">
        <div class="hist-time">${esc(formatTanggal(h.start))} <span style="color:var(--faint)">→</span> ${esc(formatTanggal(h.end))}</div>
        <div class="hist-sub"><i data-lucide="clock"></i>Menyala selama ${esc(formatDurasi(h.durationH))}</div>
      </div>
      <div class="hist-right">
        <div class="hist-cost">Rp${esc(Math.round(h.costRp).toLocaleString("id-ID"))}</div>
        <div class="hist-kwh">${esc(Number(h.energyKwh).toFixed(2))} kWh</div>
      </div>
    </div>`).join("")
    : `<div class="hist-empty"><i data-lucide="history"></i><br/>Belum ada riwayat.<br/>Nyalakan lalu matikan unit untuk mencatat sesi.</div>`;

  main.innerHTML = `
  <div class="main-inner">
    <div class="anim-in">
      <div class="crumb"><span>AC-Centra</span><i data-lucide="chevron-right"></i><span class="crumb-live">${esc(d.room || "Unit")}</span></div>
      <header class="page-heading">
        <div>
          <h1 class="page-title mono">${esc(d.id)}</h1>
          <div class="page-meta">
            <span style="display:inline-flex;align-items:center;gap:6px"><i data-lucide="building-2" style="width:14px;height:14px"></i>${esc(d.room || "—")}</span>
            <span class="sep">·</span><span class="mono">${esc(d.powerKw)} kW</span>
            <span class="sep">·</span><span>${histCount} sesi</span>
          </div>
        </div>
        <span class="pill ${isOn ? "pill-on" : "pill-off"}"><span class="pdot"></span>${d.status === "ON" ? "Running" : "Standby"}</span>
      </header>
    </div>

    <section class="status-panel anim-in ${isOn ? "is-on" : ""}">
      <div class="status-left">
        <div class="status-orb"><i data-lucide="${isOn ? "activity" : "power"}"></i></div>
        <div>
          <div class="status-name">${isOn ? "Unit running" : "Unit standby"}</div>
          <div class="status-sub ${isOn ? "mono" : ""}">${isOn ? `Since ${esc(formatFull(d.currentStart))}` : "Ready to start a new session"}</div>
        </div>
      </div>
      <button class="power-btn ${isOn ? "power-off" : "power-on"}" id="btn-toggle">
        <i data-lucide="power"></i>${isOn ? "Turn off" : "Turn on"}
      </button>
    </section>

    <section class="stat-grid">
      <div class="stat-card anim-in">
        <div class="stat-top"><span class="stat-label">Duration</span><span class="stat-icon"><i data-lucide="clock"></i></span></div>
        <div class="stat-value">${esc(formatDurasi(rekap.totalJam))}</div>
        <div class="stat-sub">Total runtime</div>
      </div>
      <div class="stat-card anim-in">
        <div class="stat-top"><span class="stat-label">Energy</span><span class="stat-icon"><i data-lucide="zap"></i></span></div>
        <div class="stat-value">${esc(rekap.totalEnergi.toFixed(2))} <small>kWh</small></div>
        <div class="stat-sub">Estimated consumption</div>
      </div>
      <div class="stat-card anim-in">
        <div class="stat-top"><span class="stat-label">Cost</span><span class="stat-icon"><i data-lucide="wallet"></i></span></div>
        <div class="stat-value" style="font-size:24px">Rp${esc(Math.round(rekap.totalBiaya).toLocaleString("id-ID"))}</div>
        <div class="stat-sub">@ Rp${TARIF_RP_PER_KWH.toLocaleString("id-ID")} / kWh</div>
      </div>
    </section>
    <p class="hint anim-in"><i data-lucide="info"></i>Estimasi berdasarkan daya nominal, bukan pengukuran langsung.</p>

    <section class="card anim-in">
      <div class="card-head">
        <h3><i data-lucide="history"></i>Session history</h3>
        <span class="card-count">${histCount} sesi</span>
      </div>
      <div class="hist-list">${historyRows}</div>
    </section>
  </div>`;

  refreshIcons(); if (animate) animateIn();
  document.querySelector("#btn-toggle")?.addEventListener("click", () => toggleStatus(d.id));
}

/* ---------- actions ---------- */
function toggleStatus(id) {
  const d = devices.find((x) => x.id === id);
  if (!d) return;
  const now = Date.now();
  const hadFocus = document.activeElement?.id === "btn-toggle";
  if (d.status === "OFF") {
    d.status = "ON"; d.currentStart = now;
    toast(`${d.id} dinyalakan`);
  } else {
    if (d.currentStart == null) d.status = "OFF";
    else {
      const durationH = (now - d.currentStart) / 3600000;
      if (durationH <= 0) { alert("Periode tidak valid."); return; }
      const energyKwh = d.powerKw * durationH;
      d.history = d.history || [];
      d.history.push({ start: d.currentStart, end: now, durationH, energyKwh, costRp: energyKwh * TARIF_RP_PER_KWH });
      d.status = "OFF"; d.currentStart = null;
      toast(`Sesi ${d.id} tersimpan`);
    }
  }
  saveDevices(devices); renderNav(); renderMain(false);
  if (hadFocus) document.querySelector("#btn-toggle")?.focus({ preventScroll: true });
}
function deleteDevice(id) {
  if (!confirm(`Hapus device ${id}?`)) return;
  devices = devices.filter((x) => x.id !== id);
  if (selectedId === id) selectedId = devices[0]?.id ?? null;
  saveDevices(devices); saveSelectedId(selectedId);
  renderNav(); renderMain(); toast("Device dihapus");
}
function csvCell(v) {
  const s = String(v ?? "");
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
function exportCSV() {
  const visible = getVisibleDevices();
  if (!visible.length) { alert("Tidak ada data untuk diunduh."); return; }
  const lines = [["ID", "Ruangan", "Daya (kW)", "Status", "Estimasi Biaya (Rp)"].join(",")];
  for (const d of visible) {
    const r = calcRekap(d);
    lines.push([d.id, d.room || "", String(d.powerKw ?? ""), d.status, String(Math.round(r.totalBiaya))].map(csvCell).join(","));
  }
  const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "accentra-perangkat.csv";
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url); toast("CSV diunduh");
}

/* ---------- modal ---------- */
function showAddModal() {
  closeModal();
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay"; overlay.id = "add-modal";
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="Tambah device">
      <div class="modal-head">
        <div><h3>New device</h3><p>Register a new AC unit to monitor.</p></div>
        <button class="modal-x" id="add-cancel" aria-label="Tutup"><i data-lucide="x"></i></button>
      </div>
      <form id="add-form" novalidate>
        <div class="field"><span>Device ID</span>
          <input name="id" placeholder="AC-001" autocomplete="off" />
        </div>
        <div class="field"><span>Room</span>
          <input name="room" placeholder="Lab Elektronika" autocomplete="off" />
        </div>
        <div class="field"><span>Power (kW)</span>
          <input name="powerKw" type="number" min="0.01" step="0.01" inputmode="decimal" placeholder="0.7" />
          <span class="field-hint">Daya listrik nominal AC dalam kW, bukan PK / BTU.</span>
        </div>
        <div class="form-error" id="add-error" role="alert"></div>
        <div class="form-actions">
          <button type="button" class="btn-ghost" id="add-cancel-2">Cancel</button>
          <button type="submit" class="btn-primary">Save device</button>
        </div>
      </form>
    </div>`;
  document.body.appendChild(overlay);
  refreshIcons();
  if (window.gsap) gsap.fromTo(".modal", { y: 18, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" });

  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
  document.querySelector("#add-cancel")?.addEventListener("click", closeModal);
  document.querySelector("#add-cancel-2")?.addEventListener("click", closeModal);
  document.addEventListener("keydown", escClose);
  overlay.querySelector("input")?.focus();

  document.querySelector("#add-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const id = String(fd.get("id") || "").trim();
    const room = String(fd.get("room") || "").trim();
    const powerKw = Number(String(fd.get("powerKw") || "").trim());
    const errEl = document.querySelector("#add-error");
    const fail = (m) => { errEl.textContent = m; };
    if (!id) return fail("ID wajib diisi.");
    if (!room) return fail("Nama ruangan wajib diisi.");
    if (devices.some((x) => x.id.toLowerCase() === id.toLowerCase())) return fail(`ID "${id}" sudah dipakai.`);
    if (!Number.isFinite(powerKw) || powerKw <= 0) return fail("Daya harus angka > 0 kW.");
    devices.push({ id, room, powerKw, status: "OFF", history: [], currentStart: null });
    selectedId = id;
    saveDevices(devices); saveSelectedId(selectedId);
    closeModal(); renderNav(); renderMain(); toast(`${id} ditambahkan`);
  });
}
function escClose(e) { if (e.key === "Escape") closeModal(); }
function closeModal() {
  document.querySelector("#add-modal")?.remove();
  document.removeEventListener("keydown", escClose);
}

/* ---------- shell ---------- */
document.querySelector("#app").innerHTML = `
  <div class="app-shell">
    <aside class="sidebar" id="sidebar">
      <div class="brand-row">
        <div class="brand-mark"><i data-lucide="air-vent"></i></div>
        <div><div class="brand-name">AC-Centra</div><div class="brand-sub">Monitor</div></div>
        <span class="brand-ver">v1.0</span>
        <button class="modal-x" id="nav-close" aria-label="Close menu"><i data-lucide="x"></i></button>
      </div>
      <div class="side-scroll">
        <div class="side-section">
          <div class="search-box">
            <i data-lucide="search"></i>
            <input type="search" id="device-search" placeholder="Search ID or room…" autocomplete="off" aria-label="Cari perangkat" />
          </div>
          <div class="filter-wrap">
            <button class="filter-toggle" id="filter-toggle" aria-haspopup="dialog" aria-expanded="false">
              <i data-lucide="sliders-horizontal"></i><span>Filter</span>
              <span class="filter-badge" id="filter-badge" hidden>0</span>
              <i data-lucide="chevron-down" class="caret"></i>
            </button>
            <div class="filter-pop" id="filter-pop" role="dialog" aria-label="Filter devices" hidden>
              <div class="fp-section">
                <div class="fp-title">Status</div>
                <div class="fp-status-row" role="radiogroup" aria-label="Device status">
                  <button class="fp-opt" data-fstatus="ALL" role="radio">All <span class="count">0</span></button>
                  <button class="fp-opt" data-fstatus="ON" role="radio">On <span class="count">0</span></button>
                  <button class="fp-opt" data-fstatus="OFF" role="radio">Off <span class="count">0</span></button>
                </div>
              </div>
              <div class="fp-section">
                <div class="fp-title">Sort by</div>
                <div class="fp-sort-list" id="fp-sort-list" role="radiogroup" aria-label="Sort devices"></div>
              </div>
              <div class="fp-footer">
                <button class="btn-ghost" id="filter-reset-pop">Reset</button>
                <button class="btn-primary" id="filter-apply">Show 0 units</button>
              </div>
            </div>
          </div>
        </div>
        <div class="list-head"><span>Devices</span>
          <span style="display:flex;align-items:center;gap:10px">
            <span id="list-total" class="mono" style="font-size:11px;color:var(--faint)">0 unit</span>
            <button class="filter-reset" id="filter-reset" hidden><i data-lucide="rotate-ccw"></i>Reset</button>
          </span>
        </div>
        <nav class="device-nav" id="device-nav"></nav>
      </div>
      <div class="sidebar-bottom">
        <button class="add-device" id="add-device"><i data-lucide="plus"></i><span>Add device</span></button>
        <div class="bottom-row">
          <button class="csv-btn" id="download-csv"><i data-lucide="download"></i><span>Export CSV</span></button>
          <button class="collapse-btn" id="collapse-btn" aria-label="Collapse sidebar"><i data-lucide="panel-left-close"></i></button>
        </div>
      </div>
    </aside>
    <header class="topbar">
      <button class="menu-btn" id="menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="sidebar"><i data-lucide="menu"></i></button>
      <span class="topbar-brand"><span class="topbar-mark"><i data-lucide="air-vent"></i></span>AC-Centra</span>
    </header>
    <div id="nav-backdrop" aria-hidden="true"></div>
    <main class="main-content" id="main-content"></main>
  </div>`;

document.querySelector("#add-device")?.addEventListener("click", () => { closeNav(); showAddModal(); });
document.querySelector("#download-csv")?.addEventListener("click", () => { exportCSV(); closeNav(); });
document.querySelector("#device-search")?.addEventListener("input", (e) => {
  searchKeyword = e.target.value;
  renderNav();
  if (isFilterPopOpen()) renderFilterPop();
});
document.querySelector("#filter-toggle")?.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleFilterPop();
});
document.querySelectorAll("[data-fstatus]").forEach((btn) => btn.addEventListener("click", () => {
  draftStatus = btn.dataset.fstatus;
  renderFilterPop();
}));
document.querySelector("#filter-reset-pop")?.addEventListener("click", () => {
  draftStatus = "ALL";
  draftSort = DEFAULT_SORT;
  renderFilterPop();
});
document.querySelector("#filter-apply")?.addEventListener("click", () => {
  statusFilter = draftStatus;
  sortBy = draftSort;
  closeFilterPop();
  renderNav();
});
document.querySelector("#filter-reset")?.addEventListener("click", () => {
  // Reset only clears the search and keeps the active tab (consistent with
  // the reset button being hidden on ON/OFF tabs unless searching).
  searchKeyword = "";
  document.querySelector("#device-search").value = "";
  renderNav();
});
document.querySelector("#collapse-btn")?.addEventListener("click", () => {
  document.querySelector("#sidebar")?.classList.toggle("collapsed");
  document.body.classList.toggle("sidebar-collapsed");
});

/* ---------- mobile drawer (hamburger) ---------- */
function openNav() {
  document.body.classList.add("nav-open");
  document.querySelector("#menu-btn")?.setAttribute("aria-expanded", "true");
}
function closeNav() {
  if (!document.body.classList.contains("nav-open")) return;
  document.body.classList.remove("nav-open");
  document.querySelector("#menu-btn")?.setAttribute("aria-expanded", "false");
}
function navEscClose(e) {
  if (e.key !== "Escape" || !document.body.classList.contains("nav-open")) return;
  if (document.querySelector("#add-modal") || isFilterPopOpen()) return;
  closeNav();
}
document.querySelector("#menu-btn")?.addEventListener("click", openNav);
document.querySelector("#nav-close")?.addEventListener("click", closeNav);
document.querySelector("#nav-backdrop")?.addEventListener("click", closeNav);
document.addEventListener("keydown", navEscClose);
window.matchMedia("(max-width: 860px)").addEventListener("change", (e) => {
  if (!e.matches) closeNav();
  else {
    // Drawer always opens fully expanded on small screens
    document.body.classList.remove("sidebar-collapsed");
    document.querySelector("#sidebar")?.classList.remove("collapsed");
  }
});

refreshIcons();
renderNav();
renderMain();
