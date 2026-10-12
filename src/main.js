import "./style.css";

const STORAGE_KEY = "accentra.devices.v1";
const SELECTED_KEY = "accentra.selected.v1";
const TARIF_RP_PER_KWH = 1500;

function loadDevices() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveDevices(devices) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(devices));
}

function loadSelectedId() {
  return localStorage.getItem(SELECTED_KEY);
}

function saveSelectedId(id) {
  if (id) localStorage.setItem(SELECTED_KEY, id);
  else localStorage.removeItem(SELECTED_KEY);
}


let devices = loadDevices();
let selectedId = loadSelectedId();
let searchKeyword = "";
let statusFilter = "ALL"; // ALL | ON | OFF

function getSelected() {
  return devices.find((d) => d.id === selectedId) || null;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

function formatDurasi(hours) {
  if (!isFinite(hours) || hours < 0) return "-";
  const totalMenit = Math.round(hours * 60);
  const jam = Math.floor(totalMenit / 60);
  const menit = totalMenit % 60;
  if (jam === 0) return `${menit} mnt`;
  if (menit === 0) return `${jam} jam`;
  return `${jam} jam ${menit} mnt`;
}

function formatTanggal(ts) {
  try {
    return new Date(ts).toLocaleString("id-ID");
  } catch {
    return String(ts);
  }
}

// ---------- Render ----------

function renderNav() {
  const nav = document.querySelector("#device-nav");
  if (!nav) return;

  const keyword = searchKeyword.trim().toLowerCase();
  document
    .querySelector("#filter-reset")
    ?.toggleAttribute("hidden", keyword === "" && statusFilter === "ALL");

  if (devices.length === 0) {
    nav.innerHTML = "";
    return;
  }

  const visible = devices.filter((d) => {
    const matchKeyword =
      keyword === "" ||
      d.id.toLowerCase().includes(keyword) ||
      (d.room || "").toLowerCase().includes(keyword);
    const matchStatus = statusFilter === "ALL" || d.status === statusFilter;
    return matchKeyword && matchStatus;
  });

  if (visible.length === 0) {
    nav.innerHTML = `<div class="nav-empty">Data tidak ditemukan</div>`;
    return;
  }

  nav.innerHTML = visible
    .map(
      (d) => `
    <div class="nav-item${d.id === selectedId ? " active" : ""}">
      <button class="nav-device" data-id="${escapeHtml(d.id)}" data-status="${d.status}">
        <span class="device-dot" aria-hidden="true"></span>
        <span class="nav-label">${escapeHtml(d.id)}</span>
      </button>
      <button class="nav-delete" data-del="${escapeHtml(d.id)}" title="Hapus" aria-label="Hapus ${escapeHtml(d.id)}">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
        </svg>
      </button>
    </div>`
    )
    .join("");

  nav.querySelectorAll(".nav-device").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedId = btn.dataset.id;
      saveSelectedId(selectedId);
      renderNav();
      renderMain();
    });
  });

  nav.querySelectorAll(".nav-delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteDevice(btn.dataset.del);
    });
  });
}

function calcRekap(device) {
  let totalJam = 0;
  let totalEnergi = 0;
  let totalBiaya = 0;
  for (const h of device.history || []) {
    if (typeof h.durationH !== "number" || h.durationH <= 0) continue;
    totalJam += h.durationH;
    totalEnergi += h.energyKwh ?? device.powerKw * h.durationH;
    totalBiaya += h.costRp ?? (h.energyKwh ?? device.powerKw * h.durationH) * TARIF_RP_PER_KWH;
  }
  return { totalJam, totalEnergi, totalBiaya };
}

