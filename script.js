/* =====================================================
   GLOW BEAUTY PARLOUR - COMMON SCRIPT
   ===================================================== */

// ===== SETTINGS (unga details ku maathunga) =====
const CONFIG = {
  parlourName: "Glow Beauty Parlour",
  whatsapp: "919876543210",   // 91 + 10 digit number
  maxDaysAhead: 60,           // evlo naal munnadi book panna mudiyum
  demoBooked: true,           // true na konjam slots "booked" nu kaattum (demo ku). Real use ku false pannunga
  hours: {
    weekday: { start: 10, end: 20 },  // Mon-Sat: 10 AM - 8 PM
    sunday:  { start: 10, end: 18 }   // Sunday: 10 AM - 6 PM
  }
};

// ===== SERVICES DATA (price maatha inga mattum maathunga) =====
const CATEGORIES = [
  { key: "all",    label: "All" },
  { key: "hair",   label: "Hair" },
  { key: "skin",   label: "Skin & Waxing" },
  { key: "facial", label: "Facials" },
  { key: "nails",  label: "Nails" },
  { key: "bridal", label: "Bridal" }
];

const SERVICES = [
  // Hair
  { id: 1,  name: "Haircut",              cat: "hair",   icon: "✂️", price: 250,   duration: "30 mins", desc: "Trim, layers or a fresh new style" },
  { id: 2,  name: "Hair Spa",             cat: "hair",   icon: "💆‍♀️", price: 900,   duration: "60 mins", desc: "Deep nourishment for smooth, shiny hair" },
  { id: 3,  name: "Hair Colouring",       cat: "hair",   icon: "🎨", price: 1800,  duration: "90 mins", desc: "Global colour, highlights and touch-ups" },
  { id: 4,  name: "Keratin Treatment",    cat: "hair",   icon: "🌟", price: 3500,  duration: "2.5 hours", desc: "Frizz-free, silky smooth hair" },
  { id: 5,  name: "Hair Styling",         cat: "hair",   icon: "💇‍♀️", price: 600,   duration: "45 mins", desc: "Blow dry, curls and party hairstyles" },
  // Skin & Waxing
  { id: 6,  name: "Eyebrow Threading",    cat: "skin",   icon: "🪡", price: 40,    duration: "10 mins", desc: "Clean and perfect shaping" },
  { id: 7,  name: "Full Arms Waxing",     cat: "skin",   icon: "🌸", price: 300,   duration: "30 mins", desc: "Smooth skin with gentle wax" },
  { id: 8,  name: "Full Legs Waxing",     cat: "skin",   icon: "🌺", price: 450,   duration: "40 mins", desc: "Soft, smooth and long-lasting" },
  { id: 9,  name: "De-Tan Treatment",     cat: "skin",   icon: "☀️", price: 700,   duration: "45 mins", desc: "Removes tan and brightens skin" },
  { id: 10, name: "Clean-Up",             cat: "skin",   icon: "🧼", price: 600,   duration: "40 mins", desc: "Quick deep cleansing for fresh skin" },
  // Facials
  { id: 11, name: "Fruit Facial",         cat: "facial", icon: "🍓", price: 700,   duration: "45 mins", desc: "Natural glow with fruit extracts" },
  { id: 12, name: "Gold Facial",          cat: "facial", icon: "✨", price: 1300,  duration: "60 mins", desc: "Radiant, luxurious glow" },
  { id: 13, name: "Diamond Facial",       cat: "facial", icon: "💎", price: 1800,  duration: "60 mins", desc: "Deep cleansing with a diamond shine" },
  { id: 14, name: "Anti-Acne Facial",     cat: "facial", icon: "🌿", price: 1500,  duration: "60 mins", desc: "Controls acne and clears the skin" },
  // Nails
  { id: 15, name: "Manicure",             cat: "nails",  icon: "💅", price: 450,   duration: "40 mins", desc: "Soft hands and neat nails" },
  { id: 16, name: "Pedicure",             cat: "nails",  icon: "🦶", price: 550,   duration: "45 mins", desc: "Relaxing foot care and polish" },
  { id: 17, name: "Nail Art",             cat: "nails",  icon: "🎀", price: 800,   duration: "60 mins", desc: "Trendy designs and gel polish" },
  // Bridal
  { id: 18, name: "Pre-Bridal Package",   cat: "bridal", icon: "🌹", price: 6500,  duration: "3 hours", desc: "Facial, waxing, mani-pedi and more" },
  { id: 19, name: "Bridal Makeup",        cat: "bridal", icon: "👰", price: 12000, duration: "3 hours", desc: "Complete HD bridal look with hairstyle" },
  { id: 20, name: "Party / Engagement Makeup", cat: "bridal", icon: "💄", price: 3500, duration: "90 mins", desc: "Glam look for special occasions" },
  { id: 21, name: "Saree Draping",        cat: "bridal", icon: "🥻", price: 600,   duration: "30 mins", desc: "Perfect pleats and neat finishing" },
  { id: 22, name: "Bridal Mehndi",        cat: "bridal", icon: "🌿", price: 2500,  duration: "2 hours", desc: "Beautiful traditional and modern designs" }
];

