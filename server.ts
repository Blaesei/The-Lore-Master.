import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON parsing
app.use(express.json());

// Path definitions using process.cwd()
const DATA_DIR = path.join(process.cwd(), "data");
const ROLES_PATH = path.join(DATA_DIR, "members_roles.json");
const PROJECTS_PATH = path.join(DATA_DIR, "historical_projects.json");
const VIBES_PATH = path.join(DATA_DIR, "vibe_check_feedback.json");

// Verify directories and create database templates if they do not exist
function initializeDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const defaultRoles = [
    {
      "role": "Community Lead",
      "name": "Alex Rivera",
      "handle": "@alex_rivera",
      "contact": "alex.rivera@gdgchapter.org",
      "responsibilities": [
        "chapter operations",
        "sponsorship approvals",
        "room bookings",
        "budget signing",
        "overall lead"
      ],
      "forms": [
        { "name": "Room Reservation Request", "url": "https://forms.gle/room-reserve-gdg" },
        { "name": "External Sponsorship Approval", "url": "https://forms.gle/sponsor-gdg" }
      ]
    },
    {
      "role": "Creatives & Branding Co-Lead",
      "name": "Chloe Chen",
      "handle": "@chloe_creatives",
      "contact": "chloe.chen@gdgchapter.org",
      "responsibilities": [
        "poster designs",
        "branding guidelines",
        "social media templates",
        "stickers and merchandise editing",
        "video editing",
        "visual assets"
      ],
      "forms": [
        { "name": "Design Asset Request Form", "url": "https://forms.gle/creatives-request-gdg" }
      ]
    },
    {
      "role": "Logistics & Event Manager",
      "name": "Marcus Vance",
      "handle": "@marcus_logistics",
      "contact": "marcus.vance@gdgchapter.org",
      "responsibilities": [
        "catering and food coordinates",
        "sound system configuration",
        "sign-in tables",
        "venue setup",
        "speaker gifts",
        "catering order"
      ],
      "forms": [
        { "name": "Catering Preference Form", "url": "https://forms.gle/catering-order-gdg" }
      ]
    },
    {
      "role": "Technical & Labs Lead",
      "name": "Dani Solis",
      "handle": "@dani_labs",
      "contact": "dani.solis@gdgchapter.org",
      "responsibilities": [
        "speaker recruitment for tech talks",
        "github repository setups",
        "hackathon judging rubrics",
        "hands-on coding workshops",
        "cloud credits distribution",
        "c++ algorithms",
        "python machine learning topics"
      ],
      "forms": [
        { "name": "Tech Speaker Proposal Form", "url": "https://forms.gle/tech-speaker-gdg" }
      ]
    },
    {
      "role": "Finance Secretary",
      "name": "Sarah Jenkins",
      "handle": "@sarah_finance",
      "contact": "sarah.jenkins@gdgchapter.org",
      "responsibilities": [
        "reimbursements",
        "receipt collection",
        "bank account updates",
        "snack budgets",
        "ledger spreadsheets"
      ],
      "forms": [
        { "name": "Reimbursement Claim Sheet", "url": "https://forms.gle/reimburser-gdg" }
      ]
    }
  ];

  const defaultProjects = [
    {
      "id": "project-shebuilds-2026",
      "name": "She Builds: Women in Tech Careers 2026",
      "theme": "Sustaining Diverse Representation in Software Development",
      "year": 2026,
      "budget": 850,
      "attendees": 220,
      "location": "Manila",
      "date": "May 30",
      "assets": {
        "slides": "https://docs.google.com/presentation/d/shebuilds-manila-2026",
        "photos": "https://photos.app.goo.gl/shebuilds-manila-2026",
        "github": "https://github.com/gdg-apc/shebuilds-25"
      },
      "key_takeaways": [
        "Inspirational keynote panel delivered by top regional women engineering directors.",
        "Hands-on UI workshop was highly successful; 90% completion rate for projects done on-the-fly.",
        "Merchandise booklets and premium sticker packs ran out quickly. Estimate 20% extra padding next time."
      ]
    },
    {
      "id": "project-cloudmanila-2026",
      "name": "GDG Cloud Manila Build with AI: The Future of AI & Research",
      "theme": "Democratizing Gen AI for Students",
      "year": 2026,
      "budget": 450,
      "attendees": 120,
      "location": "Manila",
      "date": "Jun 6",
      "assets": {
        "slides": "https://docs.google.com/presentation/d/buildwithai-manila",
        "github": "https://github.com/gdg-apc/buildwithai-ml-models",
        "photos": "https://photos.app.goo.gl/buildwithai-manila"
      },
      "key_takeaways": [
        "Secured localized cloud servers and credit vouchers which saved 15% on API costs.",
        "Several student groups lacked node packages prep. Need prerequisite guides sent 48 hours early.",
        "Dani Solis' live demo on model fine-tuning was rated as the single most engaging session."
      ]
    },
    {
      "id": "project-hauorgfest-2026",
      "name": "GDG HAU Organizational Festival (Freshmen Orientation '26-'27)",
      "theme": "Opening Dev Chapters for Student Newcomers",
      "year": 2026,
      "budget": 250,
      "attendees": 400,
      "location": "Angeles",
      "date": "Jun 2",
      "assets": {
        "photos": "https://photos.app.goo.gl/hauorgfest-2026",
        "slides": "https://docs.google.com/presentation/d/hauorgfest"
      },
      "key_takeaways": [
        "Record-breaking freshmen enlistment; over 400 students registered for study groups.",
        "Interactive programming logic arcade booth was heavily crowded. Setup 2 terminals instead of 1.",
        "QR code check-ins worked flawlessly, reducing crowd queuing delay by 40 minutes."
      ]
    },
    {
      "id": "project-cebu-2026",
      "name": "Build with AI Cebu 2026",
      "theme": "Hands-On Model Building & Local Deployment Integrations",
      "year": 2026,
      "budget": 600,
      "attendees": 180,
      "location": "Cebu",
      "date": "May 30",
      "assets": {
        "slides": "https://docs.google.com/presentation/d/buildwithai-cebu-25",
        "github": "https://github.com/gdg-apc/buildwithai-cebu-edge-deploy",
        "photos": "https://photos.app.goo.gl/buildwithai-cebu-25"
      },
      "key_takeaways": [
        "Overwhelming local developer attendance in Cebu chapters with great mentor network engagements.",
        "Food budget was well spent on catering traditional Cebu local favorites.",
        "Many questions were focused on on-device ML runtimes (TensorFlow Lite / Gemini Nano)."
      ]
    }
  ];

  const defaultVibes = [
    {
      "id": "vibe-1716301200000",
      "text": "The creative templates were shared a bit too late for our last workshop presentation deck. Next time let's have a unified theme ready 1 week in advance.",
      "timestamp": "2026-05-18T14:20:00.000Z"
    },
    {
      "id": "vibe-1716387600000",
      "text": "Excited for the upcoming Build with AI hackathon! I hope we can offer vegetarian pizza options for Marcus' catering roster.",
      "timestamp": "2026-05-19T09:10:00.000Z"
    }
  ];

  if (!fs.existsSync(ROLES_PATH)) {
    fs.writeFileSync(ROLES_PATH, JSON.stringify(defaultRoles, null, 2));
  }
  if (!fs.existsSync(PROJECTS_PATH)) {
    fs.writeFileSync(PROJECTS_PATH, JSON.stringify(defaultProjects, null, 2));
  }
  if (!fs.existsSync(VIBES_PATH)) {
    fs.writeFileSync(VIBES_PATH, JSON.stringify(defaultVibes, null, 2));
  }
}

