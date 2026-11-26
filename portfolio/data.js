/* =====================================================================
   PORTFOLIO CONTENT
   This is the only file you need to edit. Every section of the site is
   rendered from this object. Built from Saravanan B's CV (Nov 2026).
   Photo: drop assets/portrait.jpg and set `photo` below.
   ===================================================================== */
window.PORTFOLIO = {
  /* ---------- identity ---------- */
  name: "Saravanan B",
  shortName: "Saravanan",
  initial: "S",
  tagline: "The Series",
  role: "Supply Chain Analyst · SAP EWM · Process Automation",
  photo: "assets/portrait.svg",          // swap for assets/portrait.jpg
  location: "Chennai, India",
  email: "bsaravanan250@gmail.com",
  resumeUrl: "assets/resume.pdf",
  links: {
    linkedin: "https://linkedin.com/in/saravanan-b",
    github: "https://github.com/bsaravanan250-sketch",
  },

  /* ---------- hero ---------- */
  hero: {
    badges: ["8 Years", "Ford GTBC, Chennai", "17 Automations", "$0.7M Saved", "EU Blue Card eligible"],
    summary:
      "Supply Chain Analyst with 8 years across supply chain management, packaging development, " +
      "procurement and process automation. Designed and deployed 17 automation solutions in VBA, " +
      "Power Automate, SQL/BigQuery and Alteryx, owned the business side of an SAP EWM rollout for " +
      "2 plants, and delivered $0.7M in packaging cost savings.",
    stat: { label: "Hrs saved / week", value: "66+" },
    match: "98% Match",
  },

  /* ---------- "Who's watching?" profiles ----------
     Each profile re-orders the Continue Exploring row so the right
     episode plays first. `first` is the id of the section to lead with. */
  profiles: [
    { id: "me",        name: "Me",             kind: "photo", color: "#b20710", blurb: "The full series, in order",            first: "resume" },
    { id: "recruiter", name: "Recruiter",      kind: "glyph", glyph: "R",   color: "#0e7490", blurb: "Resume, credentials & skills first",  first: "resume" },
    { id: "manager",   name: "Hiring Manager", kind: "glyph", glyph: "★",   color: "#b45309", blurb: "Savings, rollouts & impact first",     first: "achievements" },
    { id: "engineer",  name: "Engineer",       kind: "glyph", glyph: "</>", color: "#15803d", blurb: "Automation tools & the stack first",   first: "projects" },
  ],

  /* ---------- Continue Exploring (episode cards under the hero) ---------- */
  episodes: [
    { id: "resume",       n: "01", title: "The Full Story",   sub: "Resume · 1 page",          theme: "violet" },
    { id: "achievements", n: "02", title: "My Achievements",  sub: "Impact · 6 moments",       theme: "crimson" },
    { id: "skills",       n: "03", title: "My Skills",        sub: "Genres · 6 categories",    theme: "teal" },
    { id: "projects",     n: "04", title: "My Automations",   sub: "Originals · 8 tools",      theme: "ember" },
    { id: "journey",      n: "05", title: "My Journey",       sub: "5 seasons · 2011 → now",   theme: "gold" },
  ],

  /* ---------- Resume: "The Full Story" ---------- */
  resume: {
    fullName: "Saravanan B",
    contact: ["bsaravanan250@gmail.com", "Chennai, India", "linkedin.com/in/saravanan-b", "Open to relocation: DE · NL · LU · PL"],
    education: [
      { title: "PGP, Digital Supply Chain Management", sub: "Simplilearn, in collaboration with Purdue University", when: "2022" },
      { title: "MBA, Operations Management",           sub: "Saveetha Engineering College, Chennai",               when: "2015 – 2017" },
      { title: "B.E., Computer Engineering",            sub: "Loyola Institute of Technology, Chennai",            when: "2011 – 2015" },
    ],
    experience: [
      {
        title: "Supply Chain Analyst · Ford Global Technical & Business Center, Chennai",
        when: "Mar 2021 – Present",
        bullets: [
          "Restructured and automated Supplier Onboarding on the Ford Portal into a fully automated pipeline with no manual handoffs.",
          "Owned business-side delivery of the SAP EWM rollout for 2 plants: requirements, process mapping, 60 test cases, UAT with 10 users, go-live.",
          "Delivered $0.7M in packaging cost savings at Struandale Engine Plant (South Africa) and eliminated 100% of single-use plastic packaging.",
          "Built a Supplier Risk Analysis scorecard and mapped N-Tier suppliers through COVID-19, the China lockdown and the semiconductor shortage.",
          "Built a Tableau dashboard that auto-generates Semiconductor Value Stream Mapping reports for senior management.",
          "Assisted on 3 Lean Six Sigma Green Belt projects; authored management-recognised documentation for 4 critical processes.",
        ],
      },
      {
        title: "Packaging Engineer · Glovis India Private Limited, Chennai",
        when: "Apr 2018 – Mar 2021",
        bullets: [
          "P&F and export cost calculations for all destinations by Incoterms; ECOs, BOM verification and per-car profit analysis.",
          "2% per-car cost saving by optimising packing quantities; INR 28,000 saved across 60 car sets through vanning efficiency.",
          "Vendor sourcing, negotiation, SOB fixing and capacity evaluation; initiated the Hyundai WIA returnable packing programme.",
        ],
      },
    ],
    projects: [
      { title: "Validation Tool",              sub: "VBA · 1 week → 1 hour, ~40x productivity gain" },
      { title: "Supplier Meeting Auto-Scheduler", sub: "Power Automate · 12 countries, time-zone lookup" },
      { title: "DB2 → BigQuery KPI Migration",  sub: "SQL / BigQuery · weekly receiving-mix KPI per plant" },
      { title: "Logistics Route Mapping Tool",  sub: "HTML · supplier-to-plant routes and chokepoints" },
    ],
    skills: [
      { label: "Automation", items: "VBA (Advanced), Power Automate, Power Query, Alteryx" },
      { label: "Data & SQL", items: "SQL & Google BigQuery, Microsoft Excel (Advanced), Python (basics)" },
      { label: "Analytics & BI", items: "Tableau, Power BI distribution, KPI reporting" },
      { label: "Systems", items: "SAP EWM, HTML, Google Places API, SharePoint" },
      { label: "Domain", items: "Supply chain, packaging development (OEM, Tier-1, CKD/SKD/IPO), procurement, strategic sourcing, supplier risk (N-Tier), inventory control, process design & UAT" },
      { label: "Languages", items: "English (fluent), Tamil (native)" },
    ],
    certifications: "Tableau Certified (2022) · PGP Digital Supply Chain Management, Simplilearn / Purdue University (2022).",
    achievements: [
      "17 automation solutions deployed, saving an estimated 66+ hours of manual work every week.",
      "$0.7M packaging cost savings and 100% elimination of single-use plastic packaging.",
      "Business-side owner of the SAP EWM rollout for 2 plants, requirements through go-live.",
    ],
    stats: [
      { value: "8",    label: "Years" },
      { value: "17",   label: "Automations" },
      { value: "$0.7M", label: "Saved" },
    ],
  },

  /* ---------- Achievements: "Top Moments" ---------- */
  moments: [
    { tag: "Cost Savings",        title: "$0.7M Saved",          org: "Struandale Engine Plant, South Africa", text: "Packaging efficiency improvements delivered $0.7M in savings and removed every piece of single-use plastic packaging.", link: "" },
    { tag: "Automation",          title: "17 Tools Shipped",     org: "VBA · Power Automate · BigQuery · Alteryx", text: "Seventeen automation solutions in production, including a validation tool that turned a one-week cycle into one hour.", link: "" },
    { tag: "ERP Rollout",         title: "SAP EWM, 2 Plants",    org: "Business-side owner",               text: "Froze requirements, mapped inbound, outbound and internal flows, wrote 60 test cases, led UAT with 10 users, supported go-live.", link: "" },
    { tag: "Sustainability",      title: "Zero Single-Use Plastic", org: "100% elimination",               text: "A landmark packaging milestone for the plant, achieved alongside the cost programme rather than at its expense.", link: "" },
    { tag: "Crisis Response",     title: "N-Tier Risk Map",      org: "COVID-19 · China lockdown · chip shortage", text: "Built a Supplier Risk Analysis scorecard and mapped N-Tier suppliers to keep lines running through three global disruptions.", link: "" },
    { tag: "Recognition",         title: "Process Documentation", org: "4 critical processes",            text: "Management-recognised documentation, plus support on 3 Lean Six Sigma Green Belt projects.", link: "" },
  ],
  credentialsLabel: "Credentials",
  certifications: [
    { issuer: "Tableau",    title: "Tableau Certified (2022)",                               link: "" },
    { issuer: "Purdue · Simplilearn", title: "PGP, Digital Supply Chain Management (2022)",  link: "" },
    { issuer: "Saveetha",   title: "MBA, Operations Management (2015 – 2017)",               link: "" },
    { issuer: "Loyola IT",  title: "B.E., Computer Engineering (2011 – 2015)",               link: "" },
  ],

  /* ---------- Skills: "My Skill Universe" ----------
     `used` lists project titles the skill appears in; shown on hover. */
  skillGroups: [
    { name: "Automation", sub: "Where most of the hours come back", skills: [
      { name: "VBA (Advanced)",  mono: "VB", used: ["Validation Tool", "EWM Cost Calculation Tool"] },
      { name: "Power Automate",  mono: "PA", used: ["RPA Robot Replacement", "Supplier Meeting Auto-Scheduler", "Supplier Recommit Intake", "Power BI Distribution"] },
      { name: "Power Query",     mono: "PQ", used: ["EWM Cost Calculation Tool"] },
      { name: "Alteryx",         mono: "Ax", used: [] },
      { name: "RPA → cloud flows", mono: "⟳", used: ["RPA Robot Replacement"] },
    ]},
    { name: "Data & SQL", sub: "Large-scale pulls and KPI reporting", skills: [
      { name: "Google BigQuery", mono: "BQ", used: ["DB2 → BigQuery KPI Migration"] },
      { name: "SQL",             mono: "SQL", used: ["DB2 → BigQuery KPI Migration"] },
      { name: "Excel (Advanced)", mono: "Xl", used: ["Validation Tool", "Supplier Meeting Auto-Scheduler"] },
      { name: "Python (basics)", mono: "Py", used: ["Stock Analyzer"] },
      { name: "SharePoint trackers", mono: "SP", used: ["Supplier Recommit Intake"] },
    ]},
    { name: "Analytics & BI", sub: "Dashboards management actually reads", skills: [
      { name: "Tableau",         mono: "Tb", used: ["Semiconductor VSM Dashboard"] },
      { name: "Power BI",        mono: "PB", used: ["Power BI Distribution"] },
      { name: "KPI design",      mono: "KP", used: ["DB2 → BigQuery KPI Migration", "EWM Cost Calculation Tool"] },
      { name: "Value Stream Mapping", mono: "VS", used: ["Semiconductor VSM Dashboard"] },
    ]},
    { name: "Systems & Web", sub: "ERP and the tools around it", skills: [
      { name: "SAP EWM",         mono: "SAP", used: ["SAP EWM Rollout", "EWM Cost Calculation Tool"] },
      { name: "HTML",            mono: "H5", used: ["Address Validator", "Logistics Route Mapping Tool", "Stock Analyzer"] },
      { name: "Google Places API", mono: "GP", used: ["Address Validator"] },
      { name: "Ford Supplier Portal", mono: "FP", used: ["Supplier Onboarding Automation"] },
      { name: "GitHub Actions",  mono: "GA", used: ["Stock Analyzer"] },
    ]},
    { name: "Supply Chain", sub: "The domain under the tooling", skills: [
      { name: "Packaging Development", mono: "Pk", used: ["Struandale Packaging Programme"] },
      { name: "P&F & Export Costing",  mono: "Ex", used: [] },
      { name: "Procurement & Sourcing", mono: "Pr", used: ["Supplier Onboarding Automation"] },
      { name: "Supplier Risk (N-Tier)", mono: "Rk", used: ["Supplier Recommit Intake"] },
      { name: "Inventory Control",      mono: "In", used: ["SAP EWM Rollout"] },
      { name: "Process Design & UAT",   mono: "UA", used: ["SAP EWM Rollout"] },
      { name: "Lean Six Sigma",         mono: "6σ", used: [] },
    ]},
    { name: "Interests", sub: "Coming soon to the series", skills: [
      { name: "Quant screening", mono: "Qs", used: ["Stock Analyzer"] },
      { name: "LLM-assisted ops", mono: "AI", used: [] },
      { name: "Python, properly", mono: "Py", used: [] },
    ]},
  ],

  /* ---------- Projects: "Originals" ---------- */
  projects: [
    {
      title: "Validation Tool",
      kicker: "VBA · Excel",
      theme: "crimson",
      icon: "bolt",
      text: "Compressed a one-week manual validation cycle into one hour. Roughly a 40x productivity gain and about 35 hours of analyst time returned every week.",
      tags: ["VBA", "Excel", "≈ 35 hrs/week"],
      link: "",
      repo: "",
    },
    {
      title: "Supplier Onboarding Automation",
      kicker: "Ford Supplier Portal · Process Redesign",
      theme: "ember",
      icon: "box",
      text: "Redesigned the end-to-end supplier onboarding workflow and removed every manual handoff. Now runs as a fully automated pipeline.",
      tags: ["Process design", "Automation", "Procurement"],
      link: "",
      repo: "",
    },
    {
      title: "SAP EWM Rollout",
      kicker: "SAP EWM · 2 Plants · Business Owner",
      theme: "teal",
      icon: "shield",
      text: "Froze requirements with warehouse stakeholders, mapped inbound, outbound and internal processes, authored 60 test cases, led UAT with 10 users and supported go-live.",
      tags: ["SAP EWM", "UAT", "Go-live"],
      link: "",
      repo: "",
    },
    {
      title: "Logistics Route Mapping Tool",
      kicker: "HTML · Interactive Dashboard",
      theme: "violet",
      icon: "map",
      text: "Maps supplier-to-plant logistics routes and transit chokepoints on one interactive screen. Replaced the manual route-analysis process entirely.",
      tags: ["HTML", "Logistics", "≈ 6 hrs/week"],
      link: "",
      repo: "",
    },
    {
      title: "DB2 → BigQuery KPI Migration",
      kicker: "SQL · Google BigQuery",
      theme: "gold",
      icon: "chart",
      text: "Rebuilt legacy DB2 ASN-receipt queries in BigQuery to power a weekly receiving-method-mix KPI for every plant.",
      tags: ["BigQuery", "SQL", "≈ 6 hrs/week"],
      link: "",
      repo: "",
    },
    {
      title: "Supplier Meeting Auto-Scheduler",
      kicker: "Power Automate · Teams",
      theme: "teal",
      icon: "bolt",
      text: "Books supplier Teams meetings straight from Excel across 12 countries, with time-zone lookup and automatic slot fallback.",
      tags: ["Power Automate", "12 countries", "≈ 5 hrs/week"],
      link: "",
      repo: "",
    },
    {
      title: "Address Validator",
      kicker: "HTML · Google Places API",
      theme: "ember",
      icon: "map",
      text: "Validates, standardises and geocodes supplier addresses at scale so downstream logistics data starts clean.",
      tags: ["Google Places API", "Data quality", "≈ 6 hrs/week"],
      link: "",
      repo: "",
    },
    {
      title: "Stock Analyzer",
      kicker: "Personal Project · Python · GitHub Actions",
      theme: "crimson",
      icon: "chart",
      text: "A self-publishing daily brief for the NIFTY 200: scores every stock on trend, momentum, relative strength and volume, checks the market regime, and posts a ranked dashboard with stop-loss and position size.",
      tags: ["Python", "GitHub Actions", "Backtesting"],
      link: "../",
      repo: "https://github.com/bsaravanan250-sketch/stock-analyzer",
    },
  ],

  /* ---------- About: "The Pilot" ---------- */
  about: {
    quote:
      "I look for the week-long manual cycle nobody questions any more, and turn it " +
      "into an hour. Eight years in supply chain taught me where those cycles hide; " +
      "VBA, Power Automate and BigQuery are how I remove them.",
    facts: [
      { label: "Now",             value: "Supply Chain Analyst", sub: "Ford Global Technical & Business Center, Chennai" },
      { label: "Primary tools",   value: "VBA · Power Automate · BigQuery", sub: "plus Alteryx, Tableau, SAP EWM" },
      { label: "Experience",      value: "8 years", sub: "Supply chain, packaging, procurement, automation" },
      { label: "Based in",        value: "Chennai, India", sub: "Open to relocation: Germany, Netherlands, Luxembourg, Poland" },
      { label: "Availability",    value: "60-day notice", sub: "EU Blue Card eligible" },
      { label: "Education",       value: "MBA Operations · PGP Digital SCM", sub: "B.E. Computer Engineering" },
    ],
    chips: ["Process Automation", "SAP EWM", "Supplier Risk", "Packaging", "Lean Six Sigma", "English · Tamil"],
  },

  /* ---------- Journey: seasons ---------- */
  seasons: [
    { n: "01", title: "Foundations", when: "2011 – 2017", episodes: [
      { title: "B.E., Computer Engineering", text: "Loyola Institute of Technology, Chennai. The engineering habit of asking how a process actually works starts here.", when: "2011 – 2015" },
      { title: "MBA, Operations Management", text: "Saveetha Engineering College. Supply chain, operations and the business side of the plant floor.", when: "2015 – 2017" },
    ]},
    { n: "02", title: "The Packaging Years", when: "2018 – 2021", episodes: [
      { title: "Packaging Engineer at Glovis India", text: "P&F and export costing by Incoterms, ECOs, BOM verification and per-car profit analysis for CKD exports.", when: "Apr 2018" },
      { title: "First savings", text: "2% per-car cost saving from packing quantities; INR 28,000 across 60 car sets from vanning efficiency.", when: "2019" },
      { title: "Sourcing lead", text: "Vendor negotiation, SOB fixing, capacity evaluation. Initiated the Hyundai WIA returnable packing programme and handled KIA export costing.", when: "2020" },
    ]},
    { n: "03", title: "Enter Ford", when: "2021 – 2022", episodes: [
      { title: "Supply Chain Analyst, Ford GTBC Chennai", text: "Joined in the middle of COVID-19 and the China lockdown. First job: alternative-sourcing plans and supplier coordination.", when: "Mar 2021" },
      { title: "The semiconductor shortage", text: "Built a Supplier Risk Analysis scorecard, mapped N-Tier suppliers, and shipped a Tableau dashboard auto-generating VSM reports for senior management.", when: "2021 – 2022" },
      { title: "$0.7M at Struandale", text: "Packaging efficiency programme at the South Africa engine plant: $0.7M saved and 100% of single-use plastic eliminated.", when: "2022" },
      { title: "PGP, Digital Supply Chain Management", text: "Simplilearn with Purdue University. Tableau Certified the same year.", when: "2022" },
    ]},
    { n: "04", title: "The Automation Era", when: "2023 – Present", episodes: [
      { title: "17 automation solutions", text: "VBA, Power Automate, SQL/BigQuery and Alteryx. The validation tool alone returns about 35 hours a week.", when: "2023 →" },
      { title: "SAP EWM rollout, 2 plants", text: "Business-side owner from requirements through 60 test cases, UAT with 10 users and go-live.", when: "2024" },
      { title: "Supplier Onboarding, fully automated", text: "Redesigned the Ford Portal workflow end to end and removed every manual handoff.", when: "2025" },
      { title: "Power Platform at scale", text: "Supplier Recommit Intake flows (~100 mails/week with 48-hour reminders) and weekly Power BI KPI delivery to 25 plants.", when: "2025" },
    ]},
    { n: "05", title: "What's Next", when: "2026 →", episodes: [
      { title: "Season finale: Europe", text: "Looking for a supply chain analytics or process automation role in Germany, the Netherlands, Luxembourg or Poland. EU Blue Card eligible, 60-day notice.", when: "2026" },
    ]},
  ],

  /* ---------- Top Picks ---------- */
  picks: [
    { n: "E01", title: "The Automator", theme: "crimson", text: "One week of manual validation became one hour. Seventeen tools later, about 66 hours a week no longer exist.", tags: ["VBA", "Power Automate", "BigQuery"], target: "projects" },
    { n: "E02", title: "The Saver",     theme: "gold",    text: "$0.7M in packaging savings at Struandale, with single-use plastic taken to zero in the same programme.", tags: ["Packaging", "Sustainability"], target: "achievements" },
    { n: "E03", title: "The Owner",     theme: "teal",    text: "SAP EWM for two plants, carried from frozen requirements to go-live on the business side.", tags: ["SAP EWM", "UAT", "Go-live"], target: "achievements" },
  ],

  footer: {
    note: "A personal, streaming-inspired portfolio. Not affiliated with any streaming service.",
  },
};