// ===== HELPERS =====
const $  = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));
const rupee = n => "₹" + Number(n).toLocaleString("en-IN");
const getService = id => SERVICES.find(s => s.id === Number(id));

function setError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg || "";
}

function pad(n) { return String(n).padStart(2, "0"); }

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function prettyDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "short", year: "numeric"
  });
}

function whatsappLink(text) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
}

function animateNumber(el, from, to, duration = 450) {
  const start = performance.now();
  function frame(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(from + (to - from) * eased).toLocaleString("en-IN");
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function buildTabs(container, onChange) {
  if (!container) return;
  container.innerHTML = CATEGORIES.map((c, i) =>
    `<button type="button" class="tab-btn${i === 0 ? " active" : ""}" data-cat="${c.key}">${c.label}</button>`
  ).join("");
  container.addEventListener("click", e => {
    const btn = e.target.closest(".tab-btn");
    if (!btn) return;
    $$(".tab-btn", container).forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    onChange(btn.dataset.cat);
  });
}

/* =====================================================
   COMMON FEATURES (ellaa pages la work aagum)
   ===================================================== */

// ----- Page loader -----
function hideLoader() {
  const loader = $("#loader");
  if (loader) loader.classList.add("hide");
}
window.addEventListener("load", () => setTimeout(hideLoader, 600));
setTimeout(hideLoader, 3500);

// ----- Navbar: scroll effect, mobile menu, active link -----
const navbar = $("#navbar");
const toTop = $("#toTop");

function onScroll() {
  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 60);
  if (toTop) toTop.classList.toggle("show", window.scrollY > 500);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const hamburger = $("#hamburger");
const navLinks = $("#navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
  $$("a", navLinks).forEach(a =>
    a.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    })
  );
}

(function markActiveLink() {
  const current = location.pathname.split("/").pop() || "index.html";
  $$("#navLinks a:not(.nav-book)").forEach(a => {
    if (a.getAttribute("href") === current) a.classList.add("active");
  });
})();

if (toTop) {
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ----- Footer year -----
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ----- Scroll reveal -----
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
$$(".reveal, .reveal-left, .reveal-right").forEach(el => revealObserver.observe(el));

// ----- Counters (data-count="5000") -----
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const start = performance.now();
    const duration = 1800;
    (function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString("en-IN");
      if (p < 1) requestAnimationFrame(tick);
    })(start);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });
$$("[data-count]").forEach(el => counterObserver.observe(el));

// ----- Button ripple effect -----
document.addEventListener("click", e => {
  const btn = e.target.closest(".btn");
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const span = document.createElement("span");
  span.className = "ripple";
  span.style.width = span.style.height = size + "px";
  span.style.left = e.clientX - rect.left - size / 2 + "px";
  span.style.top = e.clientY - rect.top - size / 2 + "px";
  btn.appendChild(span);
  setTimeout(() => span.remove(), 600);
});