// Perform initial db checks
initializeDatabase();

// Lazy Gemini Client Initialization
let aiClient: GoogleGenAI | null = null;
function getGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Read database files safely
const readRoles = () => JSON.parse(fs.readFileSync(ROLES_PATH, "utf-8"));
const readProjects = () => JSON.parse(fs.readFileSync(PROJECTS_PATH, "utf-8"));
const readVibes = () => JSON.parse(fs.readFileSync(VIBES_PATH, "utf-8"));

// Write database files safely
const writeRoles = (data: any) => fs.writeFileSync(ROLES_PATH, JSON.stringify(data, null, 2));
const writeProjects = (data: any) => fs.writeFileSync(PROJECTS_PATH, JSON.stringify(data, null, 2));
const writeVibes = (data: any) => fs.writeFileSync(VIBES_PATH, JSON.stringify(data, null, 2));

// ==========================================
// 🔗 API Endpoints
// ==========================================

// Get org roles directory
app.get("/api/org/roles", (req, res) => {
  try {
    const data = readRoles();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to read roles directory" });
  }
});

// Update org roles directory
app.post("/api/org/roles", (req, res) => {
  try {
    const updatedRoles = req.body;
    if (!Array.isArray(updatedRoles)) {
      return res.status(400).json({ error: "Invalid roles format. Expected array." });
    }
    writeRoles(updatedRoles);
    res.json({ success: true, message: "Directory updated successfully!" });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to save directory data" });
  }
});

