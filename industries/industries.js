/* =================================================================
   DIAMOND — INDUSTRIES SECTION LOGIC
   ================================================================================
   Everything on screen is generated from the data objects below.
   To edit content (add a real project link, swap an image, tune a
   number) — edit the data here. Nothing else needs to change.
   ================================================================================ */
(function () {
  "use strict";

  var root = document.getElementById("indusSection");
  if (!root) return;

  /* ---------------------------------------------------------------
     0. DATA
     --------------------------------------------------------------- */

  // Flagship — Website Engineering (DIAMOND's primary specialization)
  var indusFlagshipData = {
    icon: "🌐",
    badge: "Flagship Discipline",
    title: "Website Engineering",
    desc: "This is where DIAMOND lives. Business sites, client products, internal tools, dashboards, and landing pages — engineered for speed, built to convert, and designed to feel premium from the first pixel.",
    image: "../assets/diamondversion3.png",
    tags: ["Business Websites", "Client Products", "Dashboards & Tools", "Portfolios", "Landing Pages", "Responsive UI/UX", "SEO Ready", "Secure Development", "Fast Performance"],
    stats: [
      { value: 100, suffix: "+", label: "Websites shipped" },
      { value: 99.9, suffix: "%", label: "Avg. performance score" },
      { value: 7, suffix: "", label: "Website categories" }
    ],
    // Placeholder portfolio slots — add real links/names as projects go live.
    portfolio: [
      { name: "Tools", cat: "Utility / Tool" },
      { name: "Business", cat: "Business Website" },
      { name: "Portfolios", cat: "Portfolio Site" },
      { name: "Clients", cat: "Client Product" },
      { name: "Landing Pages", cat: "Landing Page" },
      { name: "Dashboards", cat: "Internal Tool" }
    ]
  };

  // The full industries index (Website Engineering intentionally excluded — it has the flagship slot above)
  var indusIndustriesData = [
    {
      id: "esp32", icon: "📡", title: "Embedded Systems — ESP32",
      desc: "Wireless-first microcontroller builds — from robots to dashboards to touch interfaces.",
      image: "https://i.pinimg.com/1200x/ee/41/79/ee4179feea5b8462096fda0d81866c55.jpg", expertise: 99.9, projects: 20,
      tech: ["ESP32", "WiFi", "Bluetooth", "IoT", "Real-Time Systems"],
      showcase: ["Line Following Robot", "Voice Controlled Robot", "Phone-Controlled RC Car", "Delivery Robot", "Wi-Fi Web Dashboards", "Keyboard Controller", "Scrolling Media Dock", "Touch Interfaces", "AI Integration"]
    },
    {
      id: "arduino", icon: "🔌", title: "Arduino Engineering",
      desc: "Classic microcontroller builds — motors, sensors, and automation from the ground up.",
      image: "https://i.pinimg.com/1200x/4a/53/e7/4a53e73d8e93bf3d31d2b336963bca73.jpg", expertise: 88, projects: 15,
      tech: ["Arduino Uno", "Sensors", "Motors", "IoT", "Automation"],
      showcase: ["Line Following Robot", "RC Car", "Delivery Robot", "LED Control Systems", "Motor Mechanisms", "IoT Devices"]
    },
    {
      id: "3d", icon: "🧊", title: "3D Design & Modelling",
      desc: "From concept to printable part — modelling, visualization, and prototyping.",
      image: "https://i.pinimg.com/736x/57/52/02/5752020170f290416809172d1b97747a.jpg", expertise: 78, projects: 10,
      tech: ["Blender", "Tinkercad", "3D Printing", "Visualization"],
      showcase: ["Mechanical Part Models", "Concept Renders", "Printable Prototypes", "Product Visualization"]
    },
    {
      id: "games", icon: "🎮", title: "Game Development",
      desc: "Playable worlds — FPS, driving, and Roblox experiences with real game logic.",
      image: "https://i.pinimg.com/736x/35/70/00/357000b7ab22719ce6acf718e75b7991.jpg", expertise: 95, projects: 20,
      tech: ["Roblox Studio", "Unreal Engine", "Game Logic", "Level Design"],
      showcase: ["FPS Prototypes", "Driving Games", "Shooting Mechanics", "Roblox Experiences", "Graphic-Rich Demos"]
    },
    {
      id: "apps", icon: "📱", title: "Application Development",
      desc: "Desktop and mobile apps that solve real problems, not just demo well.",
      image: "https://i.pinimg.com/736x/93/86/f5/9386f512929d0bd27270ff36641c7fc7.jpg", expertise: 99.9, projects: 30,
      tech: ["Android Studio", "Firebase", "Tkinter", "PWA"],
      showcase: ["Utility Apps", "Cross-Platform Tools", "IoT Companion Apps", "Automation Apps"]
    },
    {
      id: "hardware", icon: "⚙️", title: "Hardware Engineering",
      desc: "Sensors, actuators and electronics wired into real, working accessibility solutions.",
      image: "https://i.pinimg.com/1200x/61/4c/10/614c100caaa658a27f4fc48d1087529b.jpg", expertise: 90, projects: 15,
      tech: ["Relays", "IR Sensors", "Ultrasonic", "Servos", "Cameras", "Pumps"],
      showcase: ["Wheel Encoder Systems", "Ultrasonic Obstacle Detection", "Servo-Driven Rigs", "Bluetooth/WiFi Control", "Accessibility Devices"]
    },
    {
      id: "mechanics", icon: "🛠️", title: "Mechanical Systems & Robotics",
      desc: "Physical motion — robot chassis, drivetrains, and custom mechanical assemblies.",
      image: "https://i.pinimg.com/736x/a0/90/08/a0900813525f4965e7de00627873efb1.jpg", expertise: 80, projects: 21,
      tech: ["Motors", "Drivetrains", "Chassis Design", "Motion Systems"],
      showcase: ["Robot Chassis Builds", "Custom Drivetrains", "Vehicle Mechanisms", "Motion Rigs"]
    },
    {
      id: "ai", icon: "🧠", title: "Artificial Intelligence",
      desc: "Vision, language, and control systems — from gesture tracking to self-driving logic.",
      image: "https://i.pinimg.com/736x/30/58/85/305885564a76e2a6c80d101d6a1dfbae.jpg", expertise: 87, projects: 10,
      tech: ["Neural Networks", "Computer Vision", "Teachable Machine", "CARLA"],
      showcase: ["Hand-Tracking Mouse Control", "Eye-Movement Control", "Object Detection", "Emotion Detection", "Chatbots", "Self-Driving Simulation", "Photo/Video Filters"]
    },
    {
      id: "business", icon: "💼", title: "Business & Entrepreneurship",
      desc: "Turning builds into products — physical, digital, and everything monetizable in between.",
      image: "https://i.pinimg.com/736x/f1/f1/47/f1f147a666387c744471e9ae961df396.jpg", expertise: 90, projects: 10,
      tech: ["Product Strategy", "Marketing Sites", "Sales Systems"],
      showcase: ["Digital Product Launches", "Physical Product Sales", "Marketing Websites", "Skill Monetization"]
    },
    {
      id: "innovation", icon: "💡", title: "Innovation Lab",
      desc: "Real-world problem solving through unlikely combinations of hardware and software.",
      image: "https://i.pinimg.com/736x/03/2b/b4/032bb4387d0796e02d7e23ac92adea99.jpg", expertise: 99.9, projects: 14,
      tech: ["Rapid Prototyping", "Accessibility Design", "Systems Thinking"],
      showcase: ["Accessibility Concepts", "Physical + Digital Hybrids", "Future Concepts", "Rapid Prototypes"]
    },
    {
      id: "marketing", icon: "📣", title: "Marketing & Branding",
      desc: "Telling the story right — campaigns, content, and communication that lands.",
      image: "https://i.pinimg.com/736x/91/94/0a/91940a743f774821bc823ffba505778b.jpg", expertise: 72, projects: 10,
      tech: ["Content Strategy", "Advertising", "Campaigns"],
      showcase: ["Promotional Campaigns", "Brand Communication", "Social Content", "Ad Creative"]
    },
    {
      id: "media", icon: "🎬", title: "Media Production",
      desc: "Video and photo editing — vlogs, promos, and entertainment pieces that keep people watching.",
      image: "https://i.pinimg.com/1200x/8f/ec/8b/8fec8b8b067a47de440ea2bbdf9a6d8f.jpg", expertise: 99.9, projects: 25,
      tech: ["CapCut", "DaVinci Resolve", "Filmora", "Clipchamp"],
      showcase: ["Vlogs", "Marketing Videos", "Promotional Cuts", "Entertainment Edits"]
    },
    {
      id: "programming", icon: "💻", title: "Programming & Software",
      desc: "The language layer beneath everything DIAMOND builds — from firmware to full apps.",
      image: "https://i.pinimg.com/736x/50/4c/94/504c9430631cde54eb8f5f15e24273c2.jpg", expertise: 99.9, projects: 120,
      tech: ["Python", "JavaScript", "C++", "Lua", "HTML/CSS"],
      showcase: ["Embedded Programming", "Automation Scripts", "Game Logic", "Web Development", "Application Logic"]
    },
    {
      id: "fullstack", icon: "🗄️", title: "Full-Stack Engineering",
      desc: "Client-ready products end to end — frontend, backend, database, and everything between.",
      image: "https://i.pinimg.com/1200x/f8/3e/95/f83e955a9b0f59b58a02f74cc8e836ea.jpg", expertise: 99.9, projects: 100,
      tech: ["Frontend", "Backend", "Databases", "Auth & Security", "API Integration"],
      showcase: ["Client-Ready Platforms", "Authenticated Systems", "Database-Backed Apps", "API Integrations"]
    },
    {
      id: "productivity", icon: "⚡", title: "Productivity Systems",
      desc: "Workflow tooling and problem-solving frameworks that remove friction.",
      image: "https://i.pinimg.com/1200x/b5/70/08/b570089d5b4c9bb1ec417ea6f961f9b9.jpg", expertise: 74, projects: 9,
      tech: ["Automation", "Workflow Design", "Idea Systems"],
      showcase: ["Workflow Automations", "Idea-to-Build Pipelines", "Productivity Tools"]
    },
    {
      id: "skillexpo", icon: "🧭", title: "Skill Exploration",
      desc: "Constant experimentation — new platforms, new languages, new fields, on purpose.",
      image: "https://i.pinimg.com/736x/9e/d4/b8/9ed4b8e243d1c0d483e357c66089d6df.jpg", expertise: 81, projects: 7,
      tech: ["New Platforms", "New Languages", "Collaboration"],
      showcase: ["New Software Trials", "Cross-Field Experiments", "Collaborative Builds"]
    },
    {
      id: "gaming", icon: "🕹️", title: "Competitive Gaming & Testing",
      desc: "Real hands-on time in the games DIAMOND builds for — testing, scripting, analyzing.",
      image: "https://i.pinimg.com/1200x/b3/06/36/b30636d9eb18d04684d0cb8ea4729365.jpg", expertise: 99.9, projects: 5,
      tech: ["Valorant", "Minecraft", "Fortnite", "Roblox", "Asphalt"],
      showcase: ["Gameplay Analysis", "Custom Scripts", "Community Projects", "Game Testing"]
    },
    {
      id: "rnd", icon: "🔬", title: "Research & Development",
      desc: "Digging into how things actually work — papers, experiments, and field research.",
      image: "https://i.pinimg.com/736x/75/a5/0e/75a50e1205b1685277d9273ee9fffb43.jpg", expertise: 77, projects: 11,
      tech: ["Technical Research", "Experimentation", "Emerging Tech"],
      showcase: ["Technology Deep-Dives", "Experimental Builds", "Life-Hack Engineering", "Field Research"]
    },
    {
      id: "brandassets", icon: "🎨", title: "Product & Brand Engineering",
      desc: "Physical builds, logos, and visual identity — the assets a brand is remembered by.",
      image: "https://i.pinimg.com/736x/c7/88/d7/c788d7ad92b1a6b07657f6b7193fcb55.jpg", expertise: 76, projects: 6,
      tech: ["Logos", "Design Systems", "Physical Builds"],
      showcase: ["Logo Design", "Visual Identity Systems", "Physical Model Builds", "Brand Asset Kits"]
    },
    {
      id: "cybersec", icon: "🛡️", title: "Cyber Security & Privacy",
      desc: "Keeping accounts, data, and systems locked down — the practical, everyday kind.",
      image: "https://i.pinimg.com/736x/57/a2/07/57a2079f1f20614c08e84d596cc7d0f1.jpg", expertise: 70, projects: 6,
      tech: ["Password Management", "Privacy", "Verification"],
      showcase: ["Account Hardening", "Privacy Audits", "Blacklist Protection"]
    },
    {
      id: "ethicalhack", icon: "🕵️", title: "Ethical Hacking",
      desc: "Small-scale, educational security testing and scripting — nothing malicious, all curiosity.",
      image: "https://i.pinimg.com/1200x/b2/e9/2e/b2e92e2de85019849002777a405e7a42.jpg", expertise: 68, projects: 8,
      tech: ["Security Scripts", "Discord Utilities", "Game Utilities"],
      showcase: ["Educational Security Tests", "Automation Scripts", "Small-Scale Experiments"]
    }
  ];

  // Platform ecosystem, grouped by category
  var indusPlatformsData = {
    "Embedded": [
      { name: "Arduino IDE", image:"https://i.pinimg.com/736x/00/db/a0/00dba04f5f502fb7af8f59527dd5212a.jpg", icon: "🔧", level: 95 },
      { name: "Wokwi", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmcwWtxNzZy4oSpdyxdUldgLB0BugMJURR1rrT1HLwcJKwLdCr5qyZRrA&s=10", icon: "🧪", level: 85 },
      { name: "Tinkercad", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17iHVOfM24RjgKBE7IMN8_4JLJDfC4erhs6bMLWvg3k6y3rEsgKXjiT8&s=10", icon: "🧩", level: 80 },
      { name: "ESP32 Toolchain", image:"https://pbs.twimg.com/profile_images/773245254979903488/yB0xE3NR_400x400.jpg", icon: "📡", level: 92 }
    ],
    "Software Dev": [
      { name: "VS Code", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/960px-Visual_Studio_Code_1.35_icon.svg.png", icon: "🖥️", level: 97 },
      { name: "GitHub", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXtR3ZbUep044uvCpnykQBnY4i4rBHHdkmxyDLRISsirW4SXayA_33I90&s=10", icon: "🐙", level: 90 },
      { name: "Python", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/3840px-Python-logo-notext.svg.png", icon: "🐍", level: 94 },
      { name: "Anaconda", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPvApjsauxungpUkgw6mbSP8k18B1OXwKGLN7D8_YYcMR8DAuJj9o4JFj_&s=10", icon: "📦", level: 78 },
      { name: "Spyder", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCuncG4eXBgiBDq2PPLcu28DriFH2tn3wUoScmb7x8Dw&s=10", icon: "📊", level: 74 },
      { name: "Jupyter", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Jupyter_logo.svg/1280px-Jupyter_logo.svg.png", icon: "📓", level: 82 },
      { name: "Sublime Text", image:"https://upload.wikimedia.org/wikipedia/en/d/d2/Sublime_Text_3_logo.png", icon: "✏️", level: 75 },
      { name: "Android Studio", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Android_Studio_Logo_%282023%29.svg/1280px-Android_Studio_Logo_%282023%29.svg.png", icon: "🤖", level: 84 },
      { name: "Tkinter / GUI", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3AoU5QO7CZuK2eNSXUyEobY8Xj4pkl_ThJ6a-b4xbOrcKO3SqHmtxKo0&s=10", icon: "🪟", level: 80 },
      { name: "Firebase", image:"https://www.gstatic.com/devrel-devsite/prod/v3be1e30159846e100d05529400567b663b9f8b605137438a2f417848d68359dd/firebase/images/touchicon-180.png", icon: "🔥", level: 83 }
    ],
    "Web": [
      { name: "PWA Apps", image:"https://apps.odoo.com/web/image/loempia.module/196680/icon_image?unique=7365458", icon: "🌐", level: 82 },
      { name: "AppsGeyser", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTolrHrrvaDRP5ye7aD68523XmE6BJzVIgO12G6DCuqqA&s", icon: "📲", level: 70 },
      { name: "Google Services", image:"https://play-lh.googleusercontent.com/D3ejn0q4icRCmBhgwYtWGc6yPoXoJ5BDFUrtPoehiVkI0T3_WX955zwqV_UNcgik93nz1rTQBkovz9woLs5EqA", icon: "🔎", level: 86 }
    ],
    "Creative": [
      { name: "Blender", image:"https://pbs.twimg.com/profile_images/1036953347943743488/1dbRCWDq_400x400.jpg",icon: "🧊", level: 78 },
      { name: "Photoshop", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Adobe_Photoshop_CC_2026_icon.svg/1280px-Adobe_Photoshop_CC_2026_icon.svg.png", icon: "🖌️", level: 82 },
      { name: "Canva", image:"https://avatars.githubusercontent.com/u/2562356?s=280&v=4", icon: "🎨", level: 90 },
      { name: "PowerPoint", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Microsoft_Office_PowerPoint_%282019%E2%80%932025%29.svg/960px-Microsoft_Office_PowerPoint_%282019%E2%80%932025%29.svg.png?_=20210821050414", icon: "📽️", level: 88 },
      { name: "Excel", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj8J_HoSlF6IERJM2L-xPZxV9PJP8926r3cCd9wFzQJDTx-WwD2k-nGKg&s=10", icon: "📈", level: 85 },
      { name: "Word", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Microsoft_Office_Word_%282019%E2%80%932025%29.svg/3840px-Microsoft_Office_Word_%282019%E2%80%932025%29.svg.png", icon: "📄", level: 88 },
      { name: "KineMaster", image:"https://play-lh.googleusercontent.com/21TF_dzIUWZdEOxYToOU2nCSN3r-n1iB9ZQw-lzfTsSGXa9vs9HfLPzKh2V35_ynkQ", icon: "🎞️", level: 80 },
      { name: "CapCut", image:"https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBaQDG.nPeYqpMXSUQbV6ZbDdG2hO.rpXiEwLW.MsOn0cnF_xUO8HZVgAtYpk4p5DeGdtWfUQvWuj.fsu_YEnJis-&format=source", icon: "✂️", level: 90 },
      { name: "DaVinci Resolve", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0vXKuuHkOZk2lE_RbjQmN3rKCW1MHSwXYyRTMkgyvXQ&s", icon: "🎬", level: 76 },
      { name: "Filmora", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUOGdmsXaZudYhlrbhpra9lQ46bjgSZ2pHn-UVCKWmgUwStkS7N9Z0LBwb&s=10", icon: "🎥", level: 78 },
      { name: "Adobe Firefly", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Adobe_Firefly_CC_2026_icon.svg/250px-Adobe_Firefly_CC_2026_icon.svg.png", icon: "✨", level: 70 },
      { name: "Runway ML", image:"https://play-lh.googleusercontent.com/1zhtkTPjCV0I1PRktZoDp9z0VJ7TBVxySTFwQsiObtFRxtUMKNqvl8v16BLDfhD_TrRDf2Jz8RD3yTc-jsMP9A", icon: "🪄", level: 68 },
      { name: "MS Clipchamp", image:"https://store-images.s-microsoft.com/image/apps.29270.14506576373691712.38ff9222-3a7a-460d-8e7a-1bd12852f54b.5343578f-a192-4f50-a349-67a7b55734f4", icon: "🎦", level: 74 }
    ],
    "AI": [
      { name: "Teachable Machine", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz28XCgGnMiKsrQGl5joZRO_XFuAGJD-bzGjpeLxJ1ZDazD1XnZ-sfnxL5&s=10", icon: "🧠", level: 80 },
      { name: "Google Chatbots", image:"https://w7.pngwing.com/pngs/459/467/png-transparent-google-chat-hd-logo.png", icon: "💬", level: 76 },
      { name: "Google Object Detection", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8-KLzItzYJQhStP_45HxFhmcjdIzOK-5BPV3RVUIalLoD67-Dio3Q434c&s=10", icon: "👁️", level: 78 },
      { name: "CARLA Simulator", image:"https://carla.org//img/carla.jpg",icon: "🚗", level: 65 },
      { name: "AI Workflows", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrJ2YszVWJHCYGPV7RmUvDTyPDZgZT0gfzAPQRcIjz50x4ZOJM4HH3WKf2&s=10", icon: "⚙️", level: 84 }
    ],
    "Blockchain": [
      { name: "Ganache", image:"https://images.seeklogo.com/logo-png/42/1/ganache-logo-png_seeklogo-426724.png", icon: "🔗", level: 60 },
      { name: "MetaMask", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGv9mGuvPQ9e7VoqfrfeO8Y1vdvPzB7ssGomSn3YMw6Q&s", icon: "🦊", level: 62 }
    ],
    "Game Dev": [
      { name: "Roblox Studio", image:"https://img.icons8.com/deco/1200/roblox-studio.jpg", icon: "🧱", level: 82 },
      { name: "Unreal Engine", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdH0QUocn5ZShQ1xhbY7Kc8RLQbL-RQLnn3JHS6TNW0g&s", icon: "🎮", level: 68 },
      { name: "Minecraft Modding", image:"https://play-lh.googleusercontent.com/AspviwO6fPFn3-QjjC3KncLy-bDMfTFAHmFC6Bkdlm4XrXh8AeHnOzjjNPIXZfFOag6YXI31Ksefv07NrNGFc28", icon: "⛏️", level: 74 }
    ]
  };

  // Overall company stats
  var indusStatsData = [
    { value: 120, suffix: "+", label: "Projects Completed" },
    { value: 21, suffix: "", label: "Industries Covered" },
    { value: 9, suffix: "", label: "Programming Languages" },
    { value: 35, suffix: "+", label: "Platforms Used" },
    { value: 14, suffix: "", label: "AI Models Built" },
    { value: 28, suffix: "+", label: "Hardware Projects" },
    { value: 120, suffix: "+", label: "Websites Created" },
    { value: 500, suffix: "+", label: "Research Hours" },
    { value: 50, suffix: "+", label: "Innovation Ideas" }
  ];

  // Core-skill expertise rings
  var indusRingsData = [
    { label: "Website Engineering", value: 99.9 },
    { label: "Embedded Systems", value: 90 },
    { label: "Artificial Intelligence", value: 87 },
    { label: "Full-Stack Development", value: 99.9 },
    { label: "Hardware Engineering", value: 90 },
    { label: "Media Production", value: 95 }
  ];

  // Featured projects — placeholders, ready for real links/images later
  var indusProjectsData = [
    { badge: "Website", title: "Fly Hyderabad", desc: "A website built by us for Fly Hyderabad", tags: ["Web", "UI/UX"], image: "https://content3.jdmagicbox.com/v2/comp/rangareddy/z6/040pxx40.xx40.241223200112.f9z6/catalogue/fly-hyderabad-shamirpet-rangareddy-restaurants-xgsi7c36yw.jpg", link: "https://flyhyderabad.netlify.app/" },
    { badge: "Website", title: "Connectify", desc: "A social media platform", tags: ["Web", "UI/UX"], image: "https://diamondconnectify.netlify.app/assets/logo.png", link: "https://diamondconnectify.netlify.app/" },
    { badge: "Website", title: "Diamond Pens", desc: "A Pen showcase website", tags: ["Web", "UI/UX"], image: "https://aditya-soni23.github.io/Diamond_Pens/skyhawk.png", link: "https://aditya-soni23.github.io/Diamond_Pens/" },
    { badge: "Website", title: "Diamond Whiteboard", desc: "A whiteboard website tool", tags: ["Web", "UI/UX"], image: "https://static.vecteezy.com/system/resources/thumbnails/007/385/561/small/flat-design-whiteboard-in-wood-grain-background-for-copy-space-background-wallpaper-ads-announcement-advertisement-and-other-free-vector.jpg", link: "https://aditya-soni23.github.io/Diamond_Whiteboard/" },
    { badge: "Website", title: "Electron", desc: "A place where Diamond builds can collaborate and work together on projects!", tags: ["Web", "UI/UX"], image: "https://diamondelectron.netlify.app/logo.png", link: "https://diamondelectron.netlify.app/" },
    { badge: "Website", title: "3D Verse", desc: "One can order their 3d model here", tags: ["Web", "UI/UX"], image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcVMb_9UeNP0-vJUpg_EURBqbnA-FCQk86rsLCNf_EDXgNJkyGdc2fCP0&s=10", link: "https://3d-verse-action-figures.netlify.app/" }
  ];

  // Why DIAMOND — timeline of principles
  var indusTimelineData = [
    { title: "Engineering, not decoration", desc: "Every visual and every feature has a reason to exist — built like a system, not styled like a template." },
    { title: "Real-world problem solving first", desc: "Every discipline above exists to remove friction from someone's actual day, not just to look impressive." },
    { title: "Cross-domain by design", desc: "Hardware talks to software, AI talks to the web — DIAMOND builds across the full stack of the physical and digital." },
    { title: "Accessibility as a default", desc: "From gesture-controlled interfaces to touch-free systems, accessibility is a starting requirement, not an afterthought." },
    { title: "Research-driven decisions", desc: "Every platform and technique earns its place through testing, not trend-chasing." },
    { title: "Shipped, not just prototyped", desc: "Client-ready means client-ready — tested, responsive, and production-quality before it ever goes live." }
  ];

  // Future roadmap
  var indusRoadmapData = [
    { tag: "Current", title: "Client Websites & Tools", desc: "Expanding the website engineering line with more client-ready platforms and dashboards." },
    { tag: "Next", title: "AI-Integrated Hardware", desc: "Merging computer vision and gesture control directly into embedded robotics builds." },
    { tag: "Future", title: "Autonomous Systems", desc: "Self-driving logic and full robotics automation, tested in simulation before physical builds." },
    { tag: "Dream", title: "DIAMOND Innovation Lab", desc: "A dedicated space where hardware, AI, and software fuse into accessibility-first products." }
  ];

  /* ---------------------------------------------------------------
     1. HELPERS
     --------------------------------------------------------------- */
  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }
  function imgUrl(src, w, h) {
    if (src.startsWith("http")) return src;

    return "https://picsum.photos/seed/" +
        encodeURIComponent(src) +
        "/" + (w || 800) +
        "/" + (h || 600);
}
  function chips(list, cls) {
    return list.map(function (t) { return '<span class="' + (cls || "indusChip") + '">' + t + "</span>"; }).join("");
  }

  /* ---------------------------------------------------------------
     2. RENDER: HERO QUICK STATS
     --------------------------------------------------------------- */
  (function renderHeroStats() {
    var wrap = document.getElementById("indusHeroStats");
    if (!wrap) return;
    var quick = [
      { b: indusIndustriesData.length + 1, l: "Industries" },
      { b: Object.keys(indusPlatformsData).length, l: "Platform Categories" },
      { b: "9+", l: "Languages" },
      { b: "120+", l: "Projects" }
    ];
    wrap.innerHTML = quick.map(function (q) {
      return '<div class="indusHeroStat"><b>' + q.b + "</b>" + q.l + "</div>";
    }).join("");
  })();

  /* ---------------------------------------------------------------
     3. RENDER: NAV NODES
     --------------------------------------------------------------- */
  (function renderNav() {
    var track = document.getElementById("indusNavTrack");
    if (!track) return;
    var nodes = [{ id: "indusFlagshipWrap", label: "Websites" }].concat(
      indusIndustriesData.map(function (d) { return { id: "indus-" + d.id, label: d.title }; })
    );
    track.innerHTML = nodes.map(function (n) {
      return '<button class="indusNavNode" data-indus-target="' + n.id + '" type="button">' + n.label + "</button>";
    }).join("");

    track.addEventListener("click", function (e) {
      var btn = e.target.closest(".indusNavNode");
      if (!btn) return;
      var target = document.getElementById(btn.getAttribute("data-indus-target"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  })();

  /* ---------------------------------------------------------------
     4. RENDER: FLAGSHIP (WEBSITE ENGINEERING)
     --------------------------------------------------------------- */
  (function renderFlagship() {
    var wrap = document.getElementById("indusFlagshipWrap");
    if (!wrap) return;
    var d = indusFlagshipData;
    var html =
      '<div class="indusFlagship indusReveal" id="indus-websites">' +
        '<div class="indusFlagshipGrid" aria-hidden="true"></div>' +
        '<span class="indusFlagshipBadge">' + d.icon + " " + d.badge + "</span>" +
        '<div class="indusFlagshipInner">' +
          "<div>" +
            '<h3 class="indusFlagshipTitle">' + d.title + "</h3>" +
            '<p class="indusFlagshipDesc">' + d.desc + "</p>" +
            '<div class="indusFlagshipTags">' + chips(d.tags) + "</div>" +
            '<div class="indusFlagshipStats">' +
              d.stats.map(function (s) {
                return '<div class="indusFlagshipStat"><b data-indus-count data-target="' + s.value + '" data-suffix="' + s.suffix + '">0</b><span>' + s.label + "</span></div>";
              }).join("") +
            "</div>" +
          "</div>" +
          '<div class="indusFlagshipVisual">' +
            '<div class="indusFlagshipVisualHud"><span>DIAMOND // WEB</span><span>LIVE</span></div>' +
            '<div class="indusFlagshipScan"></div>' +
            '<img src="' + d.image + '" alt="Website engineering showcase" loading="lazy">' +
          "</div>" +
        "</div>" +
        '<div class="indusPortfolioRow">' +
          '<span class="indusPortfolioRowLabel">FEATURED WEBSITES — placeholders, links added as projects go live</span>' +
          '<div class="indusPortfolioGrid">' +
            d.portfolio.map(function (p) {
              return '<div class="indusPortfolioCard"><b>' + p.name + "</b><span>" + p.cat + "</span></div>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</div>";
    wrap.appendChild(el(html));
  })();

  /* ---------------------------------------------------------------
     5. RENDER: INDUSTRY CARDS
     --------------------------------------------------------------- */
  (function renderIndustries() {
    var wrap = document.getElementById("indusIndustries");
    if (!wrap) return;
    var frag = document.createDocumentFragment();
    indusIndustriesData.forEach(function (d, i) {
      var card = el(
        '<article class="indusCard indusReveal" id="indus-' + d.id + '">' +
          '<div class="indusCardTop"><div class="indusCardIcon">' + d.icon + '</div><span class="indusCardIndex">' + String(i + 1).padStart(2, "0") + " / " + String(indusIndustriesData.length).padStart(2, "0") + "</span></div>" +
          '<div class="indusCardImg"><img src="' + d.image + '" alt="' + d.title + '" loading="lazy"></div>' +
          '<h3 class="indusCardTitle">' + d.title + "</h3>" +
          '<p class="indusCardDesc">' + d.desc + "</p>" +
          '<div class="indusMeter"><div class="indusMeterTop"><span>Expertise</span><span data-indus-meter-label>0%</span></div><div class="indusMeterTrack"><div class="indusMeterFill" data-indus-meter data-target="' + d.expertise + '"></div></div></div>' +
          '<div class="indusCardStats"><div><b data-indus-count data-target="' + d.projects + '">0</b><span>Projects</span></div><div><b data-indus-count data-target="' + d.tech.length + '">0</b><span>Core Tech</span></div></div>' +
          '<div class="indusChips">' + chips(d.tech) + "</div>" +
          '<div class="indusCardFoot"><span class="indusCardFootLabel">Sample Work</span><ul class="indusProjList">' +
            d.showcase.slice(0, 4).map(function (s) { return "<li>" + s + "</li>"; }).join("") +
          "</ul></div>" +
        "</article>"
      );
      frag.appendChild(card);
    });
    wrap.appendChild(frag);
  })();

  /* ---------------------------------------------------------------
     6. RENDER: STATS + RINGS
     --------------------------------------------------------------- */
  (function renderStats() {
    var grid = document.getElementById("indusStatsGrid");
    if (grid) {
      grid.innerHTML = indusStatsData.map(function (s) {
        return '<div class="indusStatCard indusReveal"><div class="indusStatNumber"><span data-indus-count data-target="' + s.value + '">0</span><span class="indusStatSuffix">' + s.suffix + '</span></div><div class="indusStatLabel">' + s.label + "</div></div>";
      }).join("");
    }
    var rings = document.getElementById("indusRingsGrid");
    if (rings) {
      var svgDefs = '<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="indusRingGradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3b82ff"/><stop offset="100%" stop-color="#5ec8ff"/></linearGradient></defs></svg>';
      rings.innerHTML = svgDefs + indusRingsData.map(function (r) {
        var circumference = 301;
        var offset = circumference - (r.value / 100) * circumference;
        return (
          '<div class="indusRingCard indusReveal">' +
            '<div class="indusRing">' +
              '<svg viewBox="0 0 108 108"><circle class="indusRingTrack" cx="54" cy="54" r="48"/><circle class="indusRingFill" cx="54" cy="54" r="48" data-indus-ring data-offset="' + offset + '"/></svg>' +
              '<div class="indusRingValue" data-indus-ring-value data-target="' + r.value + '">0%</div>' +
            "</div>" +
            '<div class="indusRingLabel">' + r.label + "</div>" +
          "</div>"
        );
      }).join("");
    }
  })();

  /* ---------------------------------------------------------------
     7. RENDER: PLATFORMS
     --------------------------------------------------------------- */
  (function renderPlatforms() {
    var tabsWrap = document.getElementById("indusPlatformsTabs");
    var wall = document.getElementById("indusPlatformsWall");
    if (!tabsWrap || !wall) return;
    var categories = Object.keys(indusPlatformsData);

    tabsWrap.innerHTML = '<button class="indusPTab indusPTabActive" data-indus-cat="all" type="button">All</button>' +
      categories.map(function (c) { return '<button class="indusPTab" data-indus-cat="' + c + '" type="button">' + c + "</button>"; }).join("");

    var tiles = [];
    categories.forEach(function (cat) {
      indusPlatformsData[cat].forEach(function (p) {
        var iconHTML = p.image
    ? '<img src="' + p.image + '" alt="' + p.name + '">'
    : p.icon;

tiles.push(
  '<div class="indusPTile indusReveal" data-indus-platform-cat="' + cat + '">' +
    '<div class="indusPTileIcon">' + iconHTML + '</div>' +
    '<div class="indusPTileName">' + p.name + "</div>" +
    '<div class="indusPTileCat">' + cat + "</div>" +
    '<div class="indusPTileMeter"><span data-indus-platform-meter data-target="' + p.level + '"></span></div>' +
  "</div>"
);
      });
    });
    wall.innerHTML = tiles.join("");

    tabsWrap.addEventListener("click", function (e) {
      var btn = e.target.closest(".indusPTab");
      if (!btn) return;
      tabsWrap.querySelectorAll(".indusPTab").forEach(function (b) { b.classList.remove("indusPTabActive"); });
      btn.classList.add("indusPTabActive");
      var cat = btn.getAttribute("data-indus-cat");
      wall.querySelectorAll(".indusPTile").forEach(function (tile) {
        var match = cat === "all" || tile.getAttribute("data-indus-platform-cat") === cat;
        tile.classList.toggle("indusHidden", !match);
      });
    });
  })();

  /* ---------------------------------------------------------------
     8. RENDER: PROJECTS
     --------------------------------------------------------------- */
  (function renderProjects() {
    var grid = document.getElementById("indusProjectsGrid");
    if (!grid) return;
    grid.innerHTML = indusProjectsData.map(function (p) {
      return (
        '<article class="indusProjCard indusReveal">' +
          '<div class="indusProjImg"><span class="indusProjBadge">' + p.badge + '</span><img src="' + imgUrl(p.image, 700, 440) + '" alt="' + p.title + '" loading="lazy"></div>' +
          '<div class="indusProjBody">' +
            '<h3 class="indusProjTitle">' + p.title + "</h3>" +
            '<p class="indusProjDesc">' + p.desc + "</p>" +
            '<div class="indusProjTags">' + chips(p.tags) + "</div>" +
            '<a class="indusProjBtn" href="' + p.link + '" target="_blank" rel="noopener noreferrer">View project →</a>' +
          "</div>" +
        "</article>"
      );
    }).join("");
  })();

  /* ---------------------------------------------------------------
     9. RENDER: TIMELINE + ROADMAP
     --------------------------------------------------------------- */
  (function renderTimeline() {
    var wrap = document.getElementById("indusTimeline");
    if (!wrap) return;
    wrap.innerHTML = indusTimelineData.map(function (t) {
      return (
        '<div class="indusTimeItem indusReveal">' +
          '<div class="indusTimeDot"></div>' +
          '<h3 class="indusTimeTitle">' + t.title + "</h3>" +
          '<p class="indusTimeDesc">' + t.desc + "</p>" +
        "</div>"
      );
    }).join("");
  })();

  (function renderRoadmap() {
    var wrap = document.getElementById("indusRoadmapTrack");
    if (!wrap) return;
    wrap.innerHTML = indusRoadmapData.map(function (r) {
      return (
        '<div class="indusRoadStage indusReveal">' +
          '<span class="indusRoadTag">' + r.tag + "</span>" +
          '<h4 class="indusRoadTitle">' + r.title + "</h4>" +
          '<p class="indusRoadDesc">' + r.desc + "</p>" +
        "</div>"
      );
    }).join("");
  })();

  /* ---------------------------------------------------------------
     10. PARTICLES CANVAS (hero background)
     --------------------------------------------------------------- */
  (function particles() {
    var canvas = document.getElementById("indusParticles");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var particlesArr = [];
    var mouse = { x: null, y: null };
    var DPR = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * DPR;
      canvas.height = rect.height * DPR;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      buildParticles(rect.width, rect.height);
    }

    function buildParticles(w, h) {
      var count = Math.min(70, Math.floor((w * h) / 16000));
      particlesArr = [];
      for (var i = 0; i < count; i++) {
        particlesArr.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.6 + 0.6
        });
      }
    }

    function tick() {
      var w = canvas.width / DPR, h = canvas.height / DPR;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particlesArr.length; i++) {
        var p = particlesArr[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(94,200,255,0.55)";
        ctx.fill();

        for (var j = i + 1; j < particlesArr.length; j++) {
          var q = particlesArr[j];
          var dx = p.x - q.x, dy = p.y - q.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(59,130,255," + (0.14 * (1 - dist / 120)) + ")";
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(tick);
    }

    window.addEventListener("resize", resize);
    resize();
    requestAnimationFrame(tick);
  })();

  /* ---------------------------------------------------------------
     11. CURSOR GLOW + CARD 3D TILT + CARD SPOTLIGHT
     --------------------------------------------------------------- */
  (function cursorFX() {
    var glow = document.getElementById("indusCursorGlow");
    root.addEventListener("mousemove", function (e) {
      if (glow) {
        glow.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px) translate(-50%,-50%)";
      }
    });
  })();

  (function tiltCards() {
    function attach(selector, maxTilt) {
      document.querySelectorAll(selector).forEach(function (card) {
        card.addEventListener("mousemove", function (e) {
          var rect = card.getBoundingClientRect();
          var x = e.clientX - rect.left, y = e.clientY - rect.top;
          var px = x / rect.width, py = y / rect.height;
          var rx = (0.5 - py) * maxTilt;
          var ry = (px - 0.5) * maxTilt;
          card.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-4px)";
          card.style.setProperty("--indus-mx", (px * 100) + "%");
          card.style.setProperty("--indus-my", (py * 100) + "%");
        });
        card.addEventListener("mouseleave", function () {
          card.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
        });
      });
    }
    attach(".indusCard", 6);
  })();

  /* ---------------------------------------------------------------
     12. MAGNETIC BUTTONS
     --------------------------------------------------------------- */
  (function magnetic() {
    document.querySelectorAll("[data-indus-magnet]").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = "translate(" + x * 0.25 + "px," + y * 0.25 + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "translate(0,0)";
      });
    });
  })();

  /* ---------------------------------------------------------------
     13. SCROLL REVEAL + COUNTERS + METERS + RINGS (single observer pass)
     --------------------------------------------------------------- */
  (function scrollFX() {
    function animateCount(node) {
      var target = parseFloat(node.getAttribute("data-target")) || 0;
      var suffix = node.getAttribute("data-suffix") || "";
      var duration = 1400;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var val = Math.floor(eased * target);
        node.textContent = val + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else node.textContent = target + suffix;
      }
      requestAnimationFrame(step);
    }

    function animateMeter(node) {
      var target = node.getAttribute("data-target");
      node.style.width = target + "%";
      var label = node.closest(".indusMeter");
      if (label) {
        var lbl = label.querySelector("[data-indus-meter-label]");
        if (lbl) {
          var n = { v: 0 };
          var duration = 1200, start = null, tgt = parseFloat(target);
          function step(ts) {
            if (!start) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            n.v = Math.floor(progress * tgt);
            lbl.textContent = n.v + "%";
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }
      }
    }

    function animateRing(node) {
      var offset = node.getAttribute("data-offset");
      node.style.strokeDashoffset = offset;
      var valueNode = node.closest(".indusRing").querySelector("[data-indus-ring-value]");
      if (valueNode) animateCountToPercent(valueNode);
    }
    function animateCountToPercent(node) {
      var target = parseFloat(node.getAttribute("data-target")) || 0;
      var duration = 1400, start = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        node.textContent = Math.floor(progress * target) + "%";
        if (progress < 1) requestAnimationFrame(step);
        else node.textContent = target + "%";
      }
      requestAnimationFrame(step);
    }

    function animatePlatformMeter(node) {
      var target = node.getAttribute("data-target");
      node.style.width = target + "%";
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var target = entry.target;
        target.classList.add("indusInView");

        target.querySelectorAll("[data-indus-count]").forEach(function (n) {
          if (!n.dataset.indusDone) { n.dataset.indusDone = "1"; animateCount(n); }
        });
        target.querySelectorAll("[data-indus-meter]").forEach(function (n) {
          if (!n.dataset.indusDone) { n.dataset.indusDone = "1"; animateMeter(n); }
        });
        target.querySelectorAll("[data-indus-ring]").forEach(function (n) {
          if (!n.dataset.indusDone) { n.dataset.indusDone = "1"; animateRing(n); }
        });
        target.querySelectorAll("[data-indus-platform-meter]").forEach(function (n) {
          if (!n.dataset.indusDone) { n.dataset.indusDone = "1"; animatePlatformMeter(n); }
        });

        observer.unobserve(target);
      });
    }, { threshold: 0.18 });

    document.querySelectorAll(".indusReveal").forEach(function (n) { observer.observe(n); });

    // Roadmap line draw
    var lineEl = document.getElementById("indusRoadmapLine");
    if (lineEl) {
      var lineObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var draw = document.createElementNS("http://www.w3.org/2000/svg", "line");
            draw.setAttribute("x1", "0"); draw.setAttribute("y1", "2");
            draw.setAttribute("x2", "1200"); draw.setAttribute("y2", "2");
            draw.setAttribute("class", "indusLineDraw");
            lineEl.appendChild(draw);
            requestAnimationFrame(function () { draw.style.strokeDashoffset = "0"; });
            lineObserver.unobserve(lineEl);
          }
        });
      }, { threshold: 0.4 });
      lineObserver.observe(lineEl);
    }
  })();

  /* ---------------------------------------------------------------
     14. NAV ACTIVE-STATE ON SCROLL
     --------------------------------------------------------------- */
  (function navActive() {
    var sections = [document.getElementById("indusFlagshipWrap")].concat(
      indusIndustriesData.map(function (d) { return document.getElementById("indus-" + d.id); })
    ).filter(Boolean);

    var navNodes = Array.prototype.slice.call(document.querySelectorAll(".indusNavNode"));
    if (!sections.length || !navNodes.length) return;

    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navNodes.forEach(function (n) {
          n.classList.toggle("indusNavActive", n.getAttribute("data-indus-target") === id);
        });
      });
    }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (s) { navObserver.observe(s); });
  })();

  /* ---------------------------------------------------------------
     15. SCROLL CUE CLICK
     --------------------------------------------------------------- */
  (function scrollCue() {
    var cue = document.getElementById("indusScrollCue");
    if (!cue) return;
    cue.addEventListener("click", function () {
      var target = document.getElementById("indusFlagshipWrap") || document.getElementById("indusNav");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  })();

  /* ---------------------------------------------------------------
     16. SHOWREEL PLAYBACK
     --------------------------------------------------------------- */
  (function showreelPlayback() {
    var video = document.getElementById("indusShowreel");
    var playButton = document.getElementById("indusVideoPlay");
    var frame = document.getElementById("indusVideoFrame");
    if (!video || !playButton || !frame) return;

    function playShowreel() {
      video.muted = false;
      video.volume = 1;
      var playAttempt = video.play();
      if (playAttempt) playAttempt.catch(function () { /* Browser will keep native controls available. */ });
    }

    playButton.addEventListener("click", playShowreel);
    video.addEventListener("play", function () { frame.classList.add("indusVideoPlaying"); });
    video.addEventListener("pause", function () { if (!video.ended) frame.classList.remove("indusVideoPlaying"); });
    video.addEventListener("ended", function () { frame.classList.remove("indusVideoPlaying"); });
  })();

})();