// ----- Testimonial slider -----
(function initSlider() {
  const slides = $("#slides");
  const dotsWrap = $("#dots");
  if (!slides || !dotsWrap) return;

  const count = slides.children.length;
  let index = 0;
  let timer;

  dotsWrap.innerHTML = Array.from({ length: count }, (_, i) =>
    `<span class="dot${i === 0 ? " active" : ""}" data-i="${i}"></span>`
  ).join("");

  function go(i) {
    index = (i + count) % count;
    slides.style.transform = `translateX(-${index * 100}%)`;
    $$(".dot", dotsWrap).forEach((d, n) => d.classList.toggle("active", n === index));
  }
  function start() { timer = setInterval(() => go(index + 1), 5000); }
  function stop() { clearInterval(timer); }

  dotsWrap.addEventListener("click", e => {
    const dot = e.target.closest(".dot");
    if (dot) { stop(); go(Number(dot.dataset.i)); start(); }
  });

  const slider = slides.parentElement;
  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);

  let touchX = 0;
  slider.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; stop(); }, { passive: true });
  slider.addEventListener("touchend", e => {
    const diff = e.changedTouches[0].clientX - touchX;
    if (Math.abs(diff) > 50) go(diff < 0 ? index + 1 : index - 1);
    start();
  });

  start();
})();

/* =====================================================
   SERVICES PAGE
   ===================================================== */
(function initServicesPage() {
  const grid = $("#priceGrid");
  if (!grid) return;

  function render(cat) {
    const list = SERVICES.filter(s => cat === "all" || s.cat === cat);
    grid.innerHTML = list.map((s, i) => `
      <div class="price-card" style="animation-delay:${i * 60}ms">
        <div class="price-icon">${s.icon}</div>
        <div class="price-info">
          <h3>${s.name}</h3>
          <p>${s.desc}</p>
          <p>⏱ ${s.duration}</p>
        </div>
        <div class="price-amount">
          <strong>${rupee(s.price)}</strong>
          <a href="booking.html?service=${s.id}">Book Now →</a>
        </div>
      </div>
    `).join("");
  }

  buildTabs($("#tabs"), render);
  render("all");
})();

/* =====================================================
   BOOKING PAGE
   ===================================================== */