// Get historical projects
app.get("/api/projects/all", (req, res) => {
  try {
    const data = readProjects();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to read historical project database" });
  }
});

// Add historical project
app.post("/api/projects/add", (req, res) => {
  try {
    const newProject = req.body;
    if (!newProject.name || !newProject.year) {
      return res.status(400).json({ error: "Missing required fields: name or year." });
    }
    const projects = readProjects();
    newProject.id = `project-${Date.now()}`;
    projects.push(newProject);
    writeProjects(projects);
    res.json({ success: true, project: newProject });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to add project record" });
  }
});

// Get anonymous vibe checks
app.get("/api/vibechecks/all", (req, res) => {
  try {
    const vibes = readVibes();
    res.json(vibes);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to read vibe checks" });
  }
});

// Submit anonymous vibe check (Sanitizes credentials, censors profanity, and protects against spam)
app.post("/api/vibechecks/submit", (req, res) => {
  try {
    const { message } = req.body;
    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Feedback message cannot be empty." });
    }

    const PROFANITIES = [
      "fuck", "fucking", "fucker", "shit", "shitting", "bitch", "bitches", "asshole", 
      "ass", "crap", "damn", "bastard", "cunt", "dick", "pussy", "motherfucker", 
      "whore", "piss", "slut"
    ];

    // SANITIZE: Strip Slack/Discord ID markers, emails, names, or handles pattern
    // e.g. <@U12345678> or Discord user tags like Username#1234
    let sanitizedText = message;
    sanitizedText = sanitizedText.replace(/<@[A-Z0-9]+>/gi, "[ANONYMOUS_USER]");
    sanitizedText = sanitizedText.replace(/[a-zA-Z0-9._%+-]+@student\.[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi, "[EMAIL_REDACTED]");
    sanitizedText = sanitizedText.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi, "[EMAIL_REDACTED]");
    sanitizedText = sanitizedText.replace(/#\d{4}/g, ""); // Discord legacy tags
    
    // Profanity check & masking
    let hasProfanity = false;
    PROFANITIES.forEach(word => {
      const regex = new RegExp("\\b" + word + "s?\\b", "gi");
      if (regex.test(sanitizedText)) {
        hasProfanity = true;
        sanitizedText = sanitizedText.replace(regex, (match) => {
          return match[0] + "*".repeat(match.length - 1);
        });
      }
    });

    // Clean trailing/leading spaces
    sanitizedText = sanitizedText.trim();

    const vibes = readVibes();

    // RATE LIMITING / SPAM PREVENTION:
    // 1. Prevent exact duplicate spam within the recent submissions
    const isDuplicate = vibes.slice(0, 15).some(v => v.text.toLowerCase().trim() === sanitizedText.toLowerCase().trim());
    if (isDuplicate) {
      return res.status(400).json({ error: "Duplicate spam detected! Please submit unique, constructive feedback." });
    }

    // 2. Prevent consecutive fast submissions (global limit of 3 seconds)
    if (vibes.length > 0) {
      const timeDiff = Date.now() - new Date(vibes[0].timestamp).getTime();
      if (timeDiff < 3000) {
        return res.status(429).json({ error: "System rate limit: Please wait a few seconds before trying again." });
      }
    }

    const newVibe = {
      id: `vibe-${Date.now()}`,
      text: sanitizedText,
      timestamp: new Date().toISOString(),
      censored: hasProfanity
    };

    vibes.unshift(newVibe); // Prepend new submit to top
    writeVibes(vibes);

    res.json({ 
      success: true, 
      message: hasProfanity 
        ? "Submitted! Your feedback was sanitized and filtered for inappropriate content." 
        : "Vibe check recorded securely and anonymously!", 
      vibe: newVibe 
    });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to submit anonymous vibe check" });
  }
});