function renderMain() {
  const main = document.querySelector("#main-content");
  if (!main) return;

  if (devices.length === 0) {
    main.innerHTML = `
      <section class="welcome">
        <div class="eyebrow">AC-CENTRA</div>
        <h1 class="welcome-title">Welcome</h1>
        <p class="welcome-sub">No devices yet.</p>
      </section>`;
    return;
  }

  const d = getSelected();
  if (!d) {
    selectedId = devices[0].id;
    saveSelectedId(selectedId);
    renderNav();
    return renderMain();
  }

  const rekap = calcRekap(d);
  const ongoing = d.currentStart ? formatTanggal(d.currentStart) : "-";
  const roomPart = d.room ? `${escapeHtml(d.room)} · ` : "";
  const historyRows = (d.history || []).length
    ? [...(d.history || [])]
        .reverse()
        .map(
          (h) => `
      <div class="hist-row">
        <div>
          <div class="hist-time">${escapeHtml(formatTanggal(h.start))} - ${escapeHtml(formatTanggal(h.end))}</div>
          <div class="hist-sub">${escapeHtml(formatDurasi(h.durationH))} · ${escapeHtml(Number(h.energyKwh).toFixed(2))} kWh · Rp${escapeHtml(Number(h.costRp).toLocaleString("id-ID"))}</div>
        </div>
      </div>`
        )
        .join("")
    : `<div class="hist-empty">Belum ada riwayat.</div>`;

  main.innerHTML = `
    <header class="page-heading">
      <div>
        <div class="eyebrow">AC-CENTRA</div>
        <h1>${escapeHtml(d.id)}</h1>
        <p class="subtitle">${roomPart}${escapeHtml(d.powerKw)} kW</p>
      </div>
      <span class="status-badge status-${d.status}">${d.status}</span>
    </header>

    <section class="status-hero hero-${d.status}">
      <div class="hero-left">
        <span class="hero-dot" aria-hidden="true"></span>
        <div>
          <div class="hero-status">${d.status}</div>
          <div class="hero-sub">${d.status === "ON" ? `On since ${escapeHtml(ongoing)}` : "Standby"}</div>
        </div>
      </div>
      <button class="power-btn power-${d.status === "ON" ? "off" : "on"}" id="btn-toggle">
        ${d.status === "ON" ? "Matikan" : "Nyalakan"}
      </button>
    </section>

    <section class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">Duration</div>
        <div class="stat-value">${escapeHtml(formatDurasi(rekap.totalJam))}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Energy</div>
        <div class="stat-value">${escapeHtml(rekap.totalEnergi.toFixed(2))} <small>kWh</small></div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Cost</div>
        <div class="stat-value">Rp${escapeHtml(Math.round(rekap.totalBiaya).toLocaleString("id-ID"))}</div>
      </div>
    </section>
    <p class="hint">Estimasi, bukan pengukuran.</p>

    <section class="card history-card">
      <h3>History</h3>
      <div class="hist-list">${historyRows}</div>
    </section>`;

  document.querySelector("#btn-toggle")?.addEventListener("click", () => toggleStatus(d.id));
}

// ---------- Aksi ----------

function toggleStatus(id) {
  const d = devices.find((x) => x.id === id);
  if (!d) return;
  const now = Date.now();

  if (d.status === "OFF") {
    // OFF -> ON : catat waktu mulai
    d.status = "ON";
    d.currentStart = now;
  } else {
    // ON -> OFF : catat waktu selesai + hitung durasi
    if (d.currentStart == null) {
      d.status = "OFF";
    } else {
      const durationH = (now - d.currentStart) / 3600000;
      if (durationH <= 0) {
        alert("Periode tidak valid: waktu selesai harus lebih akhir dari waktu mulai.");
        return;
      }
      const energyKwh = d.powerKw * durationH;
      const costRp = energyKwh * TARIF_RP_PER_KWH;
      d.history = d.history || [];
      d.history.push({ start: d.currentStart, end: now, durationH, energyKwh, costRp });
      d.status = "OFF";
      d.currentStart = null;
    }
  }
  saveDevices(devices);
  renderNav();
  renderMain();
}

function deleteDevice(id) {
  if (!confirm(`Hapus device ${id}?`)) return;
  devices = devices.filter((x) => x.id !== id);
  if (selectedId === id) selectedId = devices[0]?.id ?? null;
  saveDevices(devices);
  saveSelectedId(selectedId);
  renderNav();
  renderMain();
}

