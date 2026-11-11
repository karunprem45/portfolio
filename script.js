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
    { group: "LLMs & Agents", items: [["LangGraph", "proficient"], ["RAG / Chroma", "proficient"], ["Claude / Gemini APIs", "proficient"], ["spaCy NER", "proficient"], ["LLM Evaluation", "proficient"]] },
    { group: "Data Engineering & MLOps", items: [["PostgreSQL", "proficient"], ["PySpark", "proficient"], ["Airflow", "proficient"], ["BigQuery", "proficient"], ["MLflow", "proficient"], ["FastAPI", "proficient"], ["Docker", "proficient"], ["GitHub Actions", "proficient"], ["GCP / Cloud Run", "proficient"], ["ONNX Runtime", "proficient"]] },
    { group: "Visualization", items: [["Matplotlib", "advanced"], ["Seaborn", "advanced"], ["Plotly", "proficient"], ["Streamlit", "advanced"]] },
    { group: "Tools & Platforms", items: [["Firebase", "advanced"], ["Google Maps API", "proficient"], ["IoT Integration", "proficient"], ["Audacity", "advanced"]] },
  ];

  const WORK = [
    { title: "Null Hypothesis — Decentralized Evidence Agents (ScienceClaw)",
      year: "Nov 2026",
      desc: "Built on MIT Media Lab's ScienceClaw: five AI agents, each able to open only its own folder of genetic evidence, coordinate through a shared needs board with no central planner to find protective loss-of-function drug targets. 40 genes (12 real targets hidden among 28 look-alikes, names masked). Pre-registered and hash-frozen before results; coordination lowered specialist scores in all 5 reruns (mean −0.053, 95% CI −0.090 to −0.017), and the top-ranked look-alike turned out to be ACVR1C, a gene linked to 54% lower type 2 diabetes risk. I built the specialist agents, the skeptic, the needs board and the Evo 2 agent.",
      tags: ["Multi-agent", "Gemini", "NVIDIA Evo 2", "Python", "Pre-registration"],
      metric: "5",
      metricLabel: "agents, no planner",
      link: "https://karunprem45.github.io/null-hypothesis/",
      repo: "https://github.com/karunprem45/null-hypothesis" },
    { title: "TrialReach — Research Deserts of Massachusetts",
      year: "Oct 2026",
      desc: "Hackachusetts 2026 (Healthcare & Biotech). Maps where people carry the most disease but have the fewest recruiting clinical trials nearby. Joins ClinicalTrials.gov, CDC PLACES and MassGIS into a per-county Research Desert Score across 9 diseases and 351 towns, with nearest trials, candidate host hospitals, environmental-justice outreach towns and an optional AI recruitment brief in 5 languages. For diabetes, Hampden County has about 21× more adults per nearby trial than Boston's Suffolk County.",
      tags: ["Python", "Streamlit", "Geospatial", "Public Health", "LLM"],
      metric: "21×",
      metricLabel: "desert gap found",
      link: "https://trialreach.streamlit.app",
      repo: "https://github.com/karunprem45/trialreach" },
    { title: "SkinSort — MLOps Teledermatology Triage",
      year: "Oct 2026 – present",
      desc: "Team MLOps project (IE7374): reorders dermatology review queues by urgency instead of first-come, first-served. An image-quality gate, a multimodal image + questionnaire model with calibrated routine / priority / urgent probabilities, and a safety rule that promotes high-risk cases. Full lifecycle on GCP: versioned data, MLflow tracking and registry, FastAPI on Cloud Run, Cloud SQL, Prometheus + Grafana monitoring, CI/CD, and a human-approved Vertex AI retraining loop with skin-tone fairness checks.",
      tags: ["MLOps", "GCP / Vertex AI", "MLflow", "FastAPI", "Docker"],
      metric: "3-tier",
      metricLabel: "urgency triage",
      repo: "https://github.com/karunprem45/skinSort" },
    { title: "SkillRadar — Live Job-Market Intelligence", year: "Jul 2026 – present",
      desc: "A self-updating data product tracking the US data-careers job market, running unattended since July: 10,200+ postings ingested from 4 APIs every 6 hours via GitHub Actions (370+ automated pipeline runs), rule-based skill extraction validated against a hand-labeled gold set (F1 0.995), a salary-prediction model retrained daily on 9,700+ salaried postings (17% MAE improvement over baseline), KMeans role archetypes revealing a $78K analyst-to-ML pay gap, and phone alerts for new openings — all at $0/month.",
      tags: ["Python", "scikit-learn", "Streamlit", "GitHub Actions", "SQL"], metric: "10K+", metricLabel: "postings tracked",
      link: "https://skillradar-ywyoyxql2yxvmxmcl2pbxg.streamlit.app/",
      video: "assets/skillradar-demo.mp4",
      repo: "https://github.com/karunprem45/skillradar" },
    { title: "CareRoute — Cost-Aware Care-Navigation Agent",
      year: "Nov 2026",
      desc: "A Gemini function-calling agent that answers practical patient and caregiver questions (rides, bills, support groups, visit prep). A guard sends urgent or clinical messages to a human before any model call, a router picks Flash-Lite or Flash by complexity, an LRU + TTL cache cuts repeat calls, and failures retry once on the other model before handing off. Every step is traced to SQLite with tokens, latency and cost, and an eval harness scores 4 configurations on 24 labeled cases. FastAPI backend, Next.js + TypeScript front end, Cloud Run deploy.",
      tags: ["Gemini", "FastAPI", "Next.js", "TypeScript", "Cloud Run"],
      metric: "4",
      metricLabel: "configs evaluated",
      repo: "https://github.com/karunprem45/careroute" },
    { title: "CoopPilot — Agentic RAG Career Assistant",
      year: "Nov 2026",
      desc: "A LangGraph agent that reads a job description and résumé, retrieves similar real postings from a Chroma vector store, checks a NetworkX skill co-occurrence graph and drafts a fit plan, then pauses for human approval before finalizing. Retrieval is evaluated with hit@k and MRR against a TF-IDF baseline and logged to MLflow. FastAPI + Streamlit, Docker Compose, tested and image-built in GitHub Actions, deployable to AWS App Runner.",
      tags: ["LangGraph", "RAG", "Chroma", "Claude", "MLflow", "AWS"],
      metric: "HITL",
      metricLabel: "human review gate",
      repo: "https://github.com/karunprem45/cooppilot" },
    { title: "AuthFlow — AI Prior-Authorization Intake",
      year: "Nov 2026",
      desc: "Reads free-text pharmacy prior-authorization requests, extracts a fixed set of fields (regex baseline vs Claude with a forced tool call), applies deterministic plan rules and routes each case to needs-info, no-PA-needed, meets-criteria or pharmacist review. It never denies a request. SQLite queue with expedited-first ordering and an audit log, plus the analyst side: discovery, requirements mapped to tests, test plan and user guide. On 60 synthetic cases the baseline made zero false clearances.",
      tags: ["Claude", "Python", "SQLite", "Healthcare", "Business Analysis"],
      metric: "0",
      metricLabel: "false clearances",
      repo: "https://github.com/karunprem45/authflow" },
    { title: "TrialParse — LLM Eligibility Extraction",
      year: "Nov 2026",
      desc: "Turns free-text ClinicalTrials.gov eligibility criteria into structured, queryable SQLite tables (labs, thresholds, excluded conditions), comparing Claude with a forced tool schema against a regex baseline on a hand-labeled gold set with strict dev/test separation. Field-level accuracy and P/R/F1, agreement with the registry's own structured fields, prompt-versioned caching, and a weekly GitHub Actions refresh that only re-extracts changed trials.",
      tags: ["Claude", "Information Extraction", "SQLite", "GitHub Actions"],
      metric: "40",
      metricLabel: "hand-labeled trials",
      repo: "https://github.com/karunprem45/trialparse" },
    { title: "JobFit — Full-Stack Skill Matcher", year: "Aug 2026",
      desc: "Paste a job description, see which of your skills it actually asks for. A React front-end and Node/Express REST API over a PostgreSQL skill catalog, with an n-gram hash-set matcher that cuts matching from O(n×m) to O(n+m) (~30,000 comparisons → ~560) and a Python/scikit-learn microservice for semantic matching. Containerised with Docker (multi-stage builds, ~400MB → ~25MB images), deployable to Kubernetes with health probes, and tested and built in GitHub Actions.",
      tags: ["React", "Node / Express", "PostgreSQL", "Docker", "Kubernetes", "scikit-learn"], metric: "O(n+m)", metricLabel: "skill matching",
      link: "https://karunprem45.github.io/jobfit/",
      repo: "https://github.com/karunprem45/jobfit" },
    { title: "Skill NER — spaCy on Regex Silver Labels",
      year: "Oct 2026",
      desc: "Can a spaCy NER model learn job-posting skills from labels a regex generated? 4,000 SkillRadar postings became 14,592 silver spans; the trained model was scored on a separate hand-labeled gold set: 0.972 F1 vs the regex teacher's 0.995, with all misses on rare multi-word skills, and only 0.6% of entities outside the vocabulary — an honest look at what silver-label training can and can't do.",
      tags: ["spaCy", "NER", "NLP", "Python"],
      metric: "0.972",
      metricLabel: "F1 on gold set",
      repo: "https://github.com/karunprem45/skill-ner" },
    { title: "FieldPulse — Machine Telemetry Data Pipeline",
      year: "Nov 2026",
      desc: "Validates, cleans and loads 1 Hz field-test sensor logs (RPM, coolant temp, speed, fuel rate, hydraulic pressure) into SQLite with a quality flag on every row. Schema checks, dedupe, gap reindexing, bounded interpolation, range and stuck-sensor rules, plus a robust gradient-boosted cross-signal model that catches faults like fuel leaks that single-signal rules miss. Idempotent, SHA-256-tracked loads; evaluated against 7 injected fault types.",
      tags: ["Python", "pandas", "Anomaly Detection", "SQLite", "Data Quality"],
      metric: "7",
      metricLabel: "fault types detected",
      repo: "https://github.com/karunprem45/fieldpulse" },
    { title: "WearWatch — Predictive Maintenance at the Edge",
      year: "Nov 2026",
      desc: "Predicts milling-machine failures on the AI4I 2020 dataset with physics-motivated features and a class-balanced random forest, threshold tuned on validation for 90% recall and judged by PR-AUC. Exported to ONNX with a parity check, served by FastAPI under a 1 CPU / 512 MB limit, with k-in-a-row + hysteresis alerts so one noisy reading never pages a technician. Docker Compose replays 5 simulated machines.",
      tags: ["scikit-learn", "ONNX Runtime", "FastAPI", "Docker"],
      metric: "90%",
      metricLabel: "target recall",
      repo: "https://github.com/karunprem45/wearwatch" },
    { title: "PulseFeat — Blood Pressure from PPG",
      year: "Nov 2026",
      desc: "Estimates systolic and diastolic blood pressure from the optical pulse signal (UCI / MIMIC-II, 125 Hz). Zero-phase band-pass filtering, signal-quality rejection, beat detection, physiologically motivated waveform features (rise time, reflected-wave timing, second-derivative b/a ratio, HRV), and ridge / gradient-boosting models scored with subject-wise GroupKFold so no person leaks across train and test.",
      tags: ["Signal Processing", "SciPy", "scikit-learn", "Biomedical"],
      metric: "125 Hz",
      metricLabel: "PPG pipeline",
      repo: "https://github.com/karunprem45/pulsefeat" },
    { title: "GraspPath — Robot Pick-and-Place from Scratch",
      year: "Nov 2026",
      desc: "Pick-and-place around a wall for a 7-joint Franka Panda in PyBullet, with everything but the physics written in NumPy: DH forward kinematics, Jacobian and damped-least-squares IK with restarts, sphere-chain collision checking, RRT-Connect planning with shortcut smoothing, trapezoidal velocity profiles within joint limits, and a state machine with grasp retry.",
      tags: ["Robotics", "NumPy", "PyBullet", "Motion Planning"],
      metric: "7-DOF",
      metricLabel: "arm, from-scratch IK",
      repo: "https://github.com/karunprem45/grasppath" },
    { title: "PitchTrack — Statcast ETL + Dashboard",
      year: "Nov 2026",
      desc: "ETL of public pitch-by-pitch Statcast data into a PostgreSQL schema of pitchers, games and pitches, with idempotent upserts, JSON run reports and a Streamlit + Plotly dashboard. One month loaded 117,333 pitches across 533 pitchers and 392 games; SQL queries surface findings like a starter's four-seamer gaining velocity deep into games.",
      tags: ["PostgreSQL", "ETL", "Streamlit", "Plotly", "SQL"],
      metric: "117K",
      metricLabel: "pitches loaded",
      repo: "https://github.com/karunprem45/pitchtrack" },
    { title: "HireStream — Job-Posting Data Pipeline",
      year: "Nov 2026",
      desc: "Batch pipeline that deduplicates raw job-board postings with PySpark, loads them into partitioned BigQuery (and optionally Snowflake) and runs on an Airflow schedule every 6 hours with a row-count check after each load and JSON reports per step.",
      tags: ["PySpark", "BigQuery", "Snowflake", "Airflow"],
      metric: "6 h",
      metricLabel: "Airflow schedule",
      repo: "https://github.com/karunprem45/hirestream" },
    { title: "ML From Scratch",
      year: "Oct 2026",
      desc: "Linear regression, L2-regularized logistic regression and k-means++ written with NumPy only, then matched against scikit-learn on the same data: identical test R² (0.4526), accuracy (0.9737) and inertia, with an adjusted Rand index of 1.0 on clustering.",
      tags: ["NumPy", "Machine Learning", "pytest"],
      metric: "1:1",
      metricLabel: "parity with sklearn",
      repo: "https://github.com/karunprem45/ml-from-scratch" },
    { title: "Youth Tobacco Use Prediction & Policy Analysis", year: "Apr 2026",
      desc: "A multi-country study (GYTS) merging GYTS, WHO MPOWER and World Bank data into a 522 country-year panel. A regularized XGBoost model with SHAP explainability plus K-Means/UMAP clustering pinpointed peer exposure and secondhand smoke as top predictors — and showed policy upgrades could cut youth smoking prevalence by up to 7.34 points in high-risk countries.",
      tags: ["XGBoost", "SHAP", "K-Means / UMAP", "Policy Analytics"], metric: "187", metricLabel: "countries analyzed",
      repo: "https://github.com/karunprem45/gyts-policy-study" },
    { title: "Decision-Support System for Smart Agriculture", year: "Apr 2026",
      desc: "A visualization-first Android platform integrating a CNN for crop-disease detection, an XGBoost crop-recommendation engine (2,200 records, 22 crops) and a soil-analysis module, synced in real time via Firebase. Color-coded, farmer-readable charts turn every AI output into an actionable insight for low-literacy, non-technical users (P–K correlation r = 0.74).",
      tags: ["CNN", "XGBoost", "Firebase", "Android", "Data Viz"], metric: "22", metricLabel: "crops modeled",
      repo: "https://github.com/karunprem45/agriviz-android" },
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
          <h3 class="wi-title">${w.link ? `<a href="${w.link}" target="_blank" rel="noopener">${w.title} <span class="wi-live">live ↗</span></a>` : w.title}</h3>
          ${w.repo ? `<a class="wi-live wi-code" href="${w.repo}" target="_blank" rel="noopener">code ↗</a>` : ""}
          <p class="wi-desc">${w.desc}</p>
          ${w.video ? `<video class="wi-video" src="${w.video}" autoplay muted loop playsinline></video>` : ""}
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
      { k: ["skill", "tech", "stack", "tool", "language", "know"], a: "My core toolkit is Python, SQL and R. For modeling I use Scikit-learn, TensorFlow, Keras and XGBoost — including SVMs, LSTMs and CNNs. I lean on SHAP for explainability and K-Means and UMAP for clustering, visualize with Matplotlib, Seaborn, Plotly and Streamlit. On the engineering side I build LLM agents and RAG with LangGraph, Claude and Gemini, data pipelines with PostgreSQL, PySpark, Airflow and BigQuery, and ship models with MLflow, FastAPI, Docker, GitHub Actions and Google Cloud." },
      { k: ["project", "work", "built", "made", "portfolio"], a: "I've built " + WORK.length + " projects you can see in the Work section. Highlights: Null Hypothesis, a decentralized multi-agent system for finding drug targets; TrialReach, a hackathon app mapping Massachusetts' clinical-research deserts; SkinSort, an end-to-end MLOps triage system on Google Cloud; SkillRadar, a live job-market data product; and LLM agents like CareRoute and CoopPilot. Ask about any of them!" },
      { k: ["null hypothesis", "scienceclaw", "drug target", "gene", "multi-agent", "agents"], a: "Null Hypothesis is built on MIT Media Lab's ScienceClaw. Five AI agents each see only their own slice of genetic evidence and coordinate through a shared needs board, with no planner, to find protective loss-of-function drug targets among 40 masked genes. It was pre-registered and hash-frozen, and a surprising result was that coordination made the specialists slightly worse in all five reruns." },
      { k: ["trialreach", "clinical trial", "research desert", "hackathon", "massachusetts"], a: "TrialReach was my Hackachusetts 2026 project. It scores every Massachusetts county by how many people with a disease there are per nearby recruiting trial. For diabetes, Hampden County has about 21 times more adults per trial than Boston's Suffolk County." },
      { k: ["skinsort", "mlops", "derma", "skin", "triage", "vertex"], a: "SkinSort is a team MLOps project that reorders dermatology review queues by urgency. It runs on Google Cloud with MLflow, FastAPI on Cloud Run, Prometheus and Grafana monitoring, CI/CD and a human-approved retraining loop with skin-tone fairness checks." },
      { k: ["careroute", "cooppilot", "authflow", "llm", "rag", "langgraph", "gemini", "claude"], a: "I build LLM systems with guardrails: CareRoute is a cost-aware Gemini agent with human handoff and per-step cost tracing; CoopPilot is a LangGraph RAG agent with a human review gate; AuthFlow and TrialParse use Claude with forced tool calls for structured extraction, always measured against a regex baseline." },
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