(function initBookingPage() {
  const svcGrid = $("#svcGrid");
  if (!svcGrid) return;

  const state = { step: 1, selected: new Set(), date: "", slot: "" };
  let lastTotal = 0;

  // ----- Local storage -----
  function getBookings() {
    try { return JSON.parse(localStorage.getItem("glowBookings")) || []; }
    catch (e) { return []; }
  }
  function saveBooking(b) {
    const all = getBookings();
    all.push(b);
    try { localStorage.setItem("glowBookings", JSON.stringify(all)); } catch (e) {}
  }

  // ----- Time slot helpers -----
  function hourLabel(h) {
    const period = h >= 12 ? "PM" : "AM";
    const hr = h % 12 === 0 ? 12 : h % 12;
    return pad(hr) + ":00 " + period;
  }

  function hoursFor(dateStr) {
    const day = new Date(dateStr + "T00:00:00").getDay();
    const cfg = day === 0 ? CONFIG.hours.sunday : CONFIG.hours.weekday;
    const list = [];
    for (let h = cfg.start; h < cfg.end; h++) list.push(h);
    return list;
  }

  function demoBookedFor(dateStr, hours) {
    if (!CONFIG.demoBooked) return [];
    let hash = 0;
    for (const ch of dateStr) hash += ch.charCodeAt(0);
    return hours.filter(h => (hash * 3 + h * 7) % 5 === 0).map(hourLabel);
  }

  function bookedSlotsFor(dateStr) {
    const saved = getBookings().filter(b => b.date === dateStr).map(b => b.slot);
    return [...saved, ...demoBookedFor(dateStr, hoursFor(dateStr))];
  }

  // ----- Step 1: services -----
  function renderServices(cat) {
    const list = SERVICES.filter(s => cat === "all" || s.cat === cat);
    svcGrid.innerHTML = list.map((s, i) => `
      <div class="svc-item${state.selected.has(s.id) ? " selected" : ""}" data-id="${s.id}" style="animation-delay:${i * 35}ms">
        <span class="svc-check">✓</span>
        <span class="svc-name">${s.name}<small>⏱ ${s.duration}</small></span>
        <span class="svc-price">${rupee(s.price)}</span>
      </div>
    `).join("");
  }

  function syncGrid() {
    $$(".svc-item", svcGrid).forEach(item =>
      item.classList.toggle("selected", state.selected.has(Number(item.dataset.id)))
    );
  }

  svcGrid.addEventListener("click", e => {
    const item = e.target.closest(".svc-item");
    if (!item) return;
    const id = Number(item.dataset.id);
    if (state.selected.has(id)) state.selected.delete(id);
    else state.selected.add(id);
    item.classList.toggle("selected", state.selected.has(id));
    setError("svcError", "");
    updateSummary();
  });

  // ----- Summary sidebar -----
  function selectedServices() {
    return Array.from(state.selected).map(getService).filter(Boolean);
  }

  function totalAmount() {
    return selectedServices().reduce((sum, s) => sum + s.price, 0);
  }

  function updateSummary() {
    const itemsEl = $("#summaryItems");
    const metaEl = $("#summaryMeta");
    const totalEl = $("#totalAmount");
    const list = selectedServices();

    if (itemsEl) {
      itemsEl.innerHTML = list.length
        ? list.map(s => `
            <div class="summary-item">
              <span class="s-name">${s.name}</span>
              <span class="s-price">${rupee(s.price)}</span>
              <button type="button" class="s-remove" data-id="${s.id}" aria-label="Remove ${s.name}">×</button>
            </div>`).join("")
        : '<p class="summary-empty">No service selected yet. Choose from the list.</p>';
    }

    if (metaEl) {
      let meta = "";
      if (state.date) meta += `<div>📅 <b>${prettyDate(state.date)}</b></div>`;
      if (state.slot) meta += `<div>🕒 <b>${state.slot}</b></div>`;
      metaEl.innerHTML = meta;
    }

    if (totalEl) {
      const total = totalAmount();
      animateNumber(totalEl, lastTotal, total);
      if (total !== lastTotal && totalEl.parentElement) {
        totalEl.parentElement.classList.remove("bump");
        void totalEl.parentElement.offsetWidth;
        totalEl.parentElement.classList.add("bump");
      }
      lastTotal = total;
    }
  }

  const summaryItems = $("#summaryItems");
  if (summaryItems) {
    summaryItems.addEventListener("click", e => {
      const btn = e.target.closest(".s-remove");
      if (!btn) return;
      state.selected.delete(Number(btn.dataset.id));
      syncGrid();
      updateSummary();
    });
  }

  // ----- Step 2: date and slots -----
  const dateInput = $("#dateInput");
  const slotsWrap = $("#slotsWrap");

  if (dateInput) {
    dateInput.min = todayStr();
    const max = new Date();
    max.setDate(max.getDate() + CONFIG.maxDaysAhead);
    dateInput.max = `${max.getFullYear()}-${pad(max.getMonth() + 1)}-${pad(max.getDate())}`;

    dateInput.addEventListener("change", () => {
      state.date = dateInput.value;
      state.slot = "";
      setError("dateError", "");
      setError("slotError", "");
      renderSlots();
      updateSummary();
    });
  }

  function renderSlots() {
    if (!slotsWrap) return;
    if (!state.date) {
      slotsWrap.innerHTML = '<p class="hint">Please select a date to see the available time slots.</p>';
      return;
    }

    const hours = hoursFor(state.date);
    const booked = bookedSlotsFor(state.date);
    const isToday = state.date === todayStr();
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();

    const groups = [
      { title: "🌅 Morning",   test: h => h < 12 },
      { title: "☀️ Afternoon", test: h => h >= 12 && h < 16 },
      { title: "🌆 Evening",   test: h => h >= 16 }
    ];

    let html = "";
    let available = 0;

    groups.forEach(g => {
      const list = hours.filter(g.test);
      if (!list.length) return;
      html += `<div class="slot-group-title">${g.title}</div><div class="slots">`;
      list.forEach(h => {
        const label = hourLabel(h);
        const unavailable = booked.includes(label) || (isToday && h * 60 <= nowMin);
        if (!unavailable) available++;
        const cls = "slot" + (unavailable ? " booked" : "") + (state.slot === label && !unavailable ? " selected" : "");
        html += `<div class="${cls}" data-slot="${label}">${label}</div>`;
      });
      html += "</div>";
    });

    if (available === 0) {
      html += '<p class="hint" style="margin-top:16px">No slots left for this date. Please choose another date.</p>';
    }

    html += `
      <div class="legend">
        <span><i></i>Available</span>
        <span><i class="l-sel"></i>Selected</span>
        <span><i class="l-book"></i>Booked</span>
      </div>`;

    slotsWrap.innerHTML = html;
  }

  if (slotsWrap) {
    slotsWrap.addEventListener("click", e => {
      const slot = e.target.closest(".slot");
      if (!slot || slot.classList.contains("booked")) return;
      $$(".slot", slotsWrap).forEach(s => s.classList.remove("selected"));
      slot.classList.add("selected");
      state.slot = slot.dataset.slot;
      setError("slotError", "");
      updateSummary();
    });
  }

  // ----- Step 4: review -----
  function renderReview() {
    const box = $("#reviewBox");
    if (!box) return;
    const list = selectedServices();
    box.innerHTML = `
      <div class="review-row"><span>Name</span><span>${$("#name").value.trim()}</span></div>
      <div class="review-row"><span>Phone</span><span>${$("#phone").value.trim()}</span></div>
      <div class="review-row"><span>Services</span><span>${list.map(s => s.name).join(", ")}</span></div>
      <div class="review-row"><span>Date</span><span>${prettyDate(state.date)}</span></div>
      <div class="review-row"><span>Time</span><span>${state.slot}</span></div>
      <div class="review-row"><span>Total Amount</span><span><b>${rupee(totalAmount())}</b></span></div>
    `;
  }

  // ----- Steps navigation -----
  function goToStep(n, scroll = true) {
    state.step = n;
    $$(".step-panel").forEach(p => p.classList.toggle("active", Number(p.dataset.panel) === n));
    $$(".step").forEach(s => {
      const num = Number(s.dataset.step);
      s.classList.toggle("active", num === n);
      s.classList.toggle("done", num < n);
    });
    if (n === 2) renderSlots();
    if (n === 4) renderReview();
    if (scroll) {
      const main = $(".booking-main");
      if (main) window.scrollTo({ top: main.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" });
    }
  }

  function validateStep(n) {
    if (n === 1) {
      if (state.selected.size === 0) {
        setError("svcError", "Please select at least one service.");
        return false;
      }
    }
    if (n === 2) {
      let ok = true;
      if (!state.date) { setError("dateError", "Please select a date."); ok = false; }
      if (!state.slot) { setError("slotError", "Please select a time slot."); ok = false; }
      return ok;
    }
    if (n === 3) {
      let ok = true;
      const name = $("#name").value.trim();
      const phone = $("#phone").value.trim();
      if (name.length < 3) { setError("nameError", "Please enter your full name (min 3 letters)."); ok = false; }
      else setError("nameError", "");
      if (!/^[6-9]\d{9}$/.test(phone)) { setError("phoneError", "Enter a valid 10 digit mobile number."); ok = false; }
      else setError("phoneError", "");
      return ok;
    }
    return true;
  }

  $$("[data-next]").forEach(btn =>
    btn.addEventListener("click", () => {
      if (validateStep(state.step)) goToStep(state.step + 1);
    })
  );
  $$("[data-back]").forEach(btn =>
    btn.addEventListener("click", () => goToStep(state.step - 1))
  );

  // ----- Confirm booking -----
  const modal = $("#successModal");
  let waUrl = "";

  const confirmBtn = $("#confirmBtn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      // double booking check (last moment la)
      if (bookedSlotsFor(state.date).includes(state.slot)) {
        setError("slotError", "Sorry, this slot was just booked. Please choose another.");
        state.slot = "";
        goToStep(2);
        return;
      }

      const list = selectedServices();
      const booking = {
        id: Date.now(),
        name: $("#name").value.trim(),
        phone: $("#phone").value.trim(),
        notes: ($("#notes") ? $("#notes").value.trim() : ""),
        services: list.map(s => s.name),
        total: totalAmount(),
        date: state.date,
        slot: state.slot,
        createdAt: new Date().toISOString()
      };
      saveBooking(booking);

      const serviceText = list.map(s => `• ${s.name} - ${rupee(s.price)}`).join("\n");
      const message =
        `Hello ${CONFIG.parlourName}, I would like to confirm my appointment.\n\n` +
        `Name: ${booking.name}\n` +
        `Phone: ${booking.phone}\n` +
        `Date: ${prettyDate(booking.date)}\n` +
        `Time: ${booking.slot}\n\n` +
        `Services:\n${serviceText}\n\n` +
        `Total: ${rupee(booking.total)}` +
        (booking.notes ? `\n\nNote: ${booking.notes}` : "");
      waUrl = whatsappLink(message);

      const successMsg = $("#successMsg");
      if (successMsg) {
        successMsg.textContent =
          `Thank you, ${booking.name}!\n` +
          `📅 ${prettyDate(booking.date)} at ${booking.slot}\n` +
          `💅 ${booking.services.join(", ")}\n` +
          `💰 Total: ${rupee(booking.total)}`;
      }
      if (modal) modal.classList.add("show");
    });
  }

  const closeModal = $("#closeModal");
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      if (modal) modal.classList.remove("show");
      if (waUrl) { window.open(waUrl, "_blank"); waUrl = ""; }
      resetBooking();
    });
  }

  function resetBooking() {
    state.selected.clear();
    state.date = "";
    state.slot = "";
    if (dateInput) dateInput.value = "";
    ["name", "phone", "notes"].forEach(id => { const el = $("#" + id); if (el) el.value = ""; });
    syncGrid();
    updateSummary();
    renderSlots();
    goToStep(1);
  }

  // ----- Init -----
  buildTabs($("#svcTabs"), renderServices);
  renderServices("all");

  // Services page la "Book Now" click panna, andha service auto select aagum (booking.html?service=12)
  const preselect = new URLSearchParams(location.search).get("service");
  if (preselect) {
    preselect.split(",").forEach(id => { if (getService(id)) state.selected.add(Number(id)); });
    syncGrid();
  }

  updateSummary();
  renderSlots();
  goToStep(1, false);
})();

/* =====================================================
   CONTACT PAGE (enquiry form -> WhatsApp)
   ===================================================== */
(function initContactForm() {
  const form = $("#contactForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#cName").value.trim();
    const phone = $("#cPhone").value.trim();
    const msg = $("#cMessage").value.trim();
    let ok = true;

    if (name.length < 3) { setError("cNameError", "Please enter your name."); ok = false; }
    else setError("cNameError", "");

    if (!/^[6-9]\d{9}$/.test(phone)) { setError("cPhoneError", "Enter a valid 10 digit mobile number."); ok = false; }
    else setError("cPhoneError", "");

    if (!ok) return;

    const text =
      `Hello ${CONFIG.parlourName},\n\n` +
      `Name: ${name}\nPhone: ${phone}\n\n` +
      `${msg || "I would like to know more about your services."}`;

    window.open(whatsappLink(text), "_blank");
    form.reset();

    const note = $("#contactNote");
    if (note) note.textContent = "Thank you! We have opened WhatsApp for you. Please send the message.";
  });
})();