function showAddModal() {
  closeModal();
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "add-modal";
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="Tambah device">
      <h3>Add New Device</h3>
      <form id="add-form" novalidate>
        <label>ID
          <input name="id" placeholder="AC-001" autocomplete="off" />
        </label>
        <label>Nama ruangan
          <input name="room" placeholder="Lab Elektronika" autocomplete="off" required />
        </label>
        <label>Daya AC (kW)
          <input name="powerKw" type="number" min="0.01" step="0.01" inputmode="decimal"
            placeholder="Contoh: 0.7" required />
          <span class="opt">Masukkan daya listrik AC dalam kW, bukan kapasitas BTU/h.</span>
        </label>
        <div class="form-error" id="add-error" role="alert"></div>
        <div class="form-actions">
          <button type="button" class="btn-ghost" id="add-cancel">Batal</button>
          <button type="submit" class="btn-primary">Simpan</button>
        </div>
      </form>
    </div>`;
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.querySelector("#add-cancel")?.addEventListener("click", closeModal);
  document.addEventListener("keydown", escClose);

  document.querySelector("#add-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const id = String(fd.get("id") || "").trim();
    const room = String(fd.get("room") || "").trim();
    const powerRaw = String(fd.get("powerKw") || "").trim();
    const powerKw = Number(powerRaw);
    const errEl = document.querySelector("#add-error");

    const fail = (msg) => {
      errEl.textContent = msg;
    };

    if (!id) return fail("ID wajib diisi.");
    if (!room) return fail("Nama ruangan wajib diisi.");
    if (devices.some((x) => x.id.toLowerCase() === id.toLowerCase()))
      return fail(`ID “${id}” sudah dipakai. Gunakan ID lain.`);
    if (powerRaw === "" || !Number.isFinite(powerKw) || powerKw <= 0)
      return fail("Daya AC harus berupa angka lebih besar dari 0 kW.");

    devices.push({ id, room, powerKw, status: "OFF", history: [], currentStart: null });
    selectedId = id;
    saveDevices(devices);
    saveSelectedId(selectedId);
    closeModal();
    renderNav();
    renderMain();
  });
}

function escClose(e) {
  if (e.key === "Escape") closeModal();
}

function closeModal() {
  document.querySelector("#add-modal")?.remove();
  document.removeEventListener("keydown", escClose);
}

// ---------- Shell awal ----------

document.querySelector("#app").innerHTML = `
  <div class="app-shell">
    <aside class="sidebar" id="sidebar">
      <div class="brand">AC Dashboard</div>
      <div class="search-wrap">
        <input
          type="search"
          id="device-search"
          placeholder="Cari ID atau ruangan"
          autocomplete="off"
          aria-label="Cari perangkat"
        />
      </div>
      <div class="filter-row" role="group" aria-label="Filter status">
        <button class="filter-btn active" data-filter="ALL">Semua</button>
        <button class="filter-btn" data-filter="ON">ON</button>
        <button class="filter-btn" data-filter="OFF">OFF</button>
      </div>
      <button class="filter-reset" id="filter-reset" hidden>Reset</button>
      <nav class="device-nav" id="device-nav"></nav>
      <div class="sidebar-bottom">
        <button class="add-device" id="add-device">Add New Device</button>
        <button class="collapse-btn" id="collapse-btn" aria-label="Collapse sidebar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </aside>
    <main class="main-content" id="main-content"></main>
  </div>
`;

document.querySelector("#add-device")?.addEventListener("click", showAddModal);
document.querySelector("#device-search")?.addEventListener("input", (e) => {
  searchKeyword = e.target.value;
  renderNav();
});
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    statusFilter = btn.dataset.filter;
    document.querySelectorAll(".filter-btn").forEach((b) => {
      b.classList.toggle("active", b === btn);
    });
    renderNav();
  });
});
document.querySelector("#filter-reset")?.addEventListener("click", () => {
  searchKeyword = "";
  statusFilter = "ALL";
  const input = document.querySelector("#device-search");
  if (input) input.value = "";
  document.querySelectorAll(".filter-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.filter === "ALL");
  });
  renderNav();
});
document.querySelector("#collapse-btn")?.addEventListener("click", () => {
  document.querySelector("#sidebar")?.classList.toggle("collapsed");
  document.body.classList.toggle("sidebar-collapsed");
});

renderNav();
renderMain();
