/* ============================================================
   CONTROL TOWER · content
   Everything on the page renders from this object.
   ============================================================ */
window.CT = {
  name: "Saravanan B",
  role: "Supply Chain Analyst",
  org: "Ford Global Technical & Business Center, Chennai",
  tag: "SAP EWM · Process Automation · Packaging",
  photo: "assets/portrait.webp",
  cv: "assets/resume.pdf",
  email: "bsaravanan250@gmail.com",
  linkedin: "https://linkedin.com/in/saravanan-b",
  github: "https://github.com/bsaravanan250-sketch",
  summary:
    "Eight years across supply chain management, packaging development, procurement and " +
    "process automation. I find the week-long manual cycle nobody questions any more and " +
    "turn it into an hour: 17 automation tools in production, business-side owner of an " +
    "SAP EWM rollout for two plants, and $0.7M in packaging cost savings.",

  kpis: [
    { value: 8,    suffix: "",    label: "Years in supply chain",  note: "Glovis · Ford" },
    { value: 17,   suffix: "",    label: "Automations in production", note: "VBA · Power Automate · BigQuery" },
    { value: 66,   suffix: "+",   label: "Hours returned per week", note: "sum of the seven tools listed" },
    { value: 0.7,  prefix: "$", suffix: "M", decimals: 1, label: "Packaging savings", note: "Struandale Engine Plant" },
  ],

  ticker: [
    "ASN RECEIPTS · DB2 → BIGQUERY", "EWM KPI BOWLER · 25 PLANTS · WEEKLY", "SUPPLIER RECOMMIT · ≈100 MAILS / WK",
    "ZERO SINGLE-USE PLASTIC · 100%", "N-TIER SUPPLIERS MAPPED", "VALIDATION CYCLE · 1 WEEK → 1 HOUR",
    "SAP EWM · 2 PLANTS · LIVE", "60 TEST CASES · UAT · 10 USERS", "RELOCATION · DE · NL · LU · PL",
  ],

  /* The Line: one station per career phase; `part` is the car layer fitted there */
  stations: [
    { n: "01", part: "chassis", partName: "Chassis", title: "Foundations", when: "2011 – 2017", where: "Chennai",
      lead: "The frame everything else bolts onto.",
      bullets: ["B.E. Computer Engineering, Loyola Institute of Technology", "MBA Operations Management, Saveetha Engineering College", "Engineering habit: ask how the process actually works before changing it"] },
    { n: "02", part: "body", partName: "Body shell", title: "Packaging Engineer", when: "2018 – 2021", where: "Glovis India",
      lead: "Export packaging for CKD cars, costed by Incoterm.",
      bullets: ["P&F and export cost calculations for every destination; ECOs, BOM verification, per-car profit analysis", "2% per-car saving from packing quantities; INR 28,000 across 60 car sets from vanning efficiency", "Vendor sourcing, SOB fixing and capacity evaluation; initiated the Hyundai WIA returnable packing programme"] },
    { n: "03", part: "wheels", partName: "Wheels", title: "Crisis Sourcing", when: "2021 – 2022", where: "Ford GTBC",
      lead: "Joined mid-pandemic. First job: keep the lines rolling.",
      bullets: ["Alternative-sourcing plans and supplier coordination through COVID-19 and the China lockdown", "Supplier Risk Analysis scorecard; N-Tier supplier map for the global semiconductor shortage", "Tableau dashboard auto-generating Semiconductor Value Stream Mapping reports for senior management"] },
    { n: "04", part: "paint", partName: "Paint & finish", title: "Packaging & EWM", when: "2022 – 2024", where: "Ford · Struandale, SA",
      lead: "The savings programme and the warehouse system.",
      bullets: ["$0.7M packaging cost savings at Struandale Engine Plant; 100% of single-use plastic eliminated", "Business-side owner of the SAP EWM rollout for 2 plants: requirements, process maps, 60 test cases, UAT with 10 users, go-live", "PGP Digital Supply Chain Management (Purdue / Simplilearn); Tableau Certified"] },
    { n: "05", part: "glass", partName: "Glass & electronics", title: "Automation Cell", when: "2023 – Present", where: "Ford GTBC",
      lead: "Seventeen tools. About 66 hours a week that no longer exist.",
      bullets: ["Validation tool: a one-week manual cycle compressed into one hour (~40x)", "Supplier Onboarding on the Ford Portal rebuilt as a fully automated pipeline with zero manual handoffs", "Power Platform at scale: recommit flows (~100 mails/week) and weekly Power BI KPI delivery to 25 plants"] },
    { n: "06", part: "lights", partName: "Lights on · PDI passed", title: "End of Line", when: "2026 →", where: "Europe",
      lead: "Ready to ship.",
      bullets: ["Target: supply chain analytics or process automation roles in Germany, the Netherlands, Luxembourg or Poland", "EU Blue Card eligible · 60-day notice", "Next build: Python beyond the basics, LLM-assisted operations"] },
  ],

  /* Bill of Materials: qty is proficiency 1–5 (of 5) */
  bom: [
    { pn: "AUT-001", desc: "VBA (Advanced)",            cat: "Automation", qty: 5, used: ["WO-01", "WO-05"] },
    { pn: "AUT-002", desc: "Power Automate",            cat: "Automation", qty: 5, used: ["WO-02", "WO-03", "WO-08", "WO-09"] },
    { pn: "AUT-003", desc: "Power Query",               cat: "Automation", qty: 4, used: ["WO-05"] },
    { pn: "AUT-004", desc: "Alteryx",                   cat: "Automation", qty: 3, used: [] },
    { pn: "DAT-001", desc: "SQL · Google BigQuery",     cat: "Data",       qty: 5, used: ["WO-04"] },
    { pn: "DAT-002", desc: "Microsoft Excel (Advanced)", cat: "Data",      qty: 5, used: ["WO-01", "WO-03"] },
    { pn: "DAT-003", desc: "Python (basics)",           cat: "Data",       qty: 2, used: ["WO-10"] },
    { pn: "BI-001",  desc: "Tableau (Certified)",       cat: "BI",         qty: 4, used: ["WO-11"] },
    { pn: "BI-002",  desc: "Power BI distribution",     cat: "BI",         qty: 3, used: ["WO-09"] },
    { pn: "SYS-001", desc: "SAP EWM",                   cat: "Systems",    qty: 4, used: ["WO-05", "WO-12"] },
    { pn: "SYS-002", desc: "HTML · Google Places API",  cat: "Systems",    qty: 3, used: ["WO-06", "WO-07"] },
    { pn: "SYS-003", desc: "SharePoint · Teams",        cat: "Systems",    qty: 4, used: ["WO-03", "WO-08"] },
    { pn: "DOM-001", desc: "Packaging development (OEM, Tier-1, CKD/SKD/IPO)", cat: "Domain", qty: 5, used: ["WO-13"] },
    { pn: "DOM-002", desc: "P&F & export costing",      cat: "Domain",     qty: 5, used: [] },
    { pn: "DOM-003", desc: "Procurement · strategic sourcing · SOB", cat: "Domain", qty: 4, used: ["WO-02"] },
    { pn: "DOM-004", desc: "Supplier risk analysis (N-Tier)", cat: "Domain", qty: 4, used: ["WO-08"] },
    { pn: "DOM-005", desc: "Inventory control · obsolescence", cat: "Domain", qty: 4, used: ["WO-12"] },
    { pn: "DOM-006", desc: "Process design & UAT",      cat: "Domain",     qty: 5, used: ["WO-12", "WO-02"] },
    { pn: "DOM-007", desc: "Lean Six Sigma (3 Green Belt projects assisted)", cat: "Domain", qty: 3, used: [] },
  ],

  /* Work orders: automation tools. `hrs` is hours saved per week where the CV states it */
  workOrders: [
    { id: "WO-01", title: "Validation Tool",                 stack: "VBA · Excel",                   hrs: 35, text: "A one-week manual validation cycle compressed into one hour, roughly a 40x productivity gain.", status: "In production" },
    { id: "WO-02", title: "Supplier Onboarding Pipeline",    stack: "Ford Portal · Process redesign", hrs: null, text: "End-to-end onboarding workflow redesigned; every manual handoff removed. Runs fully automated.", status: "In production" },
    { id: "WO-03", title: "Supplier Meeting Auto-Scheduler", stack: "Power Automate · Teams · Excel", hrs: 5,  text: "Books supplier Teams meetings from Excel across 12 countries with time-zone lookup and slot fallback.", status: "In production" },
    { id: "WO-04", title: "DB2 → BigQuery KPI Migration",    stack: "SQL · BigQuery",                hrs: 6,  text: "Legacy DB2 ASN-receipt queries rebuilt in BigQuery, powering a weekly receiving-method-mix KPI per plant.", status: "In production" },
    { id: "WO-05", title: "EWM Cost Calculation Tool",       stack: "VBA · Power Query · SAP EWM",   hrs: 4,  text: "Annual savings per plant from an EWM launch across five cost levers, with a per-plant dashboard.", status: "In production" },
    { id: "WO-06", title: "Address Validator",               stack: "HTML · Google Places API",      hrs: 6,  text: "Validates, standardises and geocodes supplier addresses at scale.", status: "In production" },
    { id: "WO-07", title: "Logistics Route Mapping Tool",    stack: "HTML",                          hrs: 6,  text: "Interactive map of supplier-to-plant routes and transit chokepoints. Replaced manual route analysis entirely.", status: "In production" },
    { id: "WO-08", title: "Supplier Recommit Intake",        stack: "Power Automate · Resilinc · SharePoint", hrs: null, text: "Event-triggered recommit mails after disruption events plus a daily Ascent × Resilinc cross-file validation. ≈100 mails/week, 48-hour reminder cycles.", status: "In production" },
    { id: "WO-09", title: "RPA Robot Replacement",           stack: "Power Automate",                hrs: 4,  text: "A legacy RPA robot rebuilt as a native cloud flow; bot licensing and maintenance eliminated.", status: "In production" },
    { id: "WO-11", title: "Semiconductor VSM Dashboard",     stack: "Tableau",                       hrs: null, text: "Auto-generates Semiconductor Value Stream Mapping reports for senior management; manual reporting effort removed.", status: "Delivered" },
    { id: "WO-12", title: "SAP EWM Rollout, 2 Plants",       stack: "SAP EWM · UAT · Go-live",       hrs: null, text: "Business-side owner: frozen requirements, inbound/outbound/internal process maps, 60 test cases, UAT with 10 users, go-live support.", status: "Delivered" },
    { id: "WO-13", title: "Struandale Packaging Programme",  stack: "Packaging engineering",         hrs: null, text: "$0.7M in packaging cost savings at the South Africa engine plant and 100% elimination of single-use plastic packaging.", status: "Delivered" },
    { id: "WO-10", title: "Stock Analyzer (personal)",       stack: "Python · GitHub Actions",       hrs: null, text: "A self-publishing daily brief for the NIFTY 200 with a backtested ranking rule.", status: "Side project", link: "https://github.com/bsaravanan250-sketch/stock-analyzer" },
  ],
  takt: { label: "Validation cycle, hours per run", before: { name: "Before · manual", hours: 40 }, after: { name: "After · VBA tool", hours: 1 } },

  /* Route map. lat/lon; kind: hub | delivered | next */
  nodes: [
    { id: "chn", name: "Chennai",         sub: "Hub · Ford GTBC, Glovis", lat: 13.08, lon: 80.27,  kind: "hub" },
    { id: "pe",  name: "Struandale, SA",  sub: "$0.7M saved · zero plastic", lat: -33.96, lon: 25.60, kind: "delivered" },
    { id: "kr",  name: "Ulsan, Korea",    sub: "Hyundai · KIA CKD exports", lat: 35.54, lon: 129.31, kind: "delivered" },
    { id: "us",  name: "Dearborn, USA",   sub: "Ford global programmes", lat: 42.32, lon: -83.21, kind: "delivered" },
    { id: "de",  name: "Germany",         sub: "Target", lat: 50.11, lon: 8.68,  kind: "next" },
    { id: "nl",  name: "Netherlands",     sub: "Target", lat: 52.37, lon: 4.90,  kind: "next" },
    { id: "lu",  name: "Luxembourg",      sub: "Target", lat: 49.61, lon: 6.13,  kind: "next" },
    { id: "pl",  name: "Poland",          sub: "Target", lat: 52.23, lon: 21.01, kind: "next" },
  ],
  routes: [
    { from: "chn", to: "pe", kind: "delivered" }, { from: "chn", to: "kr", kind: "delivered" }, { from: "chn", to: "us", kind: "delivered" },
    { from: "chn", to: "de", kind: "next" }, { from: "chn", to: "nl", kind: "next" }, { from: "chn", to: "lu", kind: "next" }, { from: "chn", to: "pl", kind: "next" },
  ],

  /* Shift log */
  log: [
    { when: "2011", title: "Clock in", text: "B.E. Computer Engineering begins at Loyola Institute of Technology." },
    { when: "2015", title: "MBA, Operations", text: "Saveetha Engineering College. Supply chain and operations become the lane." },
    { when: "Apr 2018", title: "Glovis India", text: "Packaging Engineer. Export costing, CKD packaging, vendor sourcing." },
    { when: "2020", title: "Returnable packing", text: "Hyundai WIA returnable programme initiated; KIA CKD export costing." },
    { when: "Mar 2021", title: "Ford GTBC Chennai", text: "Supply Chain Analyst. COVID sourcing, then the semiconductor shortage." },
    { when: "2022", title: "Struandale", text: "$0.7M packaging savings, 100% single-use plastic eliminated. PGP DSCM and Tableau certification." },
    { when: "2023", title: "Automation cell", text: "Validation tool ships: one week to one hour. The tool count starts climbing." },
    { when: "2024", title: "SAP EWM go-live", text: "Two plants. 60 test cases, UAT with 10 users, business-side ownership end to end." },
    { when: "2025", title: "Seventeen", text: "Supplier onboarding fully automated; Power Platform flows across 25 plants." },
    { when: "2026", title: "Dispatch", text: "Open to Germany, Netherlands, Luxembourg, Poland. EU Blue Card eligible. 60-day notice.", now: true },
  ],
};
