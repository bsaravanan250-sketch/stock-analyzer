/* =====================================================================
   PORTFOLIO CONTENT
   This is the only file you need to edit. Every section of the site is
   rendered from this object. Replace the placeholder text, drop your
   photo at assets/portrait.jpg (and set `photo` below), and you're done.
   ===================================================================== */
window.PORTFOLIO = {
  /* ---------- identity ---------- */
  name: "Your Name",               // shown in the intro, hero and footer
  shortName: "Your Name",          // used in "Your Name's Top Picks"
  initial: "Y",                    // the logo letter top-left (Netflix "N")
  tagline: "The Series",
  role: "Full-Stack Developer · AI / ML · Python",
  photo: "assets/portrait.svg",    // swap for assets/portrait.jpg
  location: "Hyderabad, India",
  email: "you@example.com",
  resumeUrl: "#",                  // link to a PDF, e.g. assets/resume.pdf
  links: {
    linkedin: "https://www.linkedin.com/in/your-handle",
    github: "https://github.com/your-handle",
  },

  /* ---------- hero ---------- */
  hero: {
    badges: ["AI/ML", "2023 – Present", "B.Tech CSE", "3 Originals", "12 Certifications"],
    summary:
      "A B.Tech Computer Science student and full-stack developer building " +
      "data-driven tools, trading research systems and multi-tenant web apps " +
      "with Python, JavaScript, React and Node.js.",
    stat: { label: "CGPA", value: "9.1" },
    match: "98% Match",
  },

  /* ---------- "Who's watching?" profiles ----------
     Each profile re-orders the Continue Exploring row so the right
     episode plays first. `first` is the id of the section to lead with. */
  profiles: [
    { id: "me",        name: "Me",        kind: "photo", color: "#b20710", blurb: "The full series, in order",         first: "resume" },
    { id: "recruiter", name: "Recruiter", kind: "glyph", glyph: "R",   color: "#0e7490", blurb: "Resume, achievements & skills first", first: "resume" },
    { id: "developer", name: "Developer", kind: "glyph", glyph: "</>", color: "#15803d", blurb: "Projects, stack & GitHub first",     first: "projects" },
    { id: "creative",  name: "Creative",  kind: "glyph", glyph: "✦",   color: "#b45309", blurb: "The story and the highlights first", first: "journey" },
  ],

  /* ---------- Continue Exploring (episode cards under the hero) ---------- */
  episodes: [
    { id: "resume",       n: "01", title: "The Full Story",   sub: "Resume · 1 page",      theme: "violet" },
    { id: "achievements", n: "02", title: "My Achievements",  sub: "Awards · 5 moments",   theme: "crimson" },
    { id: "skills",       n: "03", title: "My Skills",        sub: "Genres · 7 categories", theme: "teal" },
    { id: "projects",     n: "04", title: "My Projects",      sub: "Originals · 3 titles", theme: "ember" },
    { id: "journey",      n: "05", title: "My Journey",       sub: "4 seasons",            theme: "gold" },
  ],

  /* ---------- Resume: "The Full Story" ---------- */
  resume: {
    fullName: "Your Full Legal Name",
    contact: ["you@example.com", "+91 90000 00000", "linkedin.com/in/your-handle", "github.com/your-handle"],
    education: [
      { title: "Your Engineering College, City", sub: "B.Tech Computer Science · CGPA 9.1", when: "2023 – 2027" },
      { title: "Your Junior College, City",      sub: "MPC · 95%",                           when: "2021 – 2023" },
    ],
    experience: [
      {
        title: "Software Engineering Intern · Company Name",
        when: "May 2025 – Jul 2025",
        bullets: [
          "Built a rules-based equity screener that scores 200+ stocks daily on trend, momentum, relative strength and volume.",
          "Shipped a GitHub Actions pipeline that publishes a pre-market brief to GitHub Pages every weekday at 08:45 IST.",
          "Wrote a walk-forward backtest to validate the ranking rule before it reached the dashboard.",
        ],
      },
    ],
    projects: [
      { title: "Stock Analyzer", sub: "Python, GitHub Actions, vanilla JS" },
      { title: "Project Two",    sub: "React, Node.js, PostgreSQL" },
      { title: "Project Three",  sub: "Python, FastAPI, Docker" },
    ],
    skills: [
      { label: "Languages", items: "Python, JavaScript, TypeScript, Java, SQL" },
      { label: "Frontend",  items: "React, HTML, CSS, Tailwind" },
      { label: "Backend",   items: "Node.js, Express, FastAPI, REST" },
      { label: "Infra & Tools", items: "Git, GitHub Actions, Docker, Linux, AWS" },
      { label: "Databases", items: "PostgreSQL, MongoDB, SQLite" },
    ],
    certifications: "NPTEL Data Structures (Elite), AWS Cloud Practitioner, Oracle Java SE, Coursera ML Specialization, and 8 more.",
    achievements: [
      "Selected for a national-level tech fellowship (top 2% of applicants).",
      "Semi-finalist, inter-college hackathon 2025.",
      "600+ problems solved on LeetCode and GeeksforGeeks.",
    ],
    stats: [
      { value: "9.1", label: "CGPA" },
      { value: "3",   label: "Originals" },
      { value: "12",  label: "Certifications" },
    ],
  },

  /* ---------- Achievements: "Top Moments" ---------- */
  moments: [
    { tag: "National Selection", title: "Tech Fellow",        org: "Fellowship Programme 2025", text: "Selected through a national competition covering DSA, system design and a build round.", link: "#" },
    { tag: "Semi-Finalist",      title: "Hackathon 2025",     org: "Inter-college, 1,200 teams",  text: "Shipped a working trading-research tool in 36 hours; placed in the top 20.", link: "#" },
    { tag: "Branch Topper",      title: "CSE Rank 1",         org: "B.Tech, Semesters I – IV",    text: "Highest CGPA in the branch for four consecutive semesters.", link: "" },
    { tag: "Competitive Coding", title: "600+ Problems Solved", org: "LeetCode · GfG · Codeforces", text: "Consistent daily practice; 5-star rating in Python on HackerRank.", link: "#" },
    { tag: "Open Source",        title: "40+ Merged PRs",     org: "GitHub",                      text: "Contributions to developer tooling and data libraries.", link: "#" },
  ],
  certifications: [
    { issuer: "NPTEL",    title: "Data Structures & Algorithms (Elite)", link: "#" },
    { issuer: "NPTEL",    title: "Introduction to Machine Learning",     link: "#" },
    { issuer: "AWS",      title: "Cloud Practitioner",                    link: "#" },
    { issuer: "Oracle",   title: "Java SE 17 Developer",                  link: "#" },
    { issuer: "Coursera", title: "Deep Learning Specialization",          link: "#" },
    { issuer: "Google",   title: "Data Analytics Professional",           link: "#" },
    { issuer: "Cisco",    title: "Networking Basics",                     link: "#" },
    { issuer: "MongoDB",  title: "Associate Developer",                   link: "#" },
    { issuer: "HackerRank", title: "Python (5 stars)",                    link: "#" },
    { issuer: "freeCodeCamp", title: "Responsive Web Design",             link: "#" },
    { issuer: "Microsoft", title: "Azure Fundamentals AZ-900",            link: "#" },
    { issuer: "Infosys",  title: "Springboard: Python Foundations",       link: "#" },
  ],

  /* ---------- Skills: "My Skill Universe" ----------
     `used` lists project titles the skill appears in; shown on hover. */
  skillGroups: [
    { name: "Languages", sub: "Python is the primary language", skills: [
      { name: "Python",     mono: "Py", used: ["Stock Analyzer", "Project Three"] },
      { name: "JavaScript", mono: "JS", used: ["Stock Analyzer", "Project Two"] },
      { name: "TypeScript", mono: "TS", used: ["Project Two"] },
      { name: "Java",       mono: "Jv", used: [] },
      { name: "SQL",        mono: "SQL", used: ["Project Two"] },
    ]},
    { name: "Frontend", sub: "Interfaces & the web platform", skills: [
      { name: "React",   mono: "Re", used: ["Project Two"] },
      { name: "HTML5",   mono: "H5", used: ["Stock Analyzer"] },
      { name: "CSS3",    mono: "C3", used: ["Stock Analyzer"] },
      { name: "Tailwind", mono: "Tw", used: ["Project Two"] },
    ]},
    { name: "Backend", sub: "Server-side logic", skills: [
      { name: "Node.js",  mono: "No", used: ["Project Two"] },
      { name: "Express",  mono: "Ex", used: ["Project Two"] },
      { name: "FastAPI",  mono: "FA", used: ["Project Three"] },
      { name: "REST APIs", mono: "{}", used: ["Project Two", "Project Three"] },
    ]},
    { name: "Infra & Tools", sub: "Shipping & architecture", skills: [
      { name: "Git",            mono: "Gt", used: ["Stock Analyzer", "Project Two", "Project Three"] },
      { name: "GitHub Actions", mono: "GA", used: ["Stock Analyzer"] },
      { name: "Docker",         mono: "Dk", used: ["Project Three"] },
      { name: "Linux",          mono: "Lx", used: ["Stock Analyzer"] },
      { name: "AWS",            mono: "AW", used: [] },
      { name: "Postman",        mono: "Pm", used: ["Project Two"] },
    ]},
    { name: "Databases", sub: "Indexing & normalisation", skills: [
      { name: "PostgreSQL", mono: "Pg", used: ["Project Two"] },
      { name: "MongoDB",    mono: "Mg", used: [] },
      { name: "SQLite",     mono: "Sq", used: ["Project Three"] },
    ]},
    { name: "CS Fundamentals", sub: "The foundations", skills: [
      { name: "DSA",             mono: "DS", used: [] },
      { name: "OOP",             mono: "OO", used: [] },
      { name: "DBMS",            mono: "DB", used: [] },
      { name: "Operating Systems", mono: "OS", used: [] },
      { name: "Networks",        mono: "CN", used: [] },
      { name: "System Design",   mono: "SD", used: ["Project Two"] },
    ]},
    { name: "Interests", sub: "Coming soon to the series", skills: [
      { name: "Quant Finance", mono: "Qf", used: ["Stock Analyzer"] },
      { name: "LLM Apps",      mono: "LL", used: [] },
      { name: "Data Viz",      mono: "Dv", used: ["Stock Analyzer"] },
    ]},
  ],

  /* ---------- Projects: "Originals" ---------- */
  projects: [
    {
      title: "Stock Analyzer",
      kicker: "Python · GitHub Actions · Vanilla JS",
      theme: "crimson",
      icon: "chart",
      text: "A daily, rules-based brief for the NIFTY 200. Scores every stock on trend, momentum, relative strength, volume and headlines, checks the market regime, and publishes a ranked dashboard with stop-loss and position size for each name.",
      tags: ["Python", "GitHub Actions", "Backtesting", "GitHub Pages"],
      link: "../",
      repo: "https://github.com/your-handle/stock-analyzer",
    },
    {
      title: "Project Two",
      kicker: "React · Node.js · PostgreSQL",
      theme: "gold",
      icon: "card",
      text: "A full-stack web app with role-based auth, a REST API and a relational schema designed around the real workflow of its users. Replace this with your own project.",
      tags: ["React", "Node.js", "PostgreSQL", "JWT"],
      link: "#",
      repo: "#",
    },
    {
      title: "Project Three",
      kicker: "Python · FastAPI · Docker",
      theme: "teal",
      icon: "shield",
      text: "An API service packaged with Docker, with automated tests and a CI pipeline. Replace this with your own project.",
      tags: ["FastAPI", "Docker", "pytest", "CI"],
      link: "#",
      repo: "#",
    },
  ],

  /* ---------- About: "The Pilot" ---------- */
  about: {
    quote:
      "A B.Tech Computer Science student and full-stack developer who likes " +
      "systems that run on their own: screeners that publish themselves, " +
      "pipelines that test themselves, and interfaces that explain themselves.",
    facts: [
      { label: "Now",       value: "B.Tech CSE · CGPA 9.1", sub: "Your Engineering College" },
      { label: "Primary languages", value: "Python", sub: "with JavaScript & SQL" },
      { label: "Experience", value: "Software Engineering Intern", sub: "May 2025 – Jul 2025" },
      { label: "Based in",  value: "Hyderabad, India", sub: "Open to remote" },
      { label: "Focus",     value: "Data tools · Trading research · Web apps", sub: "" },
    ],
    chips: ["System Design", "Quant Research", "Machine Learning", "Open Source"],
  },

  /* ---------- Journey: seasons ---------- */
  seasons: [
    { n: "01", title: "The Beginning", when: "2021 – 2023", episodes: [
      { title: "First line of code", text: "Started with Python in junior college, built small scripts to automate homework and track expenses.", when: "2021" },
      { title: "Chose engineering", text: "Cleared entrance exams and joined B.Tech Computer Science.", when: "2023" },
    ]},
    { n: "02", title: "Enter Data & ML", when: "2023 – 2024", episodes: [
      { title: "Fell for data", text: "First ML course, first Kaggle notebook, first time a model beat the baseline.", when: "2023" },
      { title: "Competitive coding", text: "Started daily DSA practice. 600+ problems later it is a habit.", when: "2024" },
    ]},
    { n: "03", title: "Learning to Build", when: "2024 – 2025", episodes: [
      { title: "Full-stack basics", text: "React, Node.js and PostgreSQL. Shipped the first deployed project.", when: "2024" },
      { title: "Hackathon season", text: "Semi-finalist at an inter-college hackathon with a 36-hour build.", when: "2025" },
    ]},
    { n: "04", title: "Building Real Products", when: "2025 – Present", episodes: [
      { title: "Stock Analyzer", text: "A self-publishing daily market brief with a backtested ranking rule, live on GitHub Pages.", when: "2025" },
      { title: "Internship", text: "Software Engineering Intern: pipelines, dashboards and a lot of code review.", when: "2025" },
    ]},
    { n: "05", title: "What's Next", when: "2026 →", episodes: [
      { title: "Season finale", text: "Looking for a software or data engineering role where I can own a system end to end.", when: "2026" },
    ]},
  ],

  /* ---------- Top Picks ---------- */
  picks: [
    { n: "E01", title: "The Builder",   theme: "crimson", text: "Stock Analyzer: a market screener that scores 200 stocks every morning and publishes itself.", tags: ["Python", "CI/CD", "Backtest"], target: "projects" },
    { n: "E02", title: "The Architect", theme: "gold",    text: "Project Two: auth, REST API and a relational schema designed around real user workflows.", tags: ["React", "Node.js", "PostgreSQL"], target: "projects" },
    { n: "E03", title: "The Fellow",    theme: "teal",    text: "Selected for a national-level tech fellowship, top 2% of applicants.", tags: ["Achievement", "2025"], target: "achievements" },
  ],

  footer: {
    note: "A personal, streaming-inspired portfolio. Not affiliated with any streaming service.",
  },
};