// ==========================================
// 🤖 The Core AI & Logic Fallback Chatbot
// ==========================================

// System instructions for the Google Gemini assistant
const LORE_MASTER_SYSTEM_INSTRUCTION = `
You are "The Lore Master", an autonomous student organization historian and concierge bot for a Google Developer Groups (GDG) student chapter or technology student organization.
Your goal is to friendly, accurately, and contextually guide members in understanding who handles what, past events (budgets, theme, asset links, lessons), and onboarding.

Here are your operation rules:
1. "Who Do I Ask?" lookup: Match user inquiries regarding responsibilities, topics, or operations with the active officer, their slack/discord contact handle, and provide relevant submission forms if available.
2. "Context-Aware Event Debriefer": Query past events, and return a beautifully structured, highly readable summary (with theme, year, budget, links, key takeaways/metrics) when asked about historical events.
3. Keep answers concise, helpful, and aligned with Google's clean and encouraging community vibe.
4. If asked about something not in the database, politely state you don't possess that specific piece of "lore", but suggest who in the directory might be best poised to know, or ask to consult other documentation.
`;

// 1. CHATBOT CONCIERGE LOOKUP
app.post("/api/bot/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const ai = getGemini();
  const currentRoles = readRoles();
  const currentProjects = readProjects();

  // If Gemini API is available, use LLM parser
  if (ai) {
    try {
      const prompt = `
Context databases:
=== STUDENT DIRECTORY / ROLES ===
${JSON.stringify(currentRoles, null, 2)}

=== HISTORICAL EVENT LOGS ===
${JSON.stringify(currentProjects, null, 2)}

User request: "${message}"

Respond precisely using the databases provided. If the user asks for a person, give their name, handle, role, responsibilities, and appropriate form URLs. If they ask about a project, provide a clean rundown of the project with theme, year, budget, assets, and key takeaways/lessons learned. Follow the system instruction closely.`;

      const geminiResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: LORE_MASTER_SYSTEM_INSTRUCTION,
          temperature: 0.2
        }
      });

      return res.json({
        response: geminiResponse.text,
        source: "Gemini AI"
      });
    } catch (apiError: any) {
      console.error("Gemini API Chatbox failure, routing to local parser:", apiError.message);
      // Fall through to local fallback parser below
    }
  }

  // ==== 🛠️ LOCAL RULE-BASED FALLBACK PARSER ====
  const queryLower = message.toLowerCase();
  let responseText = "";

  // A. Checking Projects Database ("theme", "devfest", "build with ai", "solution challenge", "past event", "year", etc.)
  const matchedProjects = currentProjects.filter((p: any) => {
    return (
      queryLower.includes(p.name.toLowerCase()) ||
      queryLower.includes(p.theme.toLowerCase()) ||
      (queryLower.includes("devfest") && p.name.toLowerCase().includes("devfest")) ||
      (queryLower.includes("build") && p.name.toLowerCase().includes("build")) ||
      (queryLower.includes("kickoff") && p.name.toLowerCase().includes("kickoff")) ||
      (queryLower.includes("solution") && p.name.toLowerCase().includes("solution")) ||
      (queryLower.includes("challenge") && p.name.toLowerCase().includes("challenge"))
    );
  });

  // B. Checking Member responsibilities
  const matchedRoles = currentRoles.filter((r: any) => {
    const roleMatches = queryLower.includes(r.role.toLowerCase()) || queryLower.includes(r.name.toLowerCase());
    const respMatches = r.responsibilities.some((resp: string) => queryLower.includes(resp.toLowerCase()));
    
    // custom keyword mapping
    let customMatches = false;
    if (queryLower.includes("room") || queryLower.includes("book") || queryLower.includes("university")) {
      customMatches = r.role.includes("Community Lead");
    }
    if (queryLower.includes("poster") || queryLower.includes("graphic") || queryLower.includes("design") || queryLower.includes("stickers") || queryLower.includes("merch") || queryLower.includes("video")) {
      customMatches = r.role.includes("Creatives");
    }
    if (queryLower.includes("catering") || queryLower.includes("food") || queryLower.includes("sound") || queryLower.includes("audio") || queryLower.includes("venue") || queryLower.includes("pizza")) {
      customMatches = r.role.includes("Logistics");
    }
    if (queryLower.includes("code") || queryLower.includes("speaker") || queryLower.includes("tutorial") || queryLower.includes("git") || queryLower.includes("cloud") || queryLower.includes("tech")) {
      customMatches = r.role.includes("Technical");
    }
    if (queryLower.includes("money") || queryLower.includes("reimburse") || queryLower.includes("budget") || queryLower.includes("pay") || queryLower.includes("finance") || queryLower.includes("receipt")) {
      customMatches = r.role.includes("Finance");
    }

    return roleMatches || respMatches || customMatches;
  });

  if (queryLower.includes("who are you") || queryLower.includes("what is this") || queryLower.includes("what do you do")) {
    responseText = `### 🔮 The Lore Master
I am "The Lore Master", your autonomous student organization historian and concierge for our GDG chapter.
I'm here to help you:
1. Find out who handles specific tasks (e.g., "who handles room bookings?").
2. Get quick summaries of our past events (e.g., "tell me about DevFest 2026").
3. Connect you with the right teams and forms!

How can I help you today?`;
  } else if (matchedProjects.length > 0) {
    const proj = matchedProjects[0];
    responseText += `### 📂 Historical Archive Found: **${proj.name}**\n\n`;
    responseText += `* **Year**: ${proj.year}\n`;
    responseText += `* **Theme**: *"${proj.theme}"*\n`;
    responseText += `* **Budget Spent**: \$${proj.budget}\n`;
    responseText += `* **Attendees Count**: ${proj.attendees} students\n\n`;
    
    responseText += `#### 🔗 Asset Links:\n`;
    Object.entries(proj.assets || {}).forEach(([key, val]) => {
      responseText += `- **${key.toUpperCase()}**: [${val}](${val})\n`;
    });
    
    responseText += `\n#### 💡 Lore & Key Takeaways / Lessons Learn:\n`;
    proj.key_takeaways.forEach((takeaway: string) => {
      responseText += `- ${takeaway}\n`;
    });
    responseText += `\n*(Note: Powered by localized, rule-based database search fallback)*`;
  } else if (matchedRoles.length > 0) {
    const contact = matchedRoles[0];
    responseText += `### 👤 Org Directory Found: **${contact.name}**\n\n`;
    responseText += `* **Role**: ${contact.role}\n`;
    responseText += `* **Contact Handle**: \`${contact.handle}\` (Slack/Discord)\n`;
    responseText += `* **Email**: \`${contact.contact}\`\n\n`;
    
    responseText += `#### 📋 Scope of Responsibilities:\n`;
    contact.responsibilities.forEach((resp: string) => {
      responseText += `- Handles ${resp}\n`;
    });

    if (contact.forms && contact.forms.length > 0) {
      responseText += `\n#### 📬 Directly Related Forms & Tools:\n`;
      contact.forms.forEach((form: any) => {
        responseText += `- **[${form.name}](${form.url})**\n`;
      });
    }
    responseText += `\n*(Note: Powered by localized, rule-based database search fallback)*`;
  } else {
    // General helpful template if no exact keywords matched
    responseText = `### 🔮 The Lore Master's Vault
I scanned our organization archives but didn't find direct matches for your query: *"${message}"*.

However, here is a quick directory of who handles top scopes:
- 🏢 **Operations & Venue Bookings**: Alex Rivera (Community Lead - \`@alex_rivera\`)
- 🎨 **Posters & Assets Request**: Chloe Chen (Creatives - \`@chloe_creatives\`)
- 🍕 **Catering & On-Site Setup**: Marcus Vance (Logistics - \`@marcus_logistics\`)
- 💻 **Tech Workshops & Labs Speeches**: Dani Solis (Technical - \`@dani_labs\`)
- 💵 **Reimbursements & Ledger Receipts**: Sarah Jenkins (Finance Secretary - \`@sarah_finance\`)

Try asking me about past events like **DevFest**, **Solution Challenge**, or **Build with AI**!`;
  responseText += `\n\n*(Note: Active falling back to quick directory as no matched archives were identified)*`;
  }


  res.json({
    response: responseText,
    source: "Rule-Based Local Fallback Server"
  });
});

