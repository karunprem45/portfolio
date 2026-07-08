/* ============================================================
   Karuniya Premnath — Classic Portfolio (view-switcher SPA)
   ============================================================ */
(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------------- DATA ---------------- */
  const SKILLS = [
    { group: "Languages", items: [["Python", "expert"], ["SQL", "advanced"], ["R", "proficient"]] },
    { group: "ML & Modeling", items: [["Scikit-learn", "advanced"], ["TensorFlow", "advanced"], ["Keras", "advanced"], ["XGBoost", "advanced"], ["SVM / LSTM", "advanced"], ["CNN", "proficient"]] },
    { group: "Analysis & XAI", items: [["SHAP", "advanced"], ["K-Means", "advanced"], ["UMAP", "proficient"], ["Predictive Analytics", "advanced"]] },
    { group: "Visualization", items: [["Matplotlib", "advanced"], ["Seaborn", "advanced"]] },
    { group: "Tools & Platforms", items: [["Firebase", "advanced"], ["Google Maps API", "proficient"], ["IoT Integration", "proficient"], ["Audacity", "advanced"]] },
  ];

  const WORK = [
    { title: "Youth Tobacco Use Prediction & Policy Analysis", year: "Apr 2026",
      desc: "A multi-country study (GYTS) merging GYTS, WHO MPOWER and World Bank data into a 522 country-year panel. A regularized XGBoost model with SHAP explainability plus K-Means/UMAP clustering pinpointed peer exposure and secondhand smoke as top predictors — and showed policy upgrades could cut youth smoking prevalence by up to 7.34 points in high-risk countries.",
      tags: ["XGBoost", "SHAP", "K-Means / UMAP", "Policy Analytics"], metric: "187", metricLabel: "countries analyzed" },
    { title: "Decision-Support System for Smart Agriculture", year: "Apr 2026",
      desc: "A visualization-first Android platform integrating a CNN for crop-disease detection, an XGBoost crop-recommendation engine (2,200 records, 22 crops) and a soil-analysis module, synced in real time via Firebase. Color-coded, farmer-readable charts turn every AI output into an actionable insight for low-literacy, non-technical users (P–K correlation r = 0.74).",
      tags: ["CNN", "XGBoost", "Firebase", "Android", "Data Viz"], metric: "22", metricLabel: "crops modeled" },
    { title: "Wireless Cylinder Safety Monitoring System", year: "Aug 2025",
      desc: "An IoT-based gas-leak detection system with wireless data transmission for continuous safety tracking, plus an automated emergency-alert pipeline enabling immediate response in industrial and domestic environments.",
      tags: ["IoT", "Embedded", "Real-time Alerts"], metric: "24/7", metricLabel: "safety monitoring" },
  ];

  const EXPERIENCE = [
    { date: "July 2024", title: "Software Developer Intern", org: "Gnani.ai · Bengaluru, India",
      points: [
        "Enhanced speech clarity using Audacity through advanced noise reduction and volume normalization.",
        "Supported AI-based speech-processing workflows during live project implementation.",
        "Improved presentation-quality audio outputs for deployment-ready systems.",
      ] },
    { date: "Aug 2023", title: "Software Developer Intern", org: "Infilabs · Tiruchirappalli, India",
      points: [
        "Designed and optimized data structures for efficient storage and retrieval across AI-driven modules.",
        "Built and tested data-driven modules, ensuring clean, well-structured datasets for reliable processing.",
        "Collaborated with the development team on debugging, code reviews, and deployment support.",
      ] },
  ];

  const EDUCATION = [
    { date: "Jan 2026 – Present", title: "MS, Data Science", org: "Northeastern University · Boston, MA",
      points: ["Expected May 2028 · CGPA 3.667.", "Machine Learning · Essentials of Data Science · Machine Learning Operations."] },
    { date: "Nov 2021 – Apr 2025", title: "B.Tech, AI & Data Science", org: "Anna University · Tiruchirappalli, Tamil Nadu",
      points: ["Data Science · Machine Learning · Deep Learning · Artificial Intelligence."] },
  ];

  const AWARDS = [
    { name: "Executive PG Certification in Data Science & AI", org: "IIT Roorkee · Intellipaat" },
    { name: "Advanced SoC Design for PPA", org: "NIT Trichy · PROBE 2023" },
    { name: "Code Like a Ninja: Cloud Solutions Workshop", org: "Zoho Catalyst" },
  ];

  /* ---------------- RENDER ---------------- */
  function renderSkills() {
    $("#skillCols").innerHTML = SKILLS.map(g => `
      <div class="skill-group">
        <h4>${g.group}</h4>
        <ul>${g.items.map(([n, lvl]) => `<li>${n}<span>${lvl}</span></li>`).join("")}</ul>
      </div>`).join("");
  }
  function renderWork() {
    $("#workList").innerHTML = WORK.map((w, i) => `
      <article class="work-item" data-view="terminal-noop">
        <div class="wi-no">${String(i + 1).padStart(2, "0")}</div>
        <div>
          <h3 class="wi-title">${w.title}</h3>
          <p class="wi-desc">${w.desc}</p>
          <div class="wi-tags">${w.tags.map(t => `<span class="wi-tag">${t}</span>`).join("")}</div>
        </div>
        <div class="wi-metric"><b>${w.metric}</b><span>${w.metricLabel}</span><span class="wi-year">${w.year}</span></div>
      </article>`).join("");
  }
  const entryHTML = e => `
    <div class="entry">
      <div class="entry-date">${e.date}</div>
      <div class="entry-title">${e.title}</div>
      <div class="entry-org">${e.org}</div>
      <ul>${e.points.map(p => `<li>${p}</li>`).join("")}</ul>
    </div>`;
  function renderResume() {
    $("#expList").innerHTML = EXPERIENCE.map(entryHTML).join("");
    $("#eduList").innerHTML = EDUCATION.map(entryHTML).join("");
  }
  function renderAwards() {
    $("#awardsList").innerHTML = AWARDS.map(a => `
      <li><div><div class="aw-name">${a.name}</div><div class="aw-org">${a.org}</div></div></li>`).join("");
  }

  /* ---------------- VIEW SWITCHER ---------------- */
  const LABELS = { home: "Home", about: "About", work: "Work", resume: "Résumé", awards: "Awards", contact: "Contact", terminal: "Terminal" };
  let current = "home";
  function setView(view) {
    if (!LABELS[view] || view === current) { if (view === "terminal") focusTerm(); return; }
    current = view;
    $$(".view").forEach(v => v.classList.toggle("active", v.dataset.view === view));
    $$("#railNav button, .mobile-menu button").forEach(b => b.classList.toggle("active", b.dataset.view === view));
    $("#sbSection").textContent = LABELS[view];
    $(".stage").scrollTop = 0;
    $$(".view").forEach(v => { if (v.dataset.view === view) v.scrollTop = 0; });
    location.hash = view;
    closeMobile();
    if (view === "terminal") setTimeout(focusTerm, 120);
  }
  function initNav() {
    document.addEventListener("click", e => {
      const btn = e.target.closest("[data-view]");
      if (!btn) return;
      const v = btn.dataset.view;
      if (v === "terminal-noop") return;
      setView(v);
    });
    // keyboard: 1-6 for views, t for terminal, esc -> home
    const order = ["home", "about", "work", "resume", "awards", "contact"];
    addEventListener("keydown", e => {
      if (e.target.matches("input, textarea")) return;
      if (e.key >= "1" && e.key <= "6") setView(order[+e.key - 1]);
      else if (e.key.toLowerCase() === "t") setView("terminal");
      else if (e.key === "Escape") setView("home");
    });
    // deep link
    const h = location.hash.slice(1);
    if (LABELS[h]) setView(h);
  }

  /* ---------------- MOBILE MENU ---------------- */
  function initMobile() {
    const btn = $("#tbMenu"), menu = $("#mobileMenu");
    btn.addEventListener("click", () => { btn.classList.toggle("open"); menu.classList.toggle("open"); });
  }
  function closeMobile() { $("#tbMenu")?.classList.remove("open"); $("#mobileMenu")?.classList.remove("open"); }

  /* ---------------- THEME ---------------- */
  function initTheme() {
    const saved = localStorage.getItem("kp-theme3");
    if (saved) document.documentElement.dataset.theme = saved;
    $("#themeToggle").addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "slate" ? "carbon" : "slate";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("kp-theme3", next);
      toast(next === "slate" ? "Slate mode" : "Carbon mode");
    });
  }

  /* ---------------- COPY & CONTACT ---------------- */
  function initContact() {
    $$("[data-copy]").forEach(b => b.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(b.dataset.copy); toast("Copied — " + b.dataset.copy); }
      catch { toast(b.dataset.copy); }
    }));
    $("#contactForm").addEventListener("submit", e => {
      e.preventDefault();
      const n = $("#cfName").value.trim(), em = $("#cfEmail").value.trim(), m = $("#cfMsg").value.trim();
      const subject = encodeURIComponent(`Portfolio contact from ${n}`);
      const body = encodeURIComponent(`${m}\n\n— ${n} (${em})`);
      location.href = `mailto:premnath.k@northeastern.edu?subject=${subject}&body=${body}`;
      toast("Opening your email app…");
    });
  }

  /* ---------------- TOAST ---------------- */
  let tt;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 2400);
  }

  /* ---------------- CLOCK ---------------- */
  function initClock() {
    const el = $("#sbClock");
    const tick = () => {
      const d = new Date();
      el.textContent = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
    };
    tick(); setInterval(tick, 1000 * 20);
  }

  /* ---------------- TERMINAL ---------------- */
  function focusTerm() { $("#termInput")?.focus(); }
  function initTerminal() {
    const screen = $("#termScreen"), input = $("#termInput");
    const history = []; let hIdx = -1;
    const print = (html, cls = "") => {
      const div = document.createElement("div");
      if (cls) div.className = cls;
      div.innerHTML = html; screen.appendChild(div); screen.scrollTop = screen.scrollHeight;
    };
    const commands = {
      help: () => print(
        `Available commands:<br>` +
        `  <span class="t-accent">about</span>      — who is Karuniya<br>` +
        `  <span class="t-accent">skills</span>     — technical toolkit<br>` +
        `  <span class="t-accent">projects</span>   — selected work<br>` +
        `  <span class="t-accent">experience</span> — work history<br>` +
        `  <span class="t-accent">education</span>  — academic background<br>` +
        `  <span class="t-accent">awards</span>     — certifications<br>` +
        `  <span class="t-accent">contact</span>    — how to reach me<br>` +
        `  <span class="t-accent">resume</span>     — open the PDF<br>` +
        `  <span class="t-accent">theme</span>      — toggle paper/ink<br>` +
        `  <span class="t-accent">goto</span> [page] — navigate (e.g. goto work)<br>` +
        `  <span class="t-accent">clear</span>      — clear the screen`),
      about: () => print(`Karuniya Premnath — Data Scientist & AI Engineer, Boston MA.<br><span class="t-dim">MS Data Science @ Northeastern. I build ML that leaves the notebook — from public-health policy to smarter farms.</span>`),
      whoami: () => print(`karuniya <span class="t-dim">(guest session)</span>`),
      skills: () => SKILLS.forEach(g => print(`<span class="t-accent">${g.group}:</span> ${g.items.map(i => i[0]).join(", ")}`)),
      projects: () => WORK.forEach((w, i) => print(`<span class="t-accent">${i + 1}.</span> ${w.title} <span class="t-dim">(${w.year}) — ${w.metric} ${w.metricLabel}</span>`)),
      experience: () => EXPERIENCE.forEach(e => print(`<span class="t-accent">${e.date}</span> ${e.title} — ${e.org}`)),
      education: () => EDUCATION.forEach(e => print(`<span class="t-accent">${e.date}</span> ${e.title} — ${e.org}`)),
      awards: () => AWARDS.forEach(a => print(`• ${a.name} <span class="t-dim">— ${a.org}</span>`)),
      contact: () => print(`Email: <a href="mailto:premnath.k@northeastern.edu">premnath.k@northeastern.edu</a><br>Phone: +1-617-516-3070<br>LinkedIn: <a href="https://linkedin.com/in/karuniya-premnath" target="_blank" rel="noopener">/in/karuniya-premnath</a>`),
      resume: () => { print(`Opening résumé PDF…`); window.open("KARUNIYA.pdf", "_blank"); },
      theme: () => { $("#themeToggle").click(); print(`Theme toggled — slate / carbon.`); },
      date: () => print(new Date().toString()),
      echo: (a) => print(a.join(" ") || ""),
      goto: (a) => { const p = (a[0] || "").toLowerCase(); if (LABELS[p]) { print(`Navigating to ${LABELS[p]}…`); setTimeout(() => setView(p), 350); } else print(`<span class="t-accent">goto:</span> unknown page "${a[0] || ""}". try: home, about, work, resume, awards, contact`); },
      clear: () => { screen.innerHTML = ""; return true; },
      sudo: () => print(`<span class="t-accent">Nice try.</span> This portfolio runs on charm, not root.`),
      ls: () => print(`about  skills  projects  experience  education  awards  contact  resume`),
    };
    function run(raw) {
      const line = raw.trim();
      if (line) { history.unshift(line); hIdx = -1; }
      print(line, "t-cmd");
      if (!line) return;
      const [cmd, ...args] = line.split(/\s+/);
      const fn = commands[cmd.toLowerCase()];
      if (fn) fn(args);
      else print(`<span class="t-accent">command not found:</span> ${cmd} — type <span class="t-accent">help</span>`);
    }
    // boot
    print(`Karuniya OS <span class="t-dim">v1.0 — type</span> <span class="t-accent">help</span> <span class="t-dim">to begin.</span>`);
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") { run(input.value); input.value = ""; }
      else if (e.key === "ArrowUp") { if (hIdx < history.length - 1) { hIdx++; input.value = history[hIdx]; e.preventDefault(); } }
      else if (e.key === "ArrowDown") { if (hIdx > 0) { hIdx--; input.value = history[hIdx]; } else { hIdx = -1; input.value = ""; } }
    });
    $(".terminal").addEventListener("click", focusTerm);
  }

  /* ---------------- AI SPEAKING CHARACTER ---------------- */
  function initAssistant() {
    const fab = $("#asstFab"), panel = $("#asst"), body = $("#asstBody"), avatar = $("#asstAvatar"),
      status = $("#asstStatus"), form = $("#asstForm"), input = $("#asstInput"), chips = $("#asstChips");
    let opened = false, muted = localStorage.getItem("kp-mute") === "1";
    const muteBtn = $("#asstMute");
    muteBtn.textContent = muted ? "🔇" : "🔊";

    /* --- knowledge base (first person, from résumé) --- */
    const KB = [
      { k: ["hi", "hello", "hey", "hii", "greetings"], a: "Hi there! 👋 I'm Karuniya — well, my AI stand-in. Ask me about my skills, projects, background, or how to get in touch." },
      { k: ["who are you", "who r u", "who is", "yourself", "introduce", "about you", "tell me about"], a: "I'm Karuniya Premnath, a Data Scientist and AI Engineer based in Boston. I'm pursuing my MS in Data Science at Northeastern University, and I love building machine-learning systems that solve real, human problems — from public-health policy to smarter farms." },
      { k: ["skill", "tech", "stack", "tool", "language", "know"], a: "My core toolkit is Python, SQL and R. For modeling I use Scikit-learn, TensorFlow, Keras and XGBoost — including SVMs, LSTMs and CNNs. I lean on SHAP for explainability and K-Means and UMAP for clustering, visualize with Matplotlib and Seaborn, and build with Firebase, IoT and the Google Maps API." },
      { k: ["project", "work", "built", "made", "portfolio"], a: "I have three featured projects: a Youth Tobacco Use prediction and policy study across 187 countries, a visualization-first Decision-Support System for smart agriculture, and a wireless gas-cylinder safety monitor. Ask about any one of them!" },
      { k: ["tobacco", "smoking", "youth", "gyts", "policy", "shap", "public health", "health"], a: "For the Youth Tobacco study I merged GYTS, WHO MPOWER and World Bank data into a 522 country-year panel, then trained a regularized XGBoost model with SHAP explainability and K-Means/UMAP clustering. It flagged peer exposure and secondhand smoke as the top predictors, and showed policy upgrades could cut youth smoking prevalence by up to 7.34 points in high-risk countries." },
      { k: ["farm", "farming", "crop", "agriculture", "soil", "cnn", "firebase", "android"], a: "The Smart Agriculture project is a visualization-first Android app: a CNN detects crop disease, an XGBoost engine recommends crops across 2,200 records and 22 crops, and a soil module analyses nutrients — all synced through Firebase. Every AI output becomes a color-coded, farmer-readable chart, uncovering patterns like a P–K correlation of 0.74." },
      { k: ["cylinder", "gas", "leak", "safety monitor", "wireless", "iot"], a: "The Wireless Cylinder Safety Monitoring System is an IoT gas-leak detection system with wireless data transmission for continuous safety tracking and an automated emergency-alert pipeline for immediate response." },
      { k: ["education", "study", "degree", "university", "college", "school", "northeastern", "anna", "cgpa"], a: "I'm doing my MS in Data Science at Northeastern University in Boston, expected May 2028, with a 3.667 CGPA. Before that I earned a B.Tech in AI & Data Science from Anna University in Tiruchirappalli, India." },
      { k: ["experience", "intern", "job", "career", "worked", "gnani", "infilabs"], a: "I've interned as a Software Developer at Gnani.ai in Bengaluru, enhancing AI speech-processing workflows and audio quality with Audacity, and at Infilabs in Tiruchirappalli, where I designed and optimized data structures and built data-driven modules." },
      { k: ["certif", "award", "credential", "course"], a: "I hold an Executive PG Certification in Data Science & AI from IIT Roorkee (Intellipaat), a certificate in Advanced SoC Design from NIT Trichy (PROBE 2023), and completed Zoho Catalyst's cloud solutions workshop." },
      { k: ["contact", "email", "reach", "hire", "phone", "linkedin", "connect"], a: "You can email me at premnath.k@northeastern.edu, call +1-617-516-3070, or connect on LinkedIn at /in/karuniya-premnath. I'd love to chat!" },
      { k: ["available", "open", "opportunit", "looking", "recruit", "role", "position"], a: "Yes! I'm actively open to Data Science, Machine Learning and AI Engineering roles. Head to the Contact section or just email me." },
      { k: ["location", "based", "where", "boston", "live"], a: "I'm based in Boston, Massachusetts." },
      { k: ["resume", "cv", "download"], a: "You can download my résumé from the Résumé section or the button on the home page — it's a one-click PDF." },
      { k: ["thank", "thanks", "cool", "nice", "awesome", "great"], a: "Thank you! 😊 Anything else you'd like to know?" },
      { k: ["python"], a: "Python is my primary language — I use it for everything from data wrangling and clustering to training XGBoost and deep-learning models." },
    ];
    const GREETING = "Hi! I'm AI Karuniya. Ask me anything about my work, skills or background — I'll answer out loud.";
    const FALLBACK = "Good question! I can tell you about my skills, projects, education, experience, certifications, or how to reach me. Try one of those.";
    function answer(q) {
      const s = q.toLowerCase();
      let best = null, bestScore = 0;
      for (const item of KB) {
        const score = item.k.reduce((n, kw) => n + (s.includes(kw) ? kw.length : 0), 0);
        if (score > bestScore) { bestScore = score; best = item; }
      }
      return best ? best.a : FALLBACK;
    }

    /* --- speech (browser speechSynthesis) --- */
    let voice = null;
    function pickVoice() {
      const vs = speechSynthesis.getVoices();
      voice = vs.find(v => /en/i.test(v.lang) && /female|samantha|karen|victoria|zira|google us/i.test(v.name))
           || vs.find(v => /en-US/i.test(v.lang)) || vs.find(v => /en/i.test(v.lang)) || vs[0] || null;
    }
    if ("speechSynthesis" in window) {
      pickVoice();
      speechSynthesis.onvoiceschanged = pickVoice;
    }
    const homeOrb = $("#homeOrb"), bgAvatar = $("#bgAvatar");
    function setSpeaking(on) {
      avatar.classList.toggle("speaking", on);
      homeOrb?.classList.toggle("speaking", on);
      bgAvatar?.classList.toggle("speaking", on);
      status.textContent = on ? "speaking…" : "online";
    }
    function stopVoice() {
      if ("speechSynthesis" in window) speechSynthesis.cancel();
      setSpeaking(false);
    }
    function speak(text) {
      if (muted || !("speechSynthesis" in window)) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.replace(/[👋😊🔊🔇]/g, ""));
      if (voice) u.voice = voice;
      u.rate = 1; u.pitch = 1.05;
      u.onstart = () => setSpeaking(true);
      u.onend = () => setSpeaking(false);
      speechSynthesis.speak(u);
    }

    /* --- messages --- */
    function addMsg(text, who) {
      const d = document.createElement("div");
      d.className = "asst-msg " + who;
      d.innerHTML = text
        .replace(/(premnath\.k@northeastern\.edu)/, '<a href="mailto:$1">$1</a>')
        .replace(/(\/in\/karuniya-premnath)/, '<a href="https://linkedin.com$1" target="_blank" rel="noopener">$1</a>');
      body.appendChild(d); body.scrollTop = body.scrollHeight;
    }
    function botReply(text) {
      const t = document.createElement("div");
      t.className = "asst-typing"; t.innerHTML = "<i></i><i></i><i></i>";
      body.appendChild(t); body.scrollTop = body.scrollHeight;
      setTimeout(() => { t.remove(); addMsg(text, "bot"); speak(text); }, 550);
    }
    function ask(q) { addMsg(q, "user"); botReply(answer(q)); }

    /* --- quick chips --- */
    const CHIPS = ["Who are you?", "Your skills", "Best project", "Contact you", "Available?"];
    chips.innerHTML = CHIPS.map(c => `<button class="asst-chip">${c}</button>`).join("");
    chips.addEventListener("click", e => { const b = e.target.closest(".asst-chip"); if (b) ask(b.textContent); });

    /* --- open / close --- */
    function open() {
      panel.classList.add("open"); panel.setAttribute("aria-hidden", "false");
      fab.classList.add("hidden"); input.focus();
      if (!opened) {
        opened = true;
        botReply(GREETING);
      }
    }
    function close() {
      panel.classList.remove("open"); panel.setAttribute("aria-hidden", "true");
      fab.classList.remove("hidden");
      stopVoice();
    }
    fab.addEventListener("click", open);
    $("#asstClose").addEventListener("click", close);
    $("#archTalk")?.addEventListener("click", open);
    muteBtn.addEventListener("click", () => {
      muted = !muted; localStorage.setItem("kp-mute", muted ? "1" : "0");
      muteBtn.textContent = muted ? "🔇" : "🔊";
      if (muted) stopVoice();
      toast(muted ? "Voice off" : "Voice on");
    });
    form.addEventListener("submit", e => {
      e.preventDefault();
      const q = input.value.trim(); if (!q) return;
      input.value = ""; ask(q);
    });
  }

  /* ---------------- LOADER ---------------- */
  function runLoader() {
    const bar = $("#loaderBar"), loader = $("#loader");
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 22 + 8;
      if (p >= 100) { p = 100; clearInterval(iv); setTimeout(done, 300); }
      bar.style.width = p + "%";
    }, 120);
    function done() { loader.classList.add("done"); document.body.classList.remove("loading"); }
  }

  /* ---------------- INIT ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    $("#year").textContent = new Date().getFullYear();
    renderSkills(); renderWork(); renderResume(); renderAwards();
    initNav(); initMobile(); initTheme(); initContact(); initClock(); initTerminal(); initAssistant();
    runLoader();
    console.log("%cKaruniya Premnath — type in the terminal, or press keys 1–6 / T.", "color:#363f4d");
  });
})();
