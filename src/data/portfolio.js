/* ==========================================================================
   PORTFOLIO CONTENT — single source of truth
   Everything shown on the site comes from this file (sourced from the CV).
   Edit text here; components update automatically.
   ========================================================================== */

export const site = {
  name: 'Ehtisham Ali',
  logo: 'Ehtisham',
  email: 'ehtishamalihafiz@gmail.com',
  location: 'Punjab, Pakistan',
  cvFile: '/Ehtisham-Ali-CV.pdf',
  cvDownloadName: 'Ehtisham-Ali-CV.pdf',
  socials: {
    linkedin: 'https://www.linkedin.com/in/h-ehtisham-ali-a10822339',
    linkedinLabel: 'linkedin.com/in/h-ehtisham-ali-a10822339',
    github: 'https://github.com/ehtishamalihafiz-del',
    githubLabel: 'github.com/ehtishamalihafiz-del',
  },
  portrait: {
    alt: 'Ehtisham Ali in a navy suit and tie',
    srcSet:
      '/images/ehtisham-ali-480.webp 480w, /images/ehtisham-ali-760.webp 760w, /images/ehtisham-ali-1080.webp 1080w',
    src: '/images/ehtisham-ali-760.webp',
    fallback: '/images/ehtisham-ali-760.jpg',
    width: 1087,
    height: 1447,
  },
  /* Optional: a free form endpoint (e.g. Formspree / Web3Forms) set via
     VITE_FORM_ENDPOINT in a .env file. Without it the contact form uses mailto. */
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '',
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export const hero = {
  badge: 'Exploring Cybersecurity & Building Secure Digital Experiences',
  greeting: "Hi, I'm",
  titles: [
    'Aspiring Cybersecurity Professional',
    'Network Security Enthusiast',
    'Full Stack Developer',
    'Computer Science Student',
  ],
  intro:
    "I'm a Computer Science student passionate about cybersecurity, network security, and secure application development. With a foundation in full-stack development, networking, Linux, and operating systems, I enjoy understanding how modern technologies work and how to make them more secure.",
  status: 'Open to internships & learning opportunities',
  floatingBadges: ['Cybersecurity', 'Linux', 'Cisco', 'React', 'Python'],
  marquee: [
    'Network Security',
    'Cisco Packet Tracer',
    'VLANs',
    'Cisco IOS',
    'Switch Configuration',
    'Linux',
    'Operating Systems',
    'Application Security',
    'React.js',
    'Node.js',
    'Express.js',
    'Supabase',
    'PostgreSQL',
    'Python',
  ],
}

export const about = {
  lead:
    'My professional focus is cybersecurity — particularly network security and application security.',
  paragraphs: [
    'I combine networking knowledge with web development experience to understand how applications, databases, and network infrastructure interact — and where each layer can be strengthened.',
    'Building real products with React, Node.js, Express.js, and databases gave me a practical view of how authentication, APIs, and data flows work. That background is now my advantage as I learn application security: I know what the code behind a login form or a payment flow actually looks like.',
  ],
  learning: [
    'Cybersecurity fundamentals',
    'Network security',
    'Application security',
    'Cisco Packet Tracer',
    'VLAN configuration',
    'Cisco IOS commands',
    'Switch configuration',
    'Connectivity troubleshooting',
    'Linux',
    'Operating systems',
    'Secure application development',
  ],
  openTo: ['Internships', 'Collaborative projects', 'Entry-level learning opportunities'],
  languages: ['Urdu', 'English'],
  softSkills: [
    'Problem Solving',
    'Analytical Thinking',
    'Team Collaboration',
    'Communication Skills',
    'Time Management',
    'Continuous Learning',
  ],
  /* The three layers I understand together */
  layers: [
    { label: 'Application', detail: 'React · Node.js · Express.js', tone: 'primary' },
    { label: 'Data', detail: 'Supabase · PostgreSQL · MongoDB', tone: 'lavender' },
    { label: 'Network', detail: 'VLANs · Switching · Cisco IOS', tone: 'cyan' },
  ],
}

/* Cybersecurity & networking learning areas (icons resolved in the section) */
export const securityAreas = [
  {
    key: 'network',
    title: 'Network Security',
    icon: 'ShieldCheck',
    blurb: 'How traffic is segmented, filtered and kept reachable.',
    items: [
      'Networking Fundamentals',
      'VLANs',
      'Switch Configuration',
      'Network Troubleshooting',
      'Basic Firewall Concepts',
    ],
  },
  {
    key: 'cisco',
    title: 'Cisco Networking',
    icon: 'Router',
    blurb: 'Building and testing topologies in Packet Tracer.',
    items: ['Cisco Packet Tracer', 'Cisco IOS Commands', 'Network Configuration', 'Connectivity Testing'],
  },
  {
    key: 'os',
    title: 'Operating Systems',
    icon: 'Cpu',
    blurb: 'What happens beneath every application.',
    items: ['Windows', 'Linux', 'Process Management', 'File Systems', 'System Fundamentals'],
  },
  {
    key: 'linux',
    title: 'Linux',
    icon: 'SquareTerminal',
    blurb: 'Comfortable on the command line.',
    items: [
      'Linux Terminal',
      'Basic Linux Commands',
      'File Permissions',
      'Command-Line Navigation',
      'Basic Shell Scripting',
    ],
  },
  {
    key: 'appsec',
    title: 'Application Security',
    icon: 'LockKeyhole',
    blurb: 'Where my development background meets security.',
    items: [
      'Application Security Fundamentals',
      'Secure Software Development Concepts',
      'Web Application Architecture',
      'Authentication Concepts',
    ],
  },
]

/* Illustrative practice snippets shown in the interactive terminal */
export const terminalSnippets = {
  ios: {
    label: 'Cisco IOS',
    caption: 'Practice snippet · VLAN on an access port',
    prompt: '',
    lines: [
      { p: 'Switch>', c: 'enable' },
      { p: 'Switch#', c: 'configure terminal' },
      { p: 'Switch(config)#', c: 'vlan 10' },
      { p: 'Switch(config-vlan)#', c: 'name LAB' },
      { p: 'Switch(config-vlan)#', c: 'exit' },
      { p: 'Switch(config)#', c: 'interface fa0/1' },
      { p: 'Switch(config-if)#', c: 'switchport mode access' },
      { p: 'Switch(config-if)#', c: 'switchport access vlan 10' },
      { p: 'Switch(config-if)#', c: 'end' },
      { p: 'Switch#', c: 'show vlan brief' },
    ],
  },
  linux: {
    label: 'Linux',
    caption: 'Practice snippet · permissions & processes',
    lines: [
      { p: '$', c: 'whoami' },
      { p: '$', c: 'ls -l notes.txt' },
      { o: '-rw-r--r-- 1 ehtisham users 512 notes.txt' },
      { p: '$', c: 'chmod 640 notes.txt' },
      { p: '$', c: 'ps aux | grep node' },
      { p: '$', c: 'ping -c 4 192.168.10.1' },
    ],
  },
}

/* Technical skills — straight from the CV, no percentages */
export const skillGroups = {
  security: {
    title: 'Cybersecurity & Infrastructure',
    subtitle: 'Primary focus — actively learning and practising',
    skills: [
      'Cybersecurity Fundamentals',
      'Network Security',
      'Cisco Packet Tracer',
      'VLANs',
      'Cisco IOS',
      'Switch Configuration',
      'Linux',
      'Windows',
      'Operating Systems',
      'Process Management',
      'Application Security Fundamentals',
    ],
  },
  development: {
    title: 'Software Development',
    subtitle: 'Hands-on experience from real projects',
    clusters: [
      { label: 'Languages', icon: 'CodeXml', skills: ['JavaScript', 'Python'] },
      { label: 'Frontend', icon: 'Atom', skills: ['React.js', 'Tailwind CSS'] },
      { label: 'Backend & APIs', icon: 'Server', skills: ['Node.js', 'Express.js', 'REST APIs'] },
      { label: 'Databases', icon: 'Database', skills: ['MongoDB', 'PostgreSQL', 'SQL', 'Supabase', 'Firebase'] },
      { label: 'Mobile', icon: 'Smartphone', skills: ['Flutter'] },
      {
        label: 'Tools & Platforms',
        icon: 'Wrench',
        skills: ['Git & GitHub', 'Postman', 'VS Code', 'Vite', 'Netlify'],
      },
    ],
  },
}

/* Areas of expertise — cybersecurity items are knowledge areas, not paid services */
export const expertise = [
  { title: 'Cybersecurity Fundamentals', icon: 'Shield', kind: 'Learning', text: 'Core security principles, common threats and how layered defences reduce risk.' },
  { title: 'Computer Networking', icon: 'Network', kind: 'Learning', text: 'How devices communicate — addressing, switching, routing and segmentation.' },
  { title: 'Network Configuration', icon: 'Cable', kind: 'Learning', text: 'Configuring switches, VLANs and interfaces, then testing connectivity.' },
  { title: 'Cisco Packet Tracer', icon: 'Router', kind: 'Learning', text: 'Designing and simulating network topologies with Cisco IOS commands.' },
  { title: 'Linux & Operating Systems', icon: 'SquareTerminal', kind: 'Learning', text: 'Processes, file systems, permissions and day-to-day command-line work.' },
  { title: 'Web Development', icon: 'MonitorSmartphone', kind: 'Hands-on', text: 'Responsive full-stack web apps with React, Node.js, Express.js and Tailwind CSS.' },
  { title: 'Database Development', icon: 'Database', kind: 'Hands-on', text: 'Working with Supabase, PostgreSQL, MongoDB and Firebase in real projects.' },
  { title: 'Application Security Learning', icon: 'LockKeyhole', kind: 'Learning', text: 'Applying security thinking to authentication, APIs and data in web apps.' },
]

/* Projects — exactly as described in the CV.
   To add a security lab later, add an object with category: 'security'.
   `image`: put a screenshot in /public/projects and set e.g. '/projects/markethawk.webp'.
   `repo`: set to a GitHub URL to show a GitHub button (left null = hidden). */
export const projects = [
  {
    id: 'markethawk',
    category: 'development',
    name: 'TheMarketHawk.com',
    subtitle: 'AI-Powered Market Intelligence Platform',
    year: '2025',
    url: 'https://themarkethawk.com',
    domain: 'themarkethawk.com',
    repo: null,
    image: null,
    preview: 'dashboard',
    points: [
      'Developed a responsive web application for market research and business intelligence.',
      'Implemented user authentication and dashboard for managing searches, reports, and saved data.',
      'Integrated real-time data fetching, search functionality, and analytics features.',
      'Built using React.js, Node.js, Express.js, and Supabase.',
      'Deployed and managed the application on Netlify.',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'Supabase', 'Netlify'],
    securityAngle: 'User authentication, protected dashboards and API-driven data flows.',
  },
  {
    id: 'vantique',
    category: 'development',
    name: 'Vantique.pk',
    subtitle: 'E-commerce Watch Store',
    year: '2025',
    url: 'https://vantique.pk',
    domain: 'vantique.pk',
    repo: null,
    image: null,
    preview: 'store',
    points: [
      'Developed a complete e-commerce website for a premium watch brand.',
      'Implemented product listing, category filtering, cart, checkout, and order tracking.',
      'Integrated payment methods including JazzCash and Easypaisa.',
      'Built modern frontend using React.js and Tailwind CSS.',
      'Connected frontend with backend APIs and Supabase database.',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'Supabase', 'Tailwind CSS'],
    securityAngle: 'Checkout, payment integrations and order data — real surfaces worth securing.',
  },
  /* Example for later:
  {
    id: 'vlan-lab',
    category: 'security',
    name: 'Inter-VLAN Routing Lab',
    subtitle: 'Cisco Packet Tracer',
    year: '2026',
    url: null, repo: 'https://github.com/...', image: '/projects/vlan-lab.webp',
    preview: 'lab',
    points: ['...'],
    tech: ['Cisco Packet Tracer', 'Cisco IOS', 'VLANs'],
  },
  */
]

export const education = [
  {
    degree: 'BS Computer Science (BCS)',
    institution: null, // add your university name here when ready
    period: '2024 – Present',
    current: true,
    note: 'Currently enrolled',
  },
  {
    degree: 'Intermediate — FSc Pre-Engineering',
    institution: 'Punjab Group of Colleges, Lahore',
    period: '2022 – 2024',
  },
  {
    degree: 'Matric — Science',
    institution: 'Unique Cadet School, Shakargarh',
    period: '2020 – 2022',
  },
]

export const experience = [
  {
    role: 'Freelance Full Stack Developer',
    org: 'Self-Employed',
    period: '2025 – Present',
    current: true,
    points: [
      'Developed responsive websites and academic projects.',
      'Improved application UI/UX and optimized performance.',
      'Deployed projects using GitHub and Netlify.',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'Supabase', 'GitHub', 'Netlify'],
  },
]

export const certifications = [{ title: 'Web Development', icon: 'BadgeCheck' }]

export const currentFocus = ['Network security', 'Application security', 'Linux & operating systems']