// 2. AUTOMATED HANDOFF SUMMARIZER
app.post("/api/bot/handoff", async (req, res) => {
  const { minutes } = req.body;
  if (!minutes || minutes.trim() === "") {
    return res.status(400).json({ error: "Meeting minutes are required in order to generate a handoff." });
  }

  const ai = getGemini();

  const HANDOFF_SYSTEM_INSTRUCTION = `
You are the lore master. Your task is to process raw meeting minutes or discussion logs and extract a high-impact, highly action-oriented HANDOFF SUMMARY.
Format rules:
- Strictly output exactly three bullet points.
- Highlight specific actionable tasks and the person or committee who owns it.
- Emphasize and call out cross-committee or cross-functional dependencies (e.g. "Creatives co-lead Chloe Chen needs speaker photos from Marcus by Friday", or "Labs team requires catering final headcount").
- Keep it concise, professional, and clear.
- Do not output any intro or outro text. Output ONLY the 3 bullet points.
`;

  if (ai) {
    try {
      const prompt = `Please summarize the following minutes into a structured 3-bullet handoff summary highlighting clear action points and team dependencies:\n\n"${minutes}"`;
      
      const geminiResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: HANDOFF_SYSTEM_INSTRUCTION,
          temperature: 0.3
        }
      });

      return res.json({
        summary: geminiResponse.text,
        source: "Gemini AI"
      });
    } catch (apiError: any) {
      console.error("Gemini API Handoff failure, routing to local parser:", apiError.message);
    }
  }

  // ==== 🛠️ LOCAL RULE-BASED REGEX TEMPLATE FALLBACK PARSER ====
  // We split the input block into lines and run quick regex/keyword detectors
  // to extract actionable steps
  const lines = minutes.split(/\n+/).map((l: string) => l.trim()).filter((l: string) => l.length > 5);
  
  const extractedBullets: string[] = [];

  // Keywords to scout
  const keywords = ["need", "must", "action", "responsibility", "deadline", "todo", "by", "for", "handling", "pending", "schedule"];

  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    const hasKeyword = keywords.some(k => lowerLine.includes(k));
    if (hasKeyword && extractedBullets.length < 3) {
      // Clean up punctuation or list numbers from start of line
      const cleanLine = line.replace(/^[*\-\d.\s]+/g, "");
      extractedBullets.push(cleanLine);
    }
  }

  // Pad to exactly 3 bullets if we didn't find enough
  if (extractedBullets.length < 1) {
    extractedBullets.push("Review action items on Google Drive for scheduled event logistics owned by Logistics & Creatives committees.");
  }
  if (extractedBullets.length < 2) {
    extractedBullets.push("Creatives and Design team to streamline templates submission for upcoming speaker marketing banners.");
  }
  if (extractedBullets.length < 3) {
    extractedBullets.push("Community Lead Alex to confirm room booking status and catering coordinates by upcoming Friday.");
  }

  const fallbackText = extractedBullets.map(b => `• ${b}`).join("\n");

  res.json({
    summary: fallbackText,
    source: "Local Actionable-Line Extractor Fallback"
  });
});

// ==========================================
// ⚡ VITE MIDDLEWARE & STATIC SERVER
// ==========================================

async function startServer() {
  // In production, serve built files. In development, mount Vite middleware.
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the 'dist' folders
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    // Handle standard express fallback for star routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Start listener
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Lore Databases initialized successfully in data/ directory`);
  });
}

startServer();
