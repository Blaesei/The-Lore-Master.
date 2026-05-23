import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bot,
  Users,
  FileText,
  Sparkles,
  MessageSquare,
  Plus,
  Trash2,
  Globe,
  Github,
  Database,
  CheckCircle,
  Send,
  Coins,
  ShieldCheck,
  HelpCircle,
  ExternalLink,
  RefreshCw,
  Layers,
  Calendar,
  Layers3,
  Mail,
  Lock,
  FileCheck,
  ArrowRight,
  Search,
  MapPin,
  User,
  Settings,
  LogOut,
  Info,
  SlidersHorizontal,
  Cloud,
  X
} from "lucide-react";
import { RoleDirectoryItem, HistoricalProject, VibeCheck, ChatMessage } from "./types";
import { SAMPLE_MEETING_MINUTES, QUICK_START_SUGGESTIONS } from "./mockData";
import ConstellationBackground from "./components/ConstellationBackground";
import SignInForm from "./components/SignInForm";

// Robust dynamic fallback layers for static/offline hosting platforms like Vercel
const FALLBACK_ROLES: RoleDirectoryItem[] = [
  {
    role: "Community Lead",
    name: "Alex Rivera",
    handle: "@alex_rivera",
    contact: "alex.rivera@gdgchapter.org",
    responsibilities: [
      "chapter operations",
      "sponsorship approvals",
      "room bookings",
      "budget signing",
      "overall lead"
    ],
    forms: [
      { name: "Room Reservation Request", url: "https://forms.gle/room-reserve-gdg" },
      { name: "External Sponsorship Approval", url: "https://forms.gle/sponsor-gdg" }
    ]
  },
  {
    role: "Creatives & Branding Co-Lead",
    name: "Chloe Chen",
    handle: "@chloe_creatives",
    contact: "chloe.chen@gdgchapter.org",
    responsibilities: [
      "poster designs",
      "branding guidelines",
      "social media templates",
      "stickers and merchandise editing",
      "video editing",
      "visual assets"
    ],
    forms: [
      { name: "Design Asset Request Form", url: "https://forms.gle/creatives-request-gdg" }
    ]
  },
  {
    role: "Logistics & Event Manager",
    name: "Marcus Vance",
    handle: "@marcus_logistics",
    contact: "marcus.vance@gdgchapter.org",
    responsibilities: [
      "catering and food coordinates",
      "sound system configuration",
      "sign-in tables",
      "venue setup",
      "speaker gifts",
      "catering order"
    ],
    forms: [
      { name: "Catering Preference Form", url: "https://forms.gle/catering-order-gdg" }
    ]
  },
  {
    role: "Technical & Labs Lead",
    name: "Dani Solis",
    handle: "@dani_labs",
    contact: "dani.solis@gdgchapter.org",
    responsibilities: [
      "speaker recruitment for tech talks",
      "github repository setups",
      "hackathon judging rubrics",
      "hands-on coding workshops",
      "cloud credits distribution",
      "c++ algorithms",
      "python machine learning topics"
    ],
    forms: [
      { name: "Tech Speaker Proposal Form", url: "https://forms.gle/tech-speaker-gdg" }
    ]
  },
  {
    role: "Finance Secretary",
    name: "Sarah Jenkins",
    handle: "@sarah_finance",
    contact: "sarah.jenkins@gdgchapter.org",
    responsibilities: [
      "reimbursements",
      "receipt collection",
      "bank account updates",
      "snack budgets",
      "ledger spreadsheets"
    ],
    forms: [
      { name: "Reimbursement Claim Sheet", "url": "https://forms.gle/reimburser-gdg" }
    ]
  }
];

const FALLBACK_PROJECTS: HistoricalProject[] = [
  {
    id: "project-shebuilds-2026",
    name: "She Builds: Women in Tech Careers 2026",
    theme: "Sustaining Diverse Representation in Software Development",
    year: 2026,
    budget: 850,
    attendees: 220,
    location: "Manila",
    date: "May 30",
    assets: {
      slides: "https://docs.google.com/presentation/d/shebuilds-manila-2026",
      photos: "https://photos.app.goo.gl/shebuilds-manila-2026",
      github: "https://github.com/gdg-apc/shebuilds-25"
    },
    key_takeaways: [
      "Inspirational keynote panel delivered by top regional women engineering directors.",
      "Hands-on UI workshop was highly successful; 90% completion rate for projects done on-the-fly.",
      "Merchandise booklets and premium sticker packs ran out quickly. Estimate 20% extra padding next time."
    ]
  },
  {
    id: "project-cloudmanila-2026",
    name: "GDG Cloud Manila Build with AI: The Future of AI & Research",
    theme: "Democratizing Gen AI for Students",
    year: 2026,
    budget: 450,
    attendees: 120,
    location: "Manila",
    date: "Jun 6",
    assets: {
      slides: "https://docs.google.com/presentation/d/buildwithai-manila",
      github: "https://github.com/gdg-apc/buildwithai-ml-models",
      photos: "https://photos.app.goo.gl/buildwithai-manila"
    },
    key_takeaways: [
      "Secured localized cloud servers and credit vouchers which saved 15% on API costs.",
      "Several student groups lacked node packages prep. Need prerequisite guides sent 48 hours early.",
      "Dani Solis' live demo on model fine-tuning was rated as the single most engaging session."
    ]
  },
  {
    id: "project-hauorgfest-2026",
    name: "GDG HAU Organizational Festival (Freshmen Orientation '26-'27)",
    theme: "Opening Dev Chapters for Student Newcomers",
    year: 2026,
    budget: 250,
    attendees: 400,
    location: "Angeles",
    date: "Jun 2",
    assets: {
      photos: "https://photos.app.goo.gl/hauorgfest-2026",
      slides: "https://docs.google.com/presentation/d/hauorgfest"
    },
    key_takeaways: [
      "Record-breaking freshmen enlistment; over 400 students registered for study groups.",
      "Interactive programming logic arcade booth was heavily crowded. Setup 2 terminals instead of 1.",
      "QR code check-ins worked flawlessly, reducing crowd queuing delay by 40 minutes."
    ]
  },
  {
    id: "project-cebu-2026",
    name: "Build with AI Cebu 2026",
    theme: "Hands-On Model Building & Local Deployment Integrations",
    year: 2026,
    budget: 600,
    attendees: 180,
    location: "Cebu",
    date: "May 30",
    assets: {
      slides: "https://docs.google.com/presentation/d/buildwithai-cebu-25",
      github: "https://github.com/gdg-apc/buildwithai-cebu-edge-deploy",
      photos: "https://photos.app.goo.gl/buildwithai-cebu-25"
    },
    key_takeaways: [
      "Overwhelming local developer attendance in Cebu chapters with great mentor network engagements.",
      "Food budget was well spent on catering traditional Cebu local favorites.",
      "Many questions were focused on on-device ML rtimes (TensorFlow Lite / Gemini Nano)."
    ]
  }
];

const FALLBACK_VIBES: VibeCheck[] = [
  {
    id: "vibe-1716301200000",
    text: "The creative templates were shared a bit too late for our last workshop presentation deck. Next time let's have a unified theme ready 1 week in advance.",
    timestamp: "2026-05-18T14:20:00.000Z"
  },
  {
    id: "vibe-1716387600000",
    text: "Excited for the upcoming Build with AI hackathon! I hope we can offer vegetarian pizza options for Marcus' catering roster.",
    timestamp: "2026-05-19T09:10:00.000Z"
  }
];

// Helper to provide polished, highly-realistic, professional portraits for organizational directory
function getOfficerPhoto(name: string, index: number): string {
  const normalized = name.toLowerCase();
  if (normalized.includes("alex")) {
    return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256";
  }
  if (normalized.includes("chloe")) {
    return "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256&h=256";
  }
  if (normalized.includes("marcus")) {
    return "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256";
  }
  if (normalized.includes("dani")) {
    return "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256";
  }
  if (normalized.includes("sarah")) {
    return "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=256&h=256";
  }
  // Professional portraits fallback list to keep added listings perfectly polished!
  const portraits = [
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256&h=256",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=256&h=256",
    "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=256&h=256",
    "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=256&h=256",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256"
  ];
  return portraits[index % portraits.length];
}

export default function App() {
  // Authentication & session state
  const [sessionUser, setSessionUser] = useState<{ email: string; name: string } | null>(null);
  const [guestMode, setGuestMode] = useState(false);
  const [showSignInPage, setShowSignInPage] = useState(false);

  // Global states loaded from full-stack backend APIs
  const [roles, setRoles] = useState<RoleDirectoryItem[]>([]);
  const [projects, setProjects] = useState<HistoricalProject[]>([]);
  const [vibes, setVibes] = useState<VibeCheck[]>([]);

  // UI Selection triggers
  const [activeTab, setActiveTab] = useState<"chat" | "directory" | "historical" | "handoff" | "vibe">("directory");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    init: true,
    chat: false,
    handoff: false,
    vibe: false,
    saveRole: false,
    saveProject: false
  });

  // Feature 1 + 2: Lore Chat states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      sender: "bot",
      text: "🔮 **Hello! I am The Lore Master.** I'm your student organization's automated historian and concierge concierge bot.\n\nAsk me questions like:\n- *\"Who do I ask for Room bookings?\"*\n- *\"Tell me about Solution Challenge event in 2024\"*\n- *\"What was the budget for DevFest?\"*",
      timestamp: new Date(),
      source: "System Core"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Feature 3: Summary Handoff states
  const [minutesInput, setMinutesInput] = useState(SAMPLE_MEETING_MINUTES);
  const [handoffResults, setHandoffResults] = useState<string>("");
  const [handoffSource, setHandoffSource] = useState<string>("");

  // Feature 4: Vibe Check states
  const [vibeInput, setVibeInput] = useState("");
  const [vibeCooldown, setVibeCooldown] = useState(0);

  useEffect(() => {
    if (vibeCooldown > 0) {
      const timer = setTimeout(() => setVibeCooldown(vibeCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [vibeCooldown]);

  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Administrative Editors (Dynamic on-the-fly additions to JSON file)
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [newRoleForm, setNewRoleForm] = useState({
    role: "",
    name: "",
    handle: "",
    contact: "",
    responsibilities: "",
    formName: "",
    formUrl: ""
  });

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({
    name: "",
    year: "2026",
    theme: "",
    budget: "100",
    attendees: "50",
    slides: "",
    github: "",
    photos: "",
    takeaway1: "",
    takeaway2: "",
    takeaway3: "",
    location: "Manila",
    date: "May 30"
  });

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [projectSearchQuery, setProjectSearchQuery] = useState("");
  const [selectedProjectTag, setSelectedProjectTag] = useState("All");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  // Fetch initial databases with automated serverless fallback for platforms like Vercel
  const fetchAllData = async () => {
    try {
      const [rRes, pRes, vRes] = await Promise.all([
        fetch("/api/org/roles").catch(() => null),
        fetch("/api/projects/all").catch(() => null),
        fetch("/api/vibechecks/all").catch(() => null)
      ]);

      let rolesData = null;
      let projectsData = null;
      let vibesData = null;

      if (rRes && rRes.ok) {
        rolesData = await rRes.json().catch(() => null);
      }
      if (pRes && pRes.ok) {
        projectsData = await pRes.json().catch(() => null);
      }
      if (vRes && vRes.ok) {
        vibesData = await vRes.json().catch(() => null);
      }

      // 1. Roles/Officers Directory fallback configuration
      if (rolesData && Array.isArray(rolesData) && rolesData.length > 0) {
        setRoles(rolesData);
        localStorage.setItem("local_roles", JSON.stringify(rolesData));
      } else {
        const storedRoles = localStorage.getItem("local_roles");
        if (storedRoles) {
          try {
            const parsed = JSON.parse(storedRoles);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setRoles(parsed);
            } else {
              setRoles(FALLBACK_ROLES);
              localStorage.setItem("local_roles", JSON.stringify(FALLBACK_ROLES));
            }
          } catch {
            setRoles(FALLBACK_ROLES);
            localStorage.setItem("local_roles", JSON.stringify(FALLBACK_ROLES));
          }
        } else {
          setRoles(FALLBACK_ROLES);
          localStorage.setItem("local_roles", JSON.stringify(FALLBACK_ROLES));
        }
      }

      // 2. Historical Projects fallback configuration
      if (projectsData && Array.isArray(projectsData) && projectsData.length > 0) {
        setProjects(projectsData);
        localStorage.setItem("local_projects", JSON.stringify(projectsData));
      } else {
        const storedProjects = localStorage.getItem("local_projects");
        if (storedProjects) {
          try {
            const parsed = JSON.parse(storedProjects);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setProjects(parsed);
            } else {
              setProjects(FALLBACK_PROJECTS);
              localStorage.setItem("local_projects", JSON.stringify(FALLBACK_PROJECTS));
            }
          } catch {
            setProjects(FALLBACK_PROJECTS);
            localStorage.setItem("local_projects", JSON.stringify(FALLBACK_PROJECTS));
          }
        } else {
          setProjects(FALLBACK_PROJECTS);
          localStorage.setItem("local_projects", JSON.stringify(FALLBACK_PROJECTS));
        }
      }

      // 3. Vibe Check anonymous updates fallback configuration
      if (vibesData && Array.isArray(vibesData) && vibesData.length > 0) {
        setVibes(vibesData);
        localStorage.setItem("local_vibes", JSON.stringify(vibesData));
      } else {
        const storedVibes = localStorage.getItem("local_vibes");
        if (storedVibes) {
          try {
            const parsed = JSON.parse(storedVibes);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setVibes(parsed);
            } else {
              setVibes(FALLBACK_VIBES);
              localStorage.setItem("local_vibes", JSON.stringify(FALLBACK_VIBES));
            }
          } catch {
            setVibes(FALLBACK_VIBES);
            localStorage.setItem("local_vibes", JSON.stringify(FALLBACK_VIBES));
          }
        } else {
          setVibes(FALLBACK_VIBES);
          localStorage.setItem("local_vibes", JSON.stringify(FALLBACK_VIBES));
        }
      }
    } catch (err) {
      console.warn("Express server endpoints unavailable. Redirecting to Local Client engine fallback mode. (Vercel/Static Compatibility active)", err);
      const storedRoles = localStorage.getItem("local_roles");
      setRoles(storedRoles ? JSON.parse(storedRoles) : FALLBACK_ROLES);

      const storedProjects = localStorage.getItem("local_projects");
      setProjects(storedProjects ? JSON.parse(storedProjects) : FALLBACK_PROJECTS);

      const storedVibes = localStorage.getItem("local_vibes");
      setVibes(storedVibes ? JSON.parse(storedVibes) : FALLBACK_VIBES);
    } finally {
      setLoading(prev => ({ ...prev, init: false }));
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Sync scroll for chatbot
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => {
      setSuccessToast(null);
    }, 4500);
  };

  // Submit Chatbot Query
  const handleChatSubmit = async (textToSend?: string) => {
    const query = (textToSend || chatInput).trim();
    if (!query) return;

    if (!textToSend) {
      setChatInput("");
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMsg]);
    setLoading(prev => ({ ...prev, chat: true }));

    try {
      const response = await fetch("/api/bot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query })
      });
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }
      const data = await response.json();

      setChatMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: data.response || "I had trouble scanning our logs. Let me know if you want to try an alternative query.",
          timestamp: new Date(),
          source: data.source || "Database Fallback"
        }
      ]);
    } catch (err) {
      // CLIENT-SIDE LOCAL CHAT MATCHING ENGINE (For static hostings like Vercel)
      const queryLower = query.toLowerCase();
      let responseText = "";

      // A. Match projects
      const matchedProjects = projects.filter((p) => {
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

      // B. Match roles
      const matchedRoles = roles.filter((r) => {
        const roleMatches = queryLower.includes(r.role.toLowerCase()) || queryLower.includes(r.name.toLowerCase());
        const respMatches = r.responsibilities.some((resp: string) => queryLower.includes(resp.toLowerCase()));
        
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

      if (matchedProjects.length > 0) {
        const proj = matchedProjects[0];
        responseText += `### 📂 Historical Archive Found: **${proj.name}**\n\n`;
        responseText += `* **Year**: ${proj.year}\n`;
        responseText += `* **Theme**: *"${proj.theme}"*\n`;
        responseText += `* **Budget Spent**: $${proj.budget}\n`;
        responseText += `* **Attendees Count**: ${proj.attendees} students\n\n`;
        
        responseText += `#### 🔗 Asset Links:\n`;
        Object.entries(proj.assets || {}).forEach(([key, val]) => {
          responseText += `- **${key.toUpperCase()}**: [${val}](${val})\n`;
        });
        
        responseText += `\n#### 💡 Lore & Key Takeaways / Lessons Learned:\n`;
        proj.key_takeaways.forEach((takeaway: string) => {
          responseText += `- ${takeaway}\n`;
        });
        responseText += `\n\n*(Note: Powered by localized, client-side rule-bsearch fallback in Static Mode)*`;
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
          responseText += `\n#### 📬 Directly Related Forms & Forms Tools:\n`;
          contact.forms.forEach((form: any) => {
            responseText += `- **[${form.name}](${form.url})**\n`;
          });
        }
        responseText += `\n\n*(Note: Powered by localized, client-side rule-based lookup in Static Mode)*`;
      } else {
        responseText = `### 🔮 The Lore Master's Vault (Static Preview Mode)
I scanned our local directory index but didn't find specific matches for: *"${query}"*.

Here is a quick directory reference:
- 🏢 **Operations & Venue Bookings**: Alex Rivera (Community Lead - \`@alex_rivera\`)
- 🎨 **Posters & Creative Request**: Chloe Chen (Creatives - \`@chloe_creatives\`)
- 🍕 **Catering & Logistic Coordinates**: Marcus Vance (Logistics - \`@marcus_logistics\`)
- 💻 **Tech Workshops & Labs Speeches**: Dani Solis (Technical - \`@dani_labs\`)
- 💵 **Reimbursements & Finance Sheets**: Sarah Jenkins (Finance Secretary - \`@sarah_finance\`)

Try asking me about **DevFest**, **Solution Challenge**, or **Build with AI**!`;
        responseText += `\n\n*(Note: Showing fallback directory as no matched archives were found)*`;
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: `bot-fallback-${Date.now()}`,
          sender: "bot",
          text: responseText,
          timestamp: new Date(),
          source: "Local Client Engine"
        }
      ]);
    } finally {
      setLoading(prev => ({ ...prev, chat: false }));
    }
  };

  // Run Handoff Summary
  const handleHandoffSubmit = async () => {
    if (!minutesInput.trim()) return;
    setLoading(prev => ({ ...prev, handoff: true }));

    try {
      const response = await fetch("/api/bot/handoff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ minutes: minutesInput })
      });
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }
      const data = await response.json();
      setHandoffResults(data.summary || "No clear items extracted.");
      setHandoffSource(data.source || "Regex Processor");
      triggerToast("Structured Handoff Summary compiled successfully!");
    } catch (err) {
      // Local Actionable Line Extractor Fallback
      const lines = minutesInput.split(/\n+/).map(l => l.trim()).filter(l => l.length > 5);
      const extractedBullets: string[] = [];
      const keywords = ["need", "must", "action", "responsibility", "deadline", "todo", "by", "for", "handling", "pending", "schedule"];

      for (const line of lines) {
        const lowerLine = line.toLowerCase();
        const hasKeyword = keywords.some(k => lowerLine.includes(k));
        if (hasKeyword && extractedBullets.length < 3) {
          const cleanLine = line.replace(/^[*\-\d.\s]+/g, "");
          extractedBullets.push(cleanLine);
        }
      }

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
      setHandoffResults(fallbackText);
      setHandoffSource("Local Client Extractor");
      triggerToast("Structured Handoff Summary compiled locally!");
    } finally {
      setLoading(prev => ({ ...prev, handoff: false }));
    }
  };

  // Submit Vibe Check (Sanitized)
  const handleVibeSubmit = async () => {
    if (!vibeInput.trim()) return;

    // Direct spam detection
    if (vibeCooldown > 0) {
      triggerToast(`⚠️ Cooldown active. Wait ${vibeCooldown}s to prevent spamming.`);
      return;
    }

    // Duplicate message detection
    const isLocalDuplicate = vibes.slice(0, 5).some(v => v.text.toLowerCase().trim() === vibeInput.toLowerCase().trim());
    if (isLocalDuplicate) {
      triggerToast("⚠️ Prevented duplicate spam feedback. Please write constructive, unique feedback!");
      return;
    }

    setLoading(prev => ({ ...prev, vibe: true }));

    try {
      const response = await fetch("/api/vibechecks/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: vibeInput })
      });
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }
      const data = await response.json();
      
      if (response.ok) {
        setVibeInput("");
        setVibeCooldown(10); // 10 second spam rate-limiting lock
        // Reload vibes list to mirror in the review panel immediately
        const vibesRes = await fetch("/api/vibechecks/all");
        if (vibesRes.ok) {
          const freshVibes = await vibesRes.json();
          setVibes(freshVibes);
          localStorage.setItem("local_vibes", JSON.stringify(freshVibes));
        } else {
          setVibes(prev => {
            const updated = [data.vibe, ...prev].filter(Boolean);
            localStorage.setItem("local_vibes", JSON.stringify(updated));
            return updated;
          });
        }
        
        if (data.vibe?.censored) {
          triggerToast("✨ Feedback registered & censored for inappropriate language.");
        } else {
          triggerToast("✨ Anonymous vibe check recorded successfully and metadata stripped!");
        }
      } else {
        triggerToast(`⚠️ ${data.error || "Failed to submit."}`);
      }
    } catch (err) {
      // Local check & submit fallback
      const PROFANITIES = [
        "fuck", "fucking", "fucker", "shit", "shitting", "bitch", "bitches", "asshole", 
        "ass", "crap", "damn", "bastard", "cunt", "dick", "pussy", "motherfucker", 
        "whore", "piss", "slut"
      ];
      let sanitizedText = vibeInput;
      sanitizedText = sanitizedText.replace(/<@U[a-zA-Z0-9]+>/g, "[USER_REDACTED]");
      sanitizedText = sanitizedText.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi, "[EMAIL_REDACTED]");
      sanitizedText = sanitizedText.replace(/#\d{4}/g, "");
      
      let hasProfanity = false;
      PROFANITIES.forEach(word => {
        const regex = new RegExp("\\b" + word + "s?\\b", "gi");
        if (regex.test(sanitizedText)) {
          hasProfanity = true;
          sanitizedText = sanitizedText.replace(regex, (match) => match[0] + "*".repeat(match.length - 1));
        }
      });
      sanitizedText = sanitizedText.trim();

      const newVibe = {
        id: `vibe-${Date.now()}`,
        text: sanitizedText,
        timestamp: new Date().toISOString(),
        censored: hasProfanity
      };

      setVibes(prev => {
        const updated = [newVibe, ...prev];
        localStorage.setItem("local_vibes", JSON.stringify(updated));
        return updated;
      });
      setVibeInput("");
      setVibeCooldown(10);

      if (hasProfanity) {
        triggerToast("✨ Submitted! Feedback sanitized and censored locally (Static Preview mode).");
      } else {
        triggerToast("✨ Saved anonymous vibe check locally (Static Preview mode)!");
      }
    } finally {
      setLoading(prev => ({ ...prev, vibe: false }));
    }
  };

  // Add Role Directory Card
  const handleAddRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleForm.role || !newRoleForm.name) return;
    setLoading(prev => ({ ...prev, saveRole: true }));

    const reps = newRoleForm.responsibilities
      .split(",")
      .map(s => s.trim().toLowerCase())
      .filter(s => s.length > 0);

    const forms = newRoleForm.formName.trim()
      ? [{ name: newRoleForm.formName, url: newRoleForm.formUrl || "#" }]
      : [];

    const newDirectoryItem: RoleDirectoryItem = {
      role: newRoleForm.role,
      name: newRoleForm.name,
      handle: newRoleForm.handle || "@member",
      contact: newRoleForm.contact || "member@gdgchapter.org",
      responsibilities: reps,
      forms
    };

    const updatedRoles = [...roles, newDirectoryItem];

    try {
      const response = await fetch("/api/org/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRoles)
      });
      if (response.ok) {
        setRoles(updatedRoles);
        localStorage.setItem("local_roles", JSON.stringify(updatedRoles));
        setShowRoleModal(false);
        setNewRoleForm({
          role: "",
          name: "",
          handle: "",
          contact: "",
          responsibilities: "",
          formName: "",
          formUrl: ""
        });
        triggerToast("New community officer successfully appended to the lore database!");
      } else {
        throw new Error("HTTP connection issue");
      }
    } catch (err) {
      // Offline Local Storage Fallback Mode
      setRoles(updatedRoles);
      localStorage.setItem("local_roles", JSON.stringify(updatedRoles));
      setShowRoleModal(false);
      setNewRoleForm({
        role: "",
        name: "",
        handle: "",
        contact: "",
        responsibilities: "",
        formName: "",
        formUrl: ""
      });
      triggerToast("✨ Saved officer card locally (Static Preview mode)!");
    } finally {
      setLoading(prev => ({ ...prev, saveRole: false }));
    }
  };

  // Add Historical Event
  const handleAddProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectForm.name) return;
    setLoading(prev => ({ ...prev, saveProject: true }));

    const takeaways = [newProjectForm.takeaway1, newProjectForm.takeaway2, newProjectForm.takeaway3]
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const assets: { [key: string]: string } = {};
    if (newProjectForm.slides) assets.slides = newProjectForm.slides;
    if (newProjectForm.github) assets.github = newProjectForm.github;
    if (newProjectForm.photos) assets.photos = newProjectForm.photos;

    const newProject = {
      name: newProjectForm.name,
      year: parseInt(newProjectForm.year) || 2026,
      theme: newProjectForm.theme || "Sustaining Tech Integration",
      budget: parseFloat(newProjectForm.budget) || 100,
      attendees: parseInt(newProjectForm.attendees) || 50,
      assets,
      key_takeaways: takeaways.length > 0 ? takeaways : ["Event concluded successfully with high community engagement rate."],
      location: newProjectForm.location || "Manila",
      date: newProjectForm.date || "May 30"
    };

    try {
      const response = await fetch("/api/projects/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject)
      });
      if (response.ok) {
        const data = await response.json();
        const savedProject = data.project;
        setProjects(prev => {
          const updated = [...prev, savedProject];
          localStorage.setItem("local_projects", JSON.stringify(updated));
          return updated;
        });
        setShowProjectModal(false);
        setNewProjectForm({
          name: "",
          year: "2026",
          theme: "",
          budget: "100",
          attendees: "50",
          slides: "",
          github: "",
          photos: "",
          takeaway1: "",
          takeaway2: "",
          takeaway3: "",
          location: "Manila",
          date: "May 30"
        });
        triggerToast("Historical event archived successfully in the organization vault!");
      } else {
        throw new Error("HTTP write error");
      }
    } catch (err) {
      // Offline Local Storage Fallback Mode
      const savedProject = {
        id: `project-local-${Date.now()}`,
        ...newProject
      };
      setProjects(prev => {
        const updated = [...prev, savedProject];
        localStorage.setItem("local_projects", JSON.stringify(updated));
        return updated;
      });
      setShowProjectModal(false);
      setNewProjectForm({
        name: "",
        year: "2026",
        theme: "",
        budget: "100",
        attendees: "50",
        slides: "",
        github: "",
        photos: "",
        takeaway1: "",
        takeaway2: "",
        takeaway3: "",
        location: "Manila",
        date: "May 30"
      });
      triggerToast("✨ Saved historical event locally (Static Preview mode)!");
    } finally {
      setLoading(prev => ({ ...prev, saveProject: false }));
    }
  };

  // Delete Role item (Client state + save)
  const handleDeleteRole = async (indexToDelete: number) => {
    if (!confirm("Are you sure you want to remove this officer card from active directory?")) return;
    const updated = roles.filter((_, idx) => idx !== indexToDelete);
    try {
      const response = await fetch("/api/org/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      if (response.ok) {
        setRoles(updated);
        localStorage.setItem("local_roles", JSON.stringify(updated));
        triggerToast("Officer card removed successfully!");
      } else {
        throw new Error("HTTP connection issue");
      }
    } catch (err) {
      // Offline Local Storage Fallback Mode
      setRoles(updated);
      localStorage.setItem("local_roles", JSON.stringify(updated));
      triggerToast("✨ Officer card removed locally (Static Preview mode)!");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#202124] font-sans antialiased flex flex-col selection:bg-[#4285F4]/20">
      
      {/* SUCCESS TOAST NOTIFIER */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -45, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-[#202124] text-white py-3.5 px-6 rounded-2xl shadow-2xl flex items-center space-x-3 border border-slate-700 max-w-md font-medium text-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] animate-ping" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {sessionUser === null && !guestMode ? (
        showSignInPage ? (
          // ==========================================
          // STAND-ALONE SIGN IN PAGE (Premium Day Mode Style)
          // ==========================================
          <div className="flex-1 flex flex-col bg-slate-50 justify-center items-center py-16 px-4 min-h-[650px] relative overflow-hidden">
            <ConstellationBackground />
            
            <div className="relative z-10 w-full max-w-md pointer-events-auto">
              <SignInForm 
                onLoginSuccess={(email) => {
                  setSessionUser({ email, name: email.split("@")[0].toUpperCase() });
                  setShowSignInPage(false);
                  triggerToast(`Welcome, Admin ${email.split("@")[0].toUpperCase()}! Access activated.`);
                }}
                onGoBackHome={() => {
                  setShowSignInPage(false);
                }}
              />
            </div>
          </div>
        ) : (
          // ==========================================
          // DYNAMIC LANDING PORTAL (Premium Day-Mode Autodesk Aesthetic)
          // ==========================================
          <div className="flex-1 flex flex-col bg-white text-gray-800">
            {/* HEADER */}
            <header className="bg-white/95 sticky top-0 z-40 px-4 md:px-8 py-3.5 border-b border-gray-150 backdrop-blur-md">
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <button
                  onClick={() => {
                    setGuestMode(true);
                    triggerToast("Entering GDG Lore Master Archives.");
                  }}
                  className="flex items-center space-x-3.5 cursor-pointer hover:opacity-80 transition-all font-sans bg-transparent border-none text-left p-0 focus:outline-none"
                >
                  <div className="flex gap-1.5 select-none">
                    <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-[#EA4335] animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-[#FBBC05] animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                  </div>
                  <div>
                    <h1 className="text-sm md:text-base font-black tracking-widest text-gray-900 uppercase flex items-center gap-1.5">
                      GDG Lore Master
                      <span className="text-[9px] text-[#FBBC05] border border-[#FBBC05]/40 bg-[#FBBC05]/5 px-2 py-0.5 rounded-full font-bold ml-1.5 hidden sm:inline tracking-normal normal-case">
                        Simulated Console
                      </span>
                    </h1>
                  </div>
                </button>

                <div className="flex items-center gap-3">
                  <div className="relative hidden md:block select-none">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search archive..."
                      className="w-48 bg-slate-50 border border-gray-200 rounded-full py-1.5 px-8 text-xs text-gray-800 focus:outline-none focus:border-gray-300 cursor-not-allowed text-[11px]"
                      disabled
                    />
                  </div>
                  <button
                    onClick={() => {
                      setShowSignInPage(true);
                      triggerToast("Opening secure credential page.");
                    }}
                    className="text-[11.5px] font-bold tracking-wider uppercase text-white bg-gray-900 hover:bg-black py-1.5 px-4 rounded-lg transition-all cursor-pointer active:scale-95"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </header>

            {/* HERO SECTION IN EXQUISITE WHITE DAY MODE */}
            <section className="relative min-h-[calc(100vh-280px)] lg:min-h-[520px] bg-slate-50 flex flex-col justify-center py-16 px-4 md:px-8 border-b border-gray-200 overflow-hidden text-center">
              <ConstellationBackground />

              <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center justify-center space-y-6">
                <span className="text-[10px] font-black tracking-[4px] text-gray-400 bg-slate-105 border border-gray-200 py-1 px-3.5 rounded-full uppercase">
                  MANAGE & INQUIRE WITH GOOGLE LORE MASTER
                </span>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-gray-900 leading-tight tracking-tight">
                  Lore Master for <br />
                  <span className="text-[#4285F4] underline decoration-4 decoration-[#EA4335] underline-offset-8">local chapter admins</span>
                </h2>

                <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-xl font-normal font-sans">
                  Standardize your student organization's lookups, officer roles, past event financials, and key takeaways in a single secure source of truth. Allow automated summaries to compile instant committee handovers today.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <button
                    onClick={() => {
                      setIsChatOpen(true);
                      triggerToast("Chat bot loaded! Inquire anything in the concierge panel.");
                    }}
                    className="bg-[#4285F4] hover:bg-blue-600 active:scale-97 text-white font-bold py-3.5 px-6 rounded-full text-xs shadow-lg shadow-blue-500/10 transition-all flex items-center gap-2 cursor-pointer border border-blue-400/20 justify-center"
                  >
                    <Bot className="w-4 h-4 text-white animate-pulse" />
                    <span>Open Concierge Chatbot</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowSignInPage(true);
                      triggerToast("Opening private administrative portal.");
                    }}
                    className="bg-white hover:bg-gray-50 active:scale-97 border border-gray-200 text-gray-800 font-bold py-3.5 px-6 rounded-full text-xs transition-all cursor-pointer shadow-sm justify-center"
                  >
                    Enter Admin Console
                  </button>
                </div>
              </div>
            </section>

            {/* LOWER CATEGORY SECTORS */}
            <section className="bg-white py-14 px-4 md:px-8 text-left border-b border-gray-150">
              <div className="max-w-7xl mx-auto">
                <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2 font-sans text-center">
                  Explore GDG Lore Categories:
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  
                  {/* Sector 1 */}
                  <button
                    onClick={() => {
                      setGuestMode(true);
                      setActiveTab("directory");
                      triggerToast("Opening Organational Directory.");
                    }}
                    className="group relative h-44 rounded-xl overflow-hidden border border-gray-200 bg-slate-50/50 flex flex-col justify-end p-5 text-left transition-all hover:bg-white hover:border-[#34A853] hover:shadow-lg cursor-pointer"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#34A853] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    <div className="relative z-20">
                      <span className="text-[9px] uppercase font-bold text-[#34A853] tracking-widest block mb-1 font-mono">
                        Officer Directory
                      </span>
                      <h4 className="text-base font-black text-gray-800 group-hover:text-[#34A853] transition-colors leading-tight">
                        Architecture of Chapters
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-1.5 line-clamp-2">
                        Resolve logistics, room bookings, and coordination maps instantly.
                      </p>
                    </div>
                  </button>

                  {/* Sector 2 */}
                  <button
                    onClick={() => {
                      setGuestMode(true);
                      setActiveTab("historical");
                      triggerToast("Opening Historical Events Hub.");
                    }}
                    className="group relative h-44 rounded-xl overflow-hidden border border-gray-200 bg-slate-50/50 flex flex-col justify-end p-5 text-left transition-all hover:bg-white hover:border-[#EA4335] hover:shadow-lg cursor-pointer"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#EA4335] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    <div className="relative z-20">
                      <span className="text-[9px] uppercase font-bold text-[#EA4335] tracking-widest block mb-1 font-mono">
                        Metrics & Budgets
                      </span>
                      <h4 className="text-base font-black text-gray-800 group-hover:text-[#EA4335] transition-colors leading-tight">
                        Historical Events Lore
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-1.5 line-clamp-2">
                        Access budgets, attendee reach, and key takeaways for previous DevFests.
                      </p>
                    </div>
                  </button>

                  {/* Sector 3 */}
                  <button
                    onClick={() => {
                      setGuestMode(true);
                      setActiveTab("handoff");
                      triggerToast("Opening Committee Handoff Suite.");
                    }}
                    className="group relative h-44 rounded-xl overflow-hidden border border-gray-200 bg-slate-50/50 flex flex-col justify-end p-5 text-left transition-all hover:bg-white hover:border-[#FBBC05] hover:shadow-lg cursor-pointer"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#FBBC05] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    <div className="relative z-20">
                      <span className="text-[9px] uppercase font-bold text-[#FBBC05] tracking-widest block mb-1 font-mono">
                        Meeting Summaries
                      </span>
                      <h4 className="text-base font-black text-gray-800 group-hover:text-[#FBBC05] transition-colors leading-tight">
                        Handoff Logs Automizer
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-1.5 line-clamp-2 font-sans">
                        Process long meeting notes into beautiful, high-impact lists of action items.
                      </p>
                    </div>
                  </button>

                  {/* Sector 4 */}
                  <button
                    onClick={() => {
                      setGuestMode(true);
                      setActiveTab("vibe");
                      triggerToast("Opening Organizational Suggestions Box.");
                    }}
                    className="group relative h-44 rounded-xl overflow-hidden border border-gray-200 bg-slate-50/50 flex flex-col justify-end p-5 text-left transition-all hover:bg-white hover:border-purple-500 hover:shadow-lg cursor-pointer"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-purple-505 bg-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    <div className="relative z-20">
                      <span className="text-[9px] uppercase font-bold text-purple-550 text-purple-500 tracking-widest block mb-1 font-mono">
                        Secure Channels
                      </span>
                      <h4 className="text-base font-black text-gray-800 group-hover:text-purple-605 group-hover:text-purple-600 transition-colors leading-tight">
                        Vibe Check Box
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-1.5 line-clamp-2">
                        File suggestions and review organizational mood trends anonymously.
                      </p>
                    </div>
                  </button>

                </div>
              </div>
            </section>

            {/* LOWER TERMINAL FOOTER */}
            <footer className="bg-slate-50 py-8 text-center border-t border-gray-200 text-gray-400 text-[10px] font-sans">
              <p className="tracking-wide">© {new Date().getFullYear()} GDG AP Community Chapter. Built with White Autodesk Aesthetic.</p>
            </footer>
          </div>
        )
      ) : (
        // ==========================================
        // MAIN PORTAL DASHBOARD (Light Theme Standard Operations)
        // ==========================================
        <>
          {/* HEADER SECTION - Geometric Balance Styling with interactive Dropdown */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-40 px-4 md:px-8 py-4 shadow-sm">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <button
                onClick={() => {
                  setGuestMode(false);
                  setShowSignInPage(false);
                  triggerToast("Returning to Landing Page.");
                }}
                className="flex items-center space-x-3.5 cursor-pointer hover:opacity-80 transition-all font-sans bg-transparent border-none text-left p-0 focus:outline-none"
              >
                {/* Geometric Balance GDG Brand Dots */}
                <div className="flex gap-1 shrink-0">
                  <span className="header-dot bg-[#4285F4]" />
                  <span className="header-dot bg-[#EA4335]" />
                  <span className="header-dot bg-[#FBBC05]" />
                  <span className="header-dot bg-[#34A853]" />
                </div>
                
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-gray-800 flex items-center gap-1.5 leading-tight">
                    The Lore Master
                    <span className="text-gray-400 font-light ml-1.5 text-sm md:text-base">| Org Concierge</span>
                  </h1>
                  <p className="text-xs text-[#5F6368] font-normal mt-0.5">
                    Autonomous Student Org Concierge & Automated Archival Bot
                  </p>
                </div>
              </button>

              {/* Right Header Controls with clickable Admin Profile dropdown */}
              <div className="flex items-center gap-3.5 relative">
                <div className="flex items-center space-x-3 bg-slate-50 py-1.5 px-3 rounded-full border border-gray-200 text-xs font-medium">
                  <span className="text-[#FBBC05] font-bold font-mono">{`{`}</span>
                  <span className="text-[#4285F4] flex items-center gap-1 px-0.5 font-semibold">
                    APC Chapter <Sparkles className="w-3.5 h-3.5 text-[#4285F4] animate-pulse inline" />
                  </span>
                  <span className="text-[#FBBC05] font-bold font-mono">{`}`}</span>
                </div>
                
                <div className="h-4 w-px bg-gray-200" />
                
                {/* Profile Bubble Trigger */}
                <div className="relative">
                  {sessionUser ? (
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="w-8 h-8 rounded-full bg-[#4285F4]/10 hover:bg-[#4285F4]/15 border border-[#4285F4]/30 text-[#4285F4] font-bold text-xs flex items-center justify-center cursor-pointer transition-all focus:outline-none shadow-sm hover:scale-105 active:scale-95"
                      title="Account Menu"
                    >
                      {sessionUser.name.slice(0, 2).toUpperCase()}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSessionUser(null);
                          setShowSignInPage(true);
                          triggerToast("Opening administrative credentials view.");
                        }}
                        className="text-xs font-bold text-white bg-[#202124] hover:bg-black py-1.5 px-3 rounded-lg transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        Sign In
                      </button>
                    </div>
                  )}

                  <AnimatePresence>
                    {profileDropdownOpen && sessionUser && (
                      <>
                        {/* Clicking backdrop closes dropdown */}
                        <div 
                          className="fixed inset-0 z-45" 
                          onClick={() => setProfileDropdownOpen(false)} 
                        />
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2.5 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 font-sans text-left"
                        >
                          <div className="pb-3 border-b border-gray-100">
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-0.5">Active Admin Profile</span>
                            <h4 className="text-sm font-bold text-gray-800">
                              {sessionUser.name}
                            </h4>
                            <p className="text-xs text-gray-500 font-mono font-medium truncate mb-1">
                              {sessionUser.email}
                            </p>
                            <span className="inline-block mt-1 text-[9px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-100">
                              GDG Chapter Director
                            </span>
                          </div>

                          <div className="py-2.5 space-y-1">
                            <button
                              onClick={() => {
                                setProfileDropdownOpen(false);
                                setShowSettingsModal(true);
                              }}
                              className="w-full text-left font-medium text-xs text-gray-700 hover:bg-slate-50 hover:text-gray-900 py-2 px-2.5 rounded-lg flex items-center gap-2.5 transition-colors cursor-pointer"
                            >
                              <Settings className="w-3.5 h-3.5 text-gray-400" />
                              <span>Lore System Settings</span>
                            </button>
                            
                            <button
                              onClick={() => {
                                setProfileDropdownOpen(false);
                                triggerToast("Displaying student organization concierge credentials summary.");
                              }}
                              className="w-full text-left font-medium text-xs text-gray-700 hover:bg-slate-50 hover:text-gray-900 py-2 px-2.5 rounded-lg flex items-center gap-2.5 transition-colors cursor-pointer"
                            >
                              <User className="w-3.5 h-3.5 text-gray-400" />
                              <span>Onboarding Profile Summary</span>
                            </button>

                            <button
                              onClick={() => {
                                setProfileDropdownOpen(false);
                                setLoading(prev => ({ ...prev, init: true }));
                                fetchAllData();
                                triggerToast("Server-wide databases re-synced successfully!");
                              }}
                              className="w-full text-left font-medium text-xs text-gray-700 hover:bg-slate-50 hover:text-gray-900 py-2 px-2.5 rounded-lg flex items-center gap-2.5 transition-colors cursor-pointer"
                            >
                              <RefreshCw className="w-3.5 h-3.5 text-gray-400" />
                              <span>Re-Sync Cloud Database</span>
                            </button>
                          </div>

                          <div className="pt-2 border-t border-gray-100">
                            <button
                              onClick={() => {
                                setProfileDropdownOpen(false);
                                setSessionUser(null);
                                setGuestMode(false);
                                setShowSignInPage(false);
                                triggerToast("Simulating secure admin session log out...");
                              }}
                              className="w-full text-left font-bold text-xs text-[#EA4335] hover:bg-red-50 py-2 px-2.5 rounded-lg flex items-center gap-2.5 transition-all cursor-pointer"
                            >
                              <LogOut className="w-3.5 h-3.5 text-red-400" />
                              <span>Simulate Sign Out</span>
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </header>

          {/* TOP NAVIGATION BAR - Horizontal Tabs design below header */}
          <div className="bg-white border-b border-gray-200 sticky top-[72px] z-30 px-4 md:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <nav className="flex flex-wrap items-center gap-1.5 md:gap-2.5 w-full md:w-auto">
            <button
              onClick={() => setActiveTab("directory")}
              className={`py-2 px-4 rounded-full text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all hover:scale-102 duration-150 ${
                activeTab === "directory"
                  ? "bg-[#34A853]/10 text-[#34A853] border border-[#34A853]/20 shadow-sm"
                  : "text-gray-600 hover:bg-slate-50 hover:text-gray-900 border border-transparent"
              }`}
            >
              <Users className={`w-4 h-4 ${activeTab === "directory" ? "text-[#34A853]" : "text-gray-400"}`} />
              <span>Who Do I Ask?</span>
            </button>

            <button
              onClick={() => setActiveTab("historical")}
              className={`py-2 px-4 rounded-full text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all hover:scale-102 duration-150 ${
                activeTab === "historical"
                  ? "bg-[#EA4335]/10 text-[#EA4335] border border-[#EA4335]/20 shadow-sm"
                  : "text-gray-600 hover:bg-slate-50 hover:text-gray-900 border border-transparent"
              }`}
            >
              <Database className={`w-4 h-4 ${activeTab === "historical" ? "text-[#EA4335]" : "text-gray-400"}`} />
              <span>Past Events Lore</span>
            </button>

            <button
              onClick={() => setActiveTab("handoff")}
              className={`py-2 px-4 rounded-full text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all hover:scale-102 duration-150 ${
                activeTab === "handoff"
                  ? "bg-[#FBBC05]/10 text-[#FBBC05] border border-[#FBBC05]/20 shadow-sm"
                  : "text-gray-600 hover:bg-slate-50 hover:text-gray-900 border border-transparent"
              }`}
            >
              <FileText className={`w-4 h-4 ${activeTab === "handoff" ? "text-[#FBBC05]" : "text-gray-400"}`} />
              <span>Handoff Summaries</span>
            </button>

            <button
              onClick={() => setActiveTab("vibe")}
              className={`py-2 px-4 rounded-full text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all hover:scale-102 duration-150 relative ${
                activeTab === "vibe"
                  ? "bg-purple-50 text-purple-600 border border-purple-150 shadow-sm"
                  : "text-gray-600 hover:bg-slate-50 hover:text-gray-900 border border-transparent"
              }`}
            >
              <Lock className={`w-4 h-4 ${activeTab === "vibe" ? "text-purple-500" : "text-gray-400"}`} />
              <span>Vibe Check Box</span>
              <span className="bg-purple-600 text-white text-[9.5px] font-bold px-1.5 py-0.5 rounded-full inline-flex items-center justify-center">
                {vibes.length}
              </span>
            </button>
          </nav>

          {/* Sync operations on the right part of Top Nav bar */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider hidden sm:inline">DB Server Active</span>
            <button
              onClick={() => {
                setLoading(prev => ({ ...prev, init: true }));
                fetchAllData();
              }}
              disabled={loading.init}
              className="text-xs font-bold text-[#4285F4] bg-[#4285F4]/5 hover:bg-[#4285F4]/10 border border-[#4285F4]/20 py-1.5 px-3.5 rounded-full cursor-pointer flex items-center justify-center space-x-1.5 transition-all active:scale-98 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#4285F4] ${loading.init ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Reload DB</span>
            </button>
          </div>

        </div>
      </div>

      {/* DASHBOARD GRID CONTAINER - Wide cohesive layout without sidebar */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col gap-6 bg-[#F8F9FA]">

        {/* RIGHT COLUMN: ACTIVE FEATURE VIEWBOARD */}
        <div className="w-full flex flex-col min-w-0">
          
          <AnimatePresence mode="wait">
            {loading.init ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-h-[400px] flex flex-col items-center justify-center card-geometric p-8 text-center shadow-sm bg-white"
              >
                <div className="relative flex items-center justify-center mb-4">
                  <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-[#4285F4] animate-spin" />
                  <Bot className="w-5 h-5 text-[#4285F4] absolute" />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">Unlocking the Lore Master archives...</h3>
                <p className="text-sm text-gray-500">Parsing Google Sheets metadata and simulated Discord routers</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col"
              >
                
                {/* CONTENT CARD WRAPPER */}
                <div className="card-geometric p-5 md:p-8 flex-1 flex flex-col shadow-sm min-h-[500px] bg-white">
                  
                  {/* TAB 1: CONCIERGE CHATBOT INTEGRATION */}
                  {false && (
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                        <div>
                          <h2 className="text-xl font-bold font-sans text-[#202124] flex items-center gap-2">
                            <Bot className="w-6 h-6 text-[#4285F4]" />
                            Autonomous Lore Concierge Bot
                          </h2>
                          <p className="text-xs text-[#5F6368]">
                            Natural-language router mapping inquiries to responsible officers and event outcomes. Simulated Discord context.
                          </p>
                        </div>
                        
                        <div className="hidden sm:block">
                          <span className="text-xs font-mono text-slate-400">Listener: gdg-lore-bot v1.2</span>
                        </div>
                      </div>

                      {/* QUICK-START LABELS */}
                      <div className="mb-4">
                        <span className="text-xs font-bold text-slate-500 block mb-2">💡 Quick-start test questions:</span>
                        <div className="flex flex-wrap gap-2">
                          {QUICK_START_SUGGESTIONS.map((sug, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setChatInput(sug);
                                handleChatSubmit(sug);
                              }}
                              className="text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 border border-slate-200 transition-colors py-1.5 px-3 rounded-full text-left"
                            >
                              {sug}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* CHAT MESSAGES PANEL - Geometric styling */}
                      <div className="flex-1 bg-slate-50/70 rounded-xl p-4.5 border border-gray-200 mb-4 h-96 overflow-y-auto flex flex-col space-y-4 shadow-inner">
                        {chatMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex flex-col max-w-[85%] ${
                              msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                            }`}
                          >
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-[10px] font-bold text-gray-400 font-mono">
                                {msg.sender === "user" ? "MEMBER" : `LORE BOT`}
                              </span>
                              {msg.source && (
                                <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full font-mono uppercase ${
                                  msg.source === "Gemini AI" 
                                    ? "bg-blue-100 text-[#4285F4]" 
                                    : "bg-slate-200 text-slate-500"
                                }`}>
                                  {msg.source}
                                </span>
                              )}
                              <span className="text-[9px] text-[#5F6368]">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>

                            <div
                              className={`p-3.5 rounded-xl text-sm leading-relaxed border ${
                                msg.sender === "user"
                                  ? "bg-[#4285F4] text-white border-[#4285F4] rounded-tr-none shadow-sm"
                                  : "bg-white text-gray-800 border-gray-200 rounded-tl-none shadow-xs"
                              }`}
                            >
                              {/* Simple renderer support markdown bolding */}
                              {msg.text.split("\n").map((para, pIdx) => {
                                // Basic parsing of markdown bold (**text** or *text*) and bullets
                                const parsedText = para
                                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                                  .replace(/\*(.*?)\*/g, "<em>$1</em>")
                                  .replace(/`([^`]+)`/g, "<code class='bg-slate-100 text-[#ea4335] px-1 font-mono text-xs rounded-sm'>$1</code>");

                                return (
                                  <p
                                    key={pIdx}
                                    className={`${pIdx > 0 ? "mt-2" : ""} ${
                                      para.trim().startsWith("- ") ? "pl-4 -indent-4 md:pl-5" : ""
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: parsedText }}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        ))}
                        {loading.chat && (
                          <div className="self-start flex items-center space-x-2 bg-white/80 border border-gray-200 p-3 rounded-xl shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                            <span className="text-xs font-mono text-slate-400">Scanning archives...</span>
                          </div>
                        )}
                        <div ref={chatBottomRef} />
                      </div>

                      {/* INPUT CHAT SECTION - Geometric Balance style input & button */}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleChatSubmit();
                        }}
                        className="flex items-center gap-3.5 mt-2"
                      >
                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder="Ask anything (e.g. 'Who handles logistics for the hackathon?')..."
                          className="flex-1 border border-gray-300 rounded-full py-2.5 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#4285F4] transition-all bg-white text-gray-800 shadow-inner"
                          disabled={loading.chat}
                        />
                        <button
                          type="submit"
                          className="bg-[#4285F4] hover:opacity-95 active:scale-98 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                          disabled={loading.chat}
                        >
                          <Send className="w-4 h-4" />
                          <span className="hidden sm:inline">Inquire</span>
                        </button>
                      </form>
                    </div>
                  )}

                  {/* TAB 2: ACTIVE DYNAMIC DIRECTORY - Geometric Balance styling */}
                  {activeTab === "directory" && (
                    <div className="flex-1 flex flex-col">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 pb-4 mb-6 gap-4">
                        <div>
                          <h2 className="text-xl font-bold font-sans text-gray-800 flex items-center gap-2">
                            <Users className="w-5 h-5 text-[#34A853]" />
                            Dynamic Org Chart Directory
                          </h2>
                          <p className="text-xs text-gray-500">
                            The standard lookup library. Any change made here updates the server directory immediately for natural language mapping.
                          </p>
                        </div>

                        {sessionUser !== null && (
                          <button
                            onClick={() => setShowRoleModal(true)}
                            className="bg-[#34A853] hover:opacity-95 active:scale-98 text-white text-xs font-bold py-2.5 px-4 rounded-full flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add Role Officer</span>
                          </button>
                        )}
                      </div>

                      {/* DIRECTORY DISPLAY CARDS */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {roles.map((item, idx) => (
                          <div
                            key={idx}
                            className="card-geometric p-5 shadow-sm bg-white hover:border-[#34A853] relative group flex flex-col justify-between"
                          >
                            <div>
                              {/* Officer Profile Header with Real Photos */}
                              <div className="flex gap-4 items-start mb-4">
                                <img
                                  src={getOfficerPhoto(item.name, idx)}
                                  alt={item.name}
                                  className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 shadow-xs shrink-0 bg-slate-50"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="flex-1 min-w-0">
                                  {/* Badge & Trash Action */}
                                  <div className="flex justify-between items-start gap-2 mb-1.5">
                                    <span className="bg-[#34A853]/10 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#34A853]/25 truncate max-w-[130px] sm:max-w-[180px]">
                                      {item.role}
                                    </span>
                                    {sessionUser !== null && (
                                      <button
                                        onClick={() => handleDeleteRole(idx)}
                                        className="text-gray-400 hover:text-[#EA4335] p-1 rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-200 shrink-0"
                                        title="Delete role card"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                  
                                  <h3 className="font-bold text-base text-gray-800 truncate">{item.name}</h3>
                                  
                                  <div className="mt-1 flex flex-col gap-0.5 text-xs text-gray-500">
                                    <span className="font-mono flex items-center gap-1.5 truncate">
                                      <MessageSquare className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                      {item.handle}
                                    </span>
                                    <span className="flex items-center gap-1.5 truncate">
                                      <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                      {item.contact}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Responsibilities */}
                              <div className="mt-4">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Responsibilities (AI Keywords Matcher)</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {item.responsibilities.map((resp, rIdx) => (
                                    <span
                                      key={rIdx}
                                      className="text-[10.5px] bg-[#34A853]/5 text-emerald-800 border border-[#34A853]/10 font-medium py-0.5 px-2 rounded-md"
                                    >
                                      {resp}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Forms links mapped */}
                            {item.forms && item.forms.length > 0 && (
                              <div className="mt-4 border-t border-gray-100 pt-3">
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Direct Forms Mapped:</span>
                                <div className="flex flex-col gap-1.5">
                                  {item.forms.map((form, fIdx) => (
                                    <a
                                      key={fIdx}
                                      href={form.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-xs text-[#4285F4] hover:underline flex items-center gap-1 font-semibold"
                                    >
                                      <ExternalLink className="w-3 h-3 text-gray-400 shrink-0" />
                                      {form.name}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}

                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: PAST EVENTS - Geometric Balance mockup recreation */}
                  {activeTab === "historical" && (
                    <div className="flex-1 flex flex-col">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 pb-4 mb-6 gap-4">
                        <div>
                          <span className="text-xs font-bold text-[#EA4335] uppercase tracking-wider block mb-1">ARCHIVAL REPOSITORY</span>
                          <h2 className="text-xl font-bold font-sans text-gray-800 flex items-center gap-2">
                            <Database className="w-5 h-5 text-[#EA4335]" />
                            Past Events Lore & Debriefs Vault
                          </h2>
                          <p className="text-xs text-gray-500 mt-1">
                            Historical records and context-aware event parameters. Concierge uses these to summarize key takeaways for onboarding.
                          </p>
                        </div>

                        {sessionUser !== null && (
                          <button
                            onClick={() => setShowProjectModal(true)}
                            className="bg-[#EA4335] hover:opacity-95 active:scale-98 text-white text-xs font-bold py-2.5 px-4 rounded-full flex items-center gap-1.5 shadow-md transition-all cursor-pointer whitespace-nowrap self-end sm:self-auto"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Archive New Event</span>
                          </button>
                        )}
                      </div>

                      {/* Mockup Search Bar */}
                      <div className="relative mb-6 max-w-xl">
                        <input
                          type="text"
                          placeholder="Search for a city or event to find lore..."
                          value={projectSearchQuery}
                          onChange={(e) => setProjectSearchQuery(e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-full py-2.5 pl-5 pr-12 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#4285F4] text-gray-800 shadow-inner transition-all placeholder-gray-400 font-sans"
                        />
                        <Search className="w-4.5 h-4.5 text-gray-400 absolute right-4 top-3" />
                      </div>

                      {/* Mockup Filter Chips Category list */}
                      <div className="mb-8 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 py-1 px-1 mr-1">
                          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
                          Filter by:
                        </span>
                        {["All", "DevFest", "Certification Study Group", "Google I/O Extended", "Build with AI", "AI - Gemini", "Google Cloud", "Accessibility", "AI", "Android", "C++", "Web3"].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setSelectedProjectTag(tag)}
                            className={`py-1.5 px-3.5 rounded-full border text-[11px] font-semibold transition-all duration-150 cursor-pointer ${
                              selectedProjectTag === tag
                                ? "bg-[#EA4335] text-white border-[#EA4335] shadow-xs"
                                : "bg-white text-gray-600 border-gray-200 hover:bg-slate-50 hover:border-gray-300"
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>

                      {/* PROJECTS MATRIX 4-COLUMN CARDS GRID */}
                      {(() => {
                        const filteredProjects = projects.filter((proj) => {
                          const location = proj.location || (
                            proj.name.toLowerCase().includes("manila") ? "Manila" :
                            proj.name.toLowerCase().includes("cebu") ? "Cebu" :
                            proj.name.toLowerCase().includes("hau") ? "Angeles" : "Manila"
                          );
                          const date = proj.date || (
                            proj.name.toLowerCase().includes("she") ? "May 30" :
                            proj.name.toLowerCase().includes("cloud") ? "Jun 6" :
                            proj.name.toLowerCase().includes("hau") ? "Jun 2" : "May 30"
                          );

                          const matchesSearch = 
                            proj.name.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
                            proj.theme.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
                            location.toLowerCase().includes(projectSearchQuery.toLowerCase());

                          const matchesTag = 
                            selectedProjectTag === "All" ||
                            proj.name.toLowerCase().includes(selectedProjectTag.toLowerCase()) ||
                            proj.theme.toLowerCase().includes(selectedProjectTag.toLowerCase());

                          return matchesSearch && matchesTag;
                        });

                        return (
                          <div className="flex flex-col gap-6">
                            {filteredProjects.length === 0 ? (
                              <div className="card-geometric p-12 text-center bg-white border border-gray-150 rounded-xl max-w-md mx-auto">
                                <HelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                                <h4 className="font-bold text-gray-700 text-sm mb-1">No event lore matches this filter</h4>
                                <p className="text-xs text-gray-400 max-w-xs mx-auto mb-4">
                                  There are no events matching "{selectedProjectTag}". You can add an event containing this tag by clicking "Archive New Event" above!
                                </p>
                                <button
                                  onClick={() => setSelectedProjectTag("All")}
                                  className="text-xs font-semibold text-[#EA4335] hover:underline"
                                >
                                  Reset tags filter
                                </button>
                              </div>
                            ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {filteredProjects.map((proj) => {
                                  // Determine fallback or customized values
                                  const location = proj.location || (
                                    proj.name.toLowerCase().includes("manila") ? "Manila" :
                                    proj.name.toLowerCase().includes("cebu") ? "Cebu" :
                                    proj.name.toLowerCase().includes("hau") ? "Angeles" : "Manila"
                                  );
                                  const date = proj.date || (
                                    proj.name.toLowerCase().includes("she") ? "May 30" :
                                    proj.name.toLowerCase().includes("cloud") ? "Jun 6" :
                                    proj.name.toLowerCase().includes("hau") ? "Jun 2" : "May 30"
                                  );

                                  const isSheBuilds = proj.name.toLowerCase().includes("she") || proj.name.toLowerCase().includes("women");
                                  const isCloudManila = proj.name.toLowerCase().includes("cloud");
                                  const isHau = proj.name.toLowerCase().includes("hau") || proj.name.toLowerCase().includes("festival");
                                  const isCebu = proj.name.toLowerCase().includes("cebu");

                                  return (
                                    <div
                                      key={proj.id}
                                      onClick={() => setExpandedProjectId(expandedProjectId === proj.id ? null : proj.id)}
                                      className={`bg-white border text-left rounded-xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer p-4 flex flex-col justify-between group ${
                                        expandedProjectId === proj.id ? "border-[#4285F4] ring-1 ring-[#4285F4]/10 bg-slate-50/30" : "border-gray-200 hover:border-gray-350"
                                      }`}
                                    >
                                      {/* Illustration Container */}
                                      <div className="w-full aspect-square relative mb-4 rounded-lg flex items-center justify-center overflow-hidden bg-slate-50 border border-gray-100">
                                        
                                        {/* CSS graphics to match screenshot layout circles */}
                                        {isSheBuilds && (
                                          <div className="absolute inset-0 bg-gradient-to-tr from-rose-50 via-slate-50 to-[#EA4335]/10 flex flex-col items-center justify-center p-3 text-center">
                                            <div className="w-20 h-20 rounded-full bg-rose-100/10 border-2 border-rose-300 flex flex-col items-center justify-center shadow-sm">
                                              <Sparkles className="w-5 h-5 text-rose-500 animate-pulse mb-0.5" />
                                              <span className="text-[10px] font-extrabold text-[#EA4335] uppercase tracking-wider">SheBuilds</span>
                                            </div>
                                            <div className="absolute bottom-2.5 flex gap-1 justify-center">
                                              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                              <span className="w-1.5 h-1.5 rounded-full bg-rose-300" />
                                              <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                                            </div>
                                          </div>
                                        )}

                                        {isCloudManila && (
                                          <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-slate-50 to-[#4285F4]/15 flex flex-col items-center justify-center p-3 text-center">
                                            <div className="w-20 h-20 rounded-full bg-blue-50/40 border-2 border-blue-200 flex flex-col items-center justify-center shadow-sm">
                                              <Cloud className="w-6 h-6 text-[#4285F4] animate-bounce" />
                                              <span className="text-[9px] font-extrabold text-[#4285F4] uppercase tracking-widest mt-0.5">Cloud</span>
                                            </div>
                                            <div className="absolute bottom-2.5 flex gap-1 justify-center">
                                              <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                                              <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                                              <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
                                            </div>
                                          </div>
                                        )}

                                        {isHau && (
                                          <div className="absolute inset-0 bg-[#202124] flex flex-col items-center justify-center p-3 text-center">
                                            <div className="w-20 h-20 rounded-full bg-slate-800/80 border-2 border-[#EA4335] flex flex-col items-center justify-center shadow-sm">
                                              <span className="text-[#FBBC05] font-mono font-bold text-xs tracking-tight">{`{ HAU }`}</span>
                                              <span className="text-[8px] uppercase tracking-widest text-[#34A853] font-bold mt-1">Fest '26</span>
                                            </div>
                                            <div className="absolute bottom-2.5 flex gap-1.5 justify-center">
                                              <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                                              <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                                              <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                                            </div>
                                          </div>
                                        )}

                                        {isCebu && (
                                          <div className="absolute inset-0 bg-gradient-to-tr from-green-50 via-slate-50 to-green-100 flex flex-col items-center justify-center p-3 text-center">
                                            <div className="w-20 h-20 rounded-full bg-white border-2 border-[#34A853] flex flex-col items-center justify-center shadow-sm">
                                              <span className="text-[11px] font-extrabold text-[#34A853]">Cebu</span>
                                              <span className="text-[8px] font-bold text-gray-500 mt-0.5">Build AI</span>
                                            </div>
                                            <div className="absolute bottom-2.5 flex gap-1.5 justify-center">
                                              <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                                              <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
                                            </div>
                                          </div>
                                        )}

                                        {!isSheBuilds && !isCloudManila && !isHau && !isCebu && (
                                          <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 via-gray-100 to-slate-200 flex flex-col items-center justify-center p-3 text-center">
                                            <div className="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-xs">
                                              <Database className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <span className="text-[9.5px] font-bold text-gray-400 mt-2 uppercase tracking-wide">Dynamic Event Lore</span>
                                          </div>
                                        )}

                                        {/* Dynamic Year badge */}
                                        <span className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-2xs text-[10px] font-bold text-[#E85C4F] py-0.5 px-2 rounded-full shadow-2xs border border-[#EA4335]/15">
                                          {proj.year}
                                        </span>
                                      </div>

                                      {/* Event Details and Hover Actions */}
                                      <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                          <h3 className="text-xs font-bold text-[#1A73E8] group-hover:text-blue-700 leading-snug cursor-pointer line-clamp-2" title={proj.name}>
                                            {proj.name}
                                          </h3>
                                          <p className="text-[10px] text-gray-500 leading-normal line-clamp-2 mt-1 italic">
                                            "{proj.theme}"
                                          </p>
                                        </div>

                                        <div>
                                          <div className="h-px bg-gray-100 my-3" />

                                          <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
                                            {/* Location Pin */}
                                            <div className="flex items-center gap-1">
                                              <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                              <span>{location}</span>
                                            </div>

                                            {/* Date Banner */}
                                            <div className="flex items-center gap-1">
                                              <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                              <span>{date}</span>
                                            </div>
                                          </div>

                                          {/* Micro state Indicator */}
                                          <div className="mt-2 text-center text-[9px] text-[#5F6368] font-bold uppercase tracking-wider">
                                            {expandedProjectId === proj.id ? "▲ COLLAPSE DEBRIEF" : "▼ OPEN DEBRIEF LORE"}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {/* Detailed Lore Drawer Content when clicked */}
                            <AnimatePresence>
                              {expandedProjectId && (() => {
                                const selectedProj = projects.find(p => p.id === expandedProjectId);
                                if (!selectedProj) return null;
                                return (
                                  <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 15 }}
                                    className="bg-slate-50 border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm text-left overflow-hidden mt-2"
                                  >
                                    <div className="flex flex-col md:flex-row items-start justify-between gap-6 border-b border-gray-200 pb-5 mb-5">
                                      <div>
                                        <span className="text-[9px] bg-[#EA4335]/10 text-[#EA4335] font-extrabold px-2.5 py-0.5 rounded-full border border-[#EA4335]/20 uppercase tracking-widest">
                                          ARCHIVED ORGANIZATIONAL DEBRIEF LORE
                                        </span>
                                        <h4 className="text-base font-bold text-gray-800 mt-2 flex items-center gap-1.5">
                                          <Database className="w-4.5 h-4.5 text-[#EA4335]" />
                                          {selectedProj.name}
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-0.5 font-medium">{selectedProj.theme}</p>
                                      </div>

                                      <div className="flex flex-wrap gap-2.5">
                                        <span className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold font-mono text-gray-700 shadow-2xs flex items-center gap-1.5">
                                          <Coins className="w-3.5 h-3.5 text-yellow-600" />
                                          Budget Spent: ${selectedProj.budget}
                                        </span>
                                        <span className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold font-mono text-gray-700 shadow-2xs flex items-center gap-1.5">
                                          <Users className="w-3.5 h-3.5 text-[#34A853]" />
                                          Attendance: {selectedProj.attendees}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                      {/* Takeaways column */}
                                      <div>
                                        <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                                          <Sparkles className="w-3.5 h-3.5 text-[#FBBC05]" /> Takeaways & Lessons Learned
                                        </h5>
                                        <ul className="space-y-2">
                                          {selectedProj.key_takeaways.map((takeaway, idx) => (
                                            <li key={idx} className="bg-white border border-gray-150 p-3 rounded-xl text-xs text-gray-600 flex items-start gap-2.5 shadow-2xs leading-relaxed">
                                              <span className="text-[#EA4335] mt-0.5 font-bold shrink-0">◈</span>
                                              <span>{takeaway}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>

                                      {/* Assets column */}
                                      <div>
                                        <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                                          <ExternalLink className="w-3.5 h-3.5 text-gray-400" /> Uploaded Assets & Deliverables
                                        </h5>
                                        
                                        {(!selectedProj.assets || Object.keys(selectedProj.assets).length === 0) ? (
                                          <div className="p-4 border border-dashed border-gray-200 rounded-xl text-center text-xs text-gray-400 bg-white">
                                            No asset linkages are recorded. Use the "Archive New Event" form to save asset folders.
                                          </div>
                                        ) : (
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {Object.entries(selectedProj.assets).map(([key, val]) => (
                                              <a
                                                key={key}
                                                href={val}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="bg-white hover:bg-slate-50 border border-gray-200 p-2.5 rounded-lg text-xs text-slate-700 font-semibold flex items-center justify-between transition-all shadow-2xs group hover:border-[#4285F4]"
                                              >
                                                <div className="flex items-center gap-1.5 max-w-[85%]">
                                                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                                                  <span className="capitalize text-gray-800 font-sans truncate">{key}</span>
                                                </div>
                                                <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-[#4285F4] transition-colors" />
                                              </a>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </motion.div>
                                );
                              })()}
                            </AnimatePresence>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* TAB 4: AUTOMATED MEETING MINUTES HANDOFF - Geometric Balance styling */}
                  {activeTab === "handoff" && (
                    <div className="flex-1 flex flex-col">
                      <div className="border-b border-gray-200 pb-4 mb-5">
                        <h2 className="text-xl font-bold font-sans text-gray-800 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-[#FBBC05]" />
                          Automated "Council Handoff" Assistant
                        </h2>
                        <p className="text-xs text-gray-500">
                          Feed raw meeting transcript scripts. The Lore Master extracts concrete responsibilities and highlights critical cross-committee dependencies.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
                        
                        {/* LEFT FORM: INPUT MINUTES */}
                        <div className="flex flex-col">
                          <div className="flex justify-between items-center mb-2.5">
                            <span className="text-xs font-bold text-gray-500">Raw Transcript / Simulated Webhook Payload:</span>
                            <button
                              onClick={() => {
                                setMinutesInput(SAMPLE_MEETING_MINUTES);
                                triggerToast("Prefilled template loaded!");
                              }}
                              className="text-[10px] uppercase tracking-wider font-bold border border-gray-200 bg-white text-gray-500 py-1 px-2.5 rounded hover:bg-slate-50 cursor-pointer shadow-2xs transition-colors"
                            >
                              Prefill Template
                            </button>
                          </div>
                          
                          <textarea
                            value={minutesInput}
                            onChange={(e) => setMinutesInput(e.target.value)}
                            placeholder="Type or paste core meeting transcripts..."
                            className="flex-1 min-h-[260px] bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-[#FBBC05] p-3.5 rounded-xl text-xs font-mono leading-relaxed text-gray-700 shadow-inner"
                          />

                          <button
                            onClick={handleHandoffSubmit}
                            disabled={loading.handoff || !minutesInput.trim()}
                            className="mt-3 bg-[#FBBC05] hover:opacity-95 active:scale-98 text-[#3D3000] font-bold py-2.5 px-5 rounded-full flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                          >
                            {loading.handoff ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>Generating structured handoff...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4" />
                                <span>Compile Structured Handoff (3-Bullets)</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* RIGHT PREVIEW: STRUCTURED CHECKLIST OUTPUT */}
                        <div className="bg-slate-50 p-5 border border-gray-200 rounded-xl flex flex-col justify-between shadow-inner">
                          <div>
                            <div className="flex justify-between items-center border-b border-gray-200 pb-2.5 mb-4">
                              <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
                                <FileCheck className="w-4 h-4 text-[#FBBC05]" />
                                Master Structured Handoff Block
                              </span>
                              {handoffSource && (
                                <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                                  handoffSource === "Gemini AI" ? "bg-blue-100 text-[#4285F4]" : "bg-slate-200 text-gray-500"
                                }`}>
                                  {handoffSource}
                                </span>
                              )}
                            </div>

                            {handoffResults ? (
                              <div className="space-y-3.5">
                                {handoffResults.split(/\n+/).map((bullet, bIdx) => {
                                  if (!bullet.trim()) return null;
                                  // Strip leading symbols (-, •, *, Numbers)
                                  const textOnly = bullet.replace(/^[*\-•\d.\s]+/g, "");
                                  return (
                                    <div
                                      key={bIdx}
                                      className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs flex items-start space-x-3.5"
                                    >
                                      <span className="w-5.5 h-5.5 rounded-full bg-[#FBBC05]/15 text-[#B06000] flex items-center justify-center font-bold text-xs shrink-0 border border-[#FBBC05]/20">
                                        {bIdx + 1}
                                      </span>
                                      <p className="text-xs leading-relaxed text-gray-700 font-medium">{textOnly}</p>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="h-48 flex flex-col items-center justify-center text-center text-gray-400">
                                <HelpCircle className="w-7 h-7 text-gray-300 mb-2" />
                                <p className="text-xs font-medium">No summary generated yet.</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">Submit the transcript file on the left to activate.</p>
                              </div>
                            )}
                          </div>

                          <div className="text-[10px] text-gray-400 tracking-wide mt-4 pt-3 border-t border-gray-200 italic font-normal">
                            💡 Design Note: Ideal for forwarding to Discord webhook channels or pasting directly in team newsletters!
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* TAB 5: SECURE VIBE CHECK BOX - Geometric Balance styling with Content Moderation Rules */}
                  {activeTab === "vibe" && (
                    <div className="flex-1 flex flex-col">
                      <div className="border-b border-gray-200 pb-4 mb-4">
                        <h2 className="text-xl font-bold font-sans text-gray-800 flex items-center gap-2">
                          <Lock className="w-5 h-5 text-purple-600" />
                          Secure & Anonymous "Vibe Check" Box
                        </h2>
                        <p className="text-xs text-gray-500">
                          Complaints, feedback, and raw community concerns. The server automatically strips private user strings, Slack tags, and email markers to protect you.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
                        
                        {/* PORTAL BOX FOR STUDENTS */}
                        <div className="flex flex-col justify-between bg-purple-50/20 p-5 rounded-xl border border-purple-200/50 shadow-2xs">
                          <div>
                            <span className="text-[10px] font-bold text-purple-800 uppercase tracking-widest block mb-1">SAFE REPORT PORTAL</span>
                            <h3 className="font-bold text-sm text-gray-800 mb-1.5 font-sans">Share Concern or SuggestAnonymously</h3>
                            
                            {/* Visual Community Standards Rules Block */}
                            <div className="bg-white/80 border border-purple-100 p-3.5 rounded-xl mb-4 text-xs text-gray-650">
                              <span className="font-black text-[10px] text-purple-700 tracking-wider uppercase block mb-1.5">⚖️ Vibe Rule Guidelines</span>
                              <ul className="space-y-1.5 list-none pl-0">
                                <li className="flex items-start gap-1.5">
                                  <span className="text-emerald-500">✓</span>
                                  <span><strong>Anonymized logs:</strong> Identifiers are completely purged from database entries.</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                  <span className="text-[#EA4335] font-bold">⚠</span>
                                  <span><strong>Prohibited Profanity:</strong> Inappropriate cussing, vulgar slurs, or cursing is automatically checked and masked (e.g. <code>f***</code>).</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                  <span className="text-amber-500 font-bold">⏱</span>
                                  <span><strong>Anti-Spam Filter:</strong> Standard 10 seconds wait period after submitting. Repeat duplicate text copies are blocked.</span>
                                </li>
                              </ul>
                            </div>

                            {/* Self-check Warning Prompts */}
                            {vibeInput.trim() !== "" && (
                              (() => {
                                const badWords = ["fuck", "shit", "bitch", "ass", "crap", "cunt", "bastard", "damn", "dick", "pussy", "slut", "piss"];
                                const containsProfanity = badWords.some(w => new RegExp("\\b" + w + "s?\\b", "i").test(vibeInput));
                                return containsProfanity ? (
                                  <div className="bg-amber-50 text-amber-800 text-[11px] p-2.5 rounded-lg border border-amber-200 mb-2 font-medium flex items-center gap-1.5">
                                    <span>⚠️ Inappropriate cursing detected! Profane words will be masked automatically.</span>
                                  </div>
                                ) : null;
                              })()
                            )}

                            {vibeCooldown > 0 && (
                              <div className="bg-red-50 text-red-700 text-[11px] p-2.5 rounded-lg border border-red-100 mb-2 font-semibold flex items-center gap-1.5 animate-pulse">
                                <span>⏱ Anti-Spam Lock active. Please write your thoughts and wait {vibeCooldown}s to submit.</span>
                              </div>
                            )}

                            <textarea
                              value={vibeInput}
                              onChange={(e) => setVibeInput(e.target.value)}
                              disabled={vibeCooldown > 0}
                              placeholder={vibeCooldown > 0 ? `Spam lock active... Wait ${vibeCooldown}s` : "E.g. The meeting room size was too small, or feel there is insufficient documentation for team budget rules..."}
                              className={`w-full h-32 bg-white border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 p-3.5 rounded-xl text-xs text-gray-700 shadow-inner ${vibeCooldown > 0 ? "opacity-60 bg-gray-50 cursor-not-allowed" : ""}`}
                            />
                          </div>

                          <button
                            onClick={handleVibeSubmit}
                            disabled={loading.vibe || !vibeInput.trim() || vibeCooldown > 0}
                            className={`mt-3.5 w-full font-bold py-2.5 px-5 rounded-full flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                              vibeCooldown > 0 
                                ? "bg-gray-300 text-gray-550 border border-gray-400/20 cursor-not-allowed" 
                                : "bg-[#EA4335] hover:opacity-95 active:scale-98 text-white"
                            }`}
                          >
                            <ShieldCheck className="w-4.5 h-4.5" />
                            <span>
                              {loading.vibe 
                                ? "Sanitizing & Logging securely..." 
                                : vibeCooldown > 0 
                                  ? `Spam Protection Active (${vibeCooldown}s)` 
                                  : "Secure Submission"}
                            </span>
                          </button>
                        </div>

                        {/* OFFICER REVIEW BOARD SCREEN */}
                        <div className="flex flex-col bg-white p-5 card-geometric shadow-sm">
                          <div className="flex items-center justify-between border-b border-gray-150 pb-2.5 mb-3">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Leadership Review Scoreboard</span>
                            <span className="bg-red-100 text-[#EA4335] text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono border border-red-200">
                              OFFICERS ONLY
                            </span>
                          </div>

                          <p className="text-[11px] text-[#5F6368] mb-3">
                            Only raw sanitized content is recorded. Absolutely zero identifiers could be linked back. Use these cards for aggregate leadership review:
                          </p>

                          {/* Sanitized Stream */}
                          <div className="flex-1 space-y-3 max-h-80 overflow-y-auto pr-1">
                            {vibes.length > 0 ? (
                              vibes.map((v) => (
                                <div key={v.id} className="bg-slate-50 p-3.5 rounded-lg border border-gray-255 shadow-2xs relative">
                                  <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1.5 font-normal">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-mono text-[9px] font-semibold">{v.id}</span>
                                      {v.censored && (
                                        <span className="bg-amber-100 text-amber-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded-sm uppercase tracking-wide border border-amber-200">
                                          Censored
                                        </span>
                                      )}
                                    </div>
                                    <span>{new Date(v.timestamp).toLocaleString()}</span>
                                  </div>
                                  <p className="text-xs text-gray-750 p-0.5 leading-relaxed font-sans italic">
                                    "{v.text}"
                                  </p>
                                </div>
                              ))
                            ) : (
                              <div className="h-32 flex flex-col items-center justify-center text-center text-gray-400">
                                <p className="text-xs font-mono font-medium">Feedback drawer is empty.</p>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      {/* ==========================================
          MODAL 1: ADD OFFICERS DIRECTORY MODAL - Geometric Balance Styling
          ========================================== */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 bg-[#202124]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 w-full max-w-lg shadow-2xl relative"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-1 font-sans">Add Community Officer</h3>
            <p className="text-xs text-gray-500 mb-5">
              Instantly create a role directory card. Active chatbot queries will parse and output this on-the-fly.
            </p>

            <form onSubmit={handleAddRoleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newRoleForm.name}
                    onChange={(e) => setNewRoleForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Alex Rivera"
                    className="w-full border border-gray-300 rounded-full py-2 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-green-150 focus:border-[#34A853] bg-white text-gray-800 shadow-inner transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Role Title *</label>
                  <input
                    type="text"
                    required
                    value={newRoleForm.role}
                    onChange={(e) => setNewRoleForm(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="Community Lead"
                    className="w-full border border-gray-300 rounded-full py-2 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-green-150 focus:border-[#34A853] bg-white text-gray-800 shadow-inner transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Slack/Discord Handle</label>
                  <input
                    type="text"
                    value={newRoleForm.handle}
                    onChange={(e) => setNewRoleForm(prev => ({ ...prev, handle: e.target.value }))}
                    placeholder="@alex_rivera"
                    className="w-full border border-gray-300 rounded-full py-2 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-green-150 focus:border-[#34A853] bg-white text-gray-800 shadow-inner transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={newRoleForm.contact}
                    onChange={(e) => setNewRoleForm(prev => ({ ...prev, contact: e.target.value }))}
                    placeholder="alex.rivera@gdgchapter.org"
                    className="w-full border border-gray-300 rounded-full py-2 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-green-150 focus:border-[#34A853] bg-white text-gray-800 shadow-inner transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">
                  Scope Responsibilities (comma-separated tags)
                </label>
                <input
                  type="text"
                  value={newRoleForm.responsibilities}
                  onChange={(e) => setNewRoleForm(prev => ({ ...prev, responsibilities: e.target.value }))}
                  placeholder="room booking, budget signing, catering order, poster design"
                  className="w-full border border-gray-300 rounded-full py-2 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-green-150 focus:border-[#34A853] bg-white text-gray-800 shadow-inner transition-all"
                />
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-gray-200 space-y-3 shadow-inner">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Map Direct Request Form (Optional)</span>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-500 block mb-0.5">Form Name</label>
                    <input
                      type="text"
                      value={newRoleForm.formName}
                      onChange={(e) => setNewRoleForm(prev => ({ ...prev, formName: e.target.value }))}
                      placeholder="Room Reservation Request"
                      className="w-full border border-gray-300 rounded-full py-1.5 px-3.5 text-xs focus:outline-none focus:ring-2 focus:ring-green-150 focus:border-[#34A853] bg-white text-gray-800 shadow-inner transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 block mb-0.5">Form Link URL</label>
                    <input
                      type="text"
                      value={newRoleForm.formUrl}
                      onChange={(e) => setNewRoleForm(prev => ({ ...prev, formUrl: e.target.value }))}
                      placeholder="https://forms.gle/..."
                      className="w-full border border-gray-300 rounded-full py-1.5 px-3.5 text-xs focus:outline-none focus:ring-2 focus:ring-green-150 focus:border-[#34A853] bg-white text-gray-800 shadow-inner transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowRoleModal(false)}
                  className="bg-slate-100 hover:bg-slate-250 text-gray-700 text-xs font-bold py-2 px-4 rounded-full cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading.saveRole}
                  className="bg-[#34A853] hover:opacity-95 active:scale-98 text-white text-xs font-bold py-2 px-5 rounded-full cursor-pointer transition-all shadow-sm"
                >
                  {loading.saveRole ? "Appending..." : "Confirm & Save Directory"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}


      {/* ==========================================
          MODAL 2: ADD HISTORICAL PROJECT RECORD
          ========================================== */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-[#202124]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 w-full max-w-xl shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-1 font-sans">Archive Historical Event</h3>
            <p className="text-xs text-gray-500 mb-5">
              Add key budget and metrics parameter outcomes for internal knowledge management onboarding.
            </p>

            <form onSubmit={handleAddProjectSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Event Name *</label>
                  <input
                    type="text"
                    required
                    value={newProjectForm.name}
                    onChange={(e) => setNewProjectForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="DevFest Asia Pacific College"
                    className="w-full border border-gray-300 rounded-full py-2 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#EA4335] bg-white text-gray-800 shadow-inner transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Implementation Year *</label>
                  <input
                    type="number"
                    required
                    value={newProjectForm.year}
                    onChange={(e) => setNewProjectForm(prev => ({ ...prev, year: e.target.value }))}
                    className="w-full border border-gray-300 rounded-full py-2 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#EA4335] bg-white text-gray-800 shadow-inner transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Strategic Theme / Catchphrase</label>
                <input
                  type="text"
                  value={newProjectForm.theme}
                  onChange={(e) => setNewProjectForm(prev => ({ ...prev, theme: e.target.value }))}
                  placeholder="Democratizing tech loops for student communities"
                  className="w-full border border-gray-300 rounded-full py-2 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#EA4335] bg-white text-gray-800 shadow-inner transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Budget Spent (USD) *</label>
                  <input
                    type="number"
                    required
                    value={newProjectForm.budget}
                    onChange={(e) => setNewProjectForm(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full border border-gray-300 rounded-full py-2 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#EA4335] bg-white text-gray-800 shadow-inner transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Attendees headcount *</label>
                  <input
                    type="number"
                    required
                    value={newProjectForm.attendees}
                    onChange={(e) => setNewProjectForm(prev => ({ ...prev, attendees: e.target.value }))}
                    className="w-full border border-gray-300 rounded-full py-2 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#EA4335] bg-white text-gray-800 shadow-inner transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Event Location (e.g. Manila, Angeles, Cebu) *</label>
                  <input
                    type="text"
                    required
                    value={newProjectForm.location}
                    onChange={(e) => setNewProjectForm(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Manila"
                    className="w-full border border-gray-300 rounded-full py-2 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#EA4335] bg-white text-gray-800 shadow-inner transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Event Date (e.g. May 30) *</label>
                  <input
                    type="text"
                    required
                    value={newProjectForm.date}
                    onChange={(e) => setNewProjectForm(prev => ({ ...prev, date: e.target.value }))}
                    placeholder="May 30"
                    className="w-full border border-gray-300 rounded-full py-2 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#EA4335] bg-white text-gray-800 shadow-inner transition-all"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-gray-200 grid grid-cols-3 gap-3 shadow-inner">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block col-span-3">Asset URLs</span>
                <div>
                  <label className="text-[9px] text-gray-400 block mb-0.5">Slides</label>
                  <input
                    type="text"
                    value={newProjectForm.slides}
                    onChange={(e) => setNewProjectForm(prev => ({ ...prev, slides: e.target.value }))}
                    placeholder="https://..."
                    className="w-full border border-gray-300 rounded-full py-1.5 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#EA4335] bg-white text-gray-800 shadow-inner transition-all"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-gray-400 block mb-0.5">GitHub</label>
                  <input
                    type="text"
                    value={newProjectForm.github}
                    onChange={(e) => setNewProjectForm(prev => ({ ...prev, github: e.target.value }))}
                    placeholder="https://..."
                    className="w-full border border-gray-300 rounded-full py-1.5 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#EA4335] bg-white text-gray-800 shadow-inner transition-all"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-gray-400 block mb-0.5">Photos</label>
                  <input
                    type="text"
                    value={newProjectForm.photos}
                    onChange={(e) => setNewProjectForm(prev => ({ ...prev, photos: e.target.value }))}
                    placeholder="https://..."
                    className="w-full border border-gray-300 rounded-full py-1.5 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#EA4335] bg-white text-gray-800 shadow-inner transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 block mb-1">Key Takeaways & Lessons Learned (Max 3)</label>
                <input
                  type="text"
                  value={newProjectForm.takeaway1}
                  onChange={(e) => setNewProjectForm(prev => ({ ...prev, takeaway1: e.target.value }))}
                  placeholder="Takeaway 1: Secured venue 4 weeks early which reduced risk."
                  className="w-full border border-gray-300 rounded-full py-1.5 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#EA4335] bg-white text-gray-800 shadow-inner transition-all"
                />
                <input
                  type="text"
                  value={newProjectForm.takeaway2}
                  onChange={(e) => setNewProjectForm(prev => ({ ...prev, takeaway2: e.target.value }))}
                  placeholder="Takeaway 2: Stickers print vendor was delayed, switch print house next time."
                  className="w-full border border-gray-300 rounded-full py-1.5 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#EA4335] bg-white text-gray-800 shadow-inner transition-all"
                />
                <input
                  type="text"
                  value={newProjectForm.takeaway3}
                  onChange={(e) => setNewProjectForm(prev => ({ ...prev, takeaway3: e.target.value }))}
                  placeholder="Takeaway 3: Hands-on Kotlin exercises were overcrowded."
                  className="w-full border border-gray-300 rounded-full py-1.5 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#EA4335] bg-white text-gray-800 shadow-inner transition-all"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="bg-slate-100 hover:bg-slate-250 text-gray-700 text-xs font-bold py-2 px-4 rounded-full cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading.saveProject}
                  className="bg-[#EA4335] hover:opacity-95 active:scale-98 text-white text-xs font-bold py-2 px-5 rounded-full cursor-pointer transition-all shadow-sm"
                >
                  {loading.saveProject ? "Adding..." : "Confirm & Save Event"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ==========================================
          MODAL 3: SYSTEM WIDE LORE SETTINGS
          ========================================== */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-[#202124]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 w-full max-w-md shadow-2xl relative"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-1 font-sans">Lore System Config Parameters</h3>
            <p className="text-xs text-gray-500 mb-5">
              Customize local Discord routers, mock API ports, and toggle autonomous summarization agents.
            </p>

            <div className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Local Listening Port (Reverse Ingress Proxy)</label>
                <input
                  type="text"
                  disabled
                  value="3000 (Cloud Run Configured)"
                  className="w-full border border-gray-200 bg-slate-50 rounded-full py-2 px-4 text-xs text-gray-500 cursor-not-allowed font-mono font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Simulated Discord Client Prefix Trigger</label>
                <input
                  type="text"
                  defaultValue="!lore"
                  placeholder="!lore"
                  className="w-full border border-gray-300 rounded-full py-2 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#4285F4] bg-white text-gray-800 shadow-inner"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Incoming Webhook Secret Token</label>
                <input
                  type="password"
                  value="gdg_master_token_********************"
                  disabled
                  className="w-full border border-gray-200 bg-slate-50 rounded-full py-2 px-4 text-xs text-gray-500 cursor-not-allowed font-mono"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50/45 rounded-xl border border-blue-100">
                <div>
                  <h5 className="text-xs font-bold text-gray-700">Autonomous Concierge Backing</h5>
                  <p className="text-[10px] text-gray-500">Enable modern Google Gemini SDK fallback triggers</p>
                </div>
                <div className="relative inline-flex items-center">
                  <span className="bg-[#34A853]/15 text-[#34A853] text-[9px] font-bold px-2.5 py-1 rounded-full border border-[#34A853]/15 whitespace-nowrap">
                    Active (Gemini 2.5)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-5 mt-5 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="bg-slate-100 hover:bg-slate-250 text-gray-750 text-xs font-bold py-2 px-4 rounded-full cursor-pointer transition-all"
              >
                Close Settings
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSettingsModal(false);
                  triggerToast("Lore System Config Parameters saved successfully!");
                }}
                className="bg-[#4285F4] hover:opacity-95 active:scale-98 text-white text-xs font-bold py-2 px-5 rounded-full cursor-pointer transition-all"
              >
                Save Channels
              </button>
            </div>
          </motion.div>
        </div>
      )}

        </>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-6 px-4 text-center">
        <p className="text-xs text-gray-400 font-sans">
          The Lore Master • Developed for Student Organization Concierge & Hackathon Showcase Operations
        </p>
        <p className="text-[10px] text-gray-300 font-mono mt-1">
          GDG APC Community Chapter
        </p>
      </footer>

      {/* FLOATING CHAT WIDGET - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 35, scale: 0.92 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white rounded-2xl border border-gray-200 shadow-2xl flex flex-col overflow-hidden w-[90vw] sm:w-[380px] md:w-[410px] h-[550px] mb-4 text-left font-sans pointer-events-auto"
            >
              {/* HEADER */}
              <div className="bg-[#4285F4] p-4 text-white flex items-center justify-between shadow-sm shrink-0">
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 bg-white/10 rounded-lg">
                    <Bot className="w-5 h-5 text-white animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold tracking-tight">Lore Master Concierge</h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] text-white/90">Always listening for org requests</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all cursor-pointer border border-transparent"
                  title="Minimize Chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* QUICK CHIPS */}
              <div className="p-3 bg-slate-50 border-b border-gray-150 shrink-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">💡 Click a sample question:</span>
                <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto pr-1 select-none">
                  {QUICK_START_SUGGESTIONS.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setChatInput(sug);
                        handleChatSubmit(sug);
                      }}
                      className="text-[10.5px] text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-900 border border-gray-200 transition-colors py-1 px-2 rounded-full text-left font-semibold cursor-pointer shadow-3xs"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>

              {/* MESSAGES LAYER */}
              <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 flex flex-col space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] ${
                      msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[9px] font-bold text-gray-400 font-mono">
                        {msg.sender === "user" ? "MEMBER" : `LORE BOT`}
                      </span>
                      {msg.source && (
                        <span className={`text-[8.5px] font-bold px-1.5 py-0.2 rounded-full font-mono uppercase ${
                          msg.source === "Gemini AI" 
                            ? "bg-blue-100 text-[#4285F4]" 
                            : "bg-slate-200 text-slate-500"
                        }`}>
                          {msg.source}
                        </span>
                      )}
                      <span className="text-[8.5px] text-[#5F6368]">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div
                      className={`p-3 rounded-xl text-xs leading-relaxed border ${
                        msg.sender === "user"
                          ? "bg-[#4285F4] text-white border-[#4285F4] rounded-tr-none shadow-sm"
                          : "bg-white text-gray-800 border-gray-200 rounded-tl-none shadow-xs"
                      }`}
                    >
                      {msg.text.split("\n").map((para, pIdx) => {
                        const parsedText = para
                          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                          .replace(/\*(.*?)\*/g, "<em>$1</em>")
                          .replace(/`([^`]+)`/g, "<code class='bg-slate-100 text-[#ea4335] px-1 font-mono text-[9px] rounded-sm'>$1</code>");

                        return (
                          <p
                            key={pIdx}
                            className={`${pIdx > 0 ? "mt-1.5" : ""} ${
                              para.trim().startsWith("- ") ? "pl-3.5 -indent-3.5" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: parsedText }}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
                
                {loading.chat && (
                  <div className="self-start flex items-center space-x-2 bg-white/95 border border-gray-200 p-2.5 rounded-xl shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-[10px] font-mono text-slate-400">Scanning archives...</span>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* CHAT INPUT AREA */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleChatSubmit();
                }}
                className="p-3 border-t border-gray-200 bg-white flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask the Lore Master..."
                  className="flex-1 border border-gray-300 rounded-full py-2 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#4285F4] transition-all bg-white text-gray-800 shadow-inner"
                  disabled={loading.chat}
                />
                <button
                  type="submit"
                  className="bg-[#4285F4] hover:bg-blue-600 active:scale-95 text-white p-2 rounded-full shadow-md transition-all flex items-center justify-center cursor-pointer shrink-0"
                  disabled={loading.chat}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Bubble Button */}
        <motion.button
          onClick={() => setIsChatOpen(!isChatOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full shadow-3xl flex items-center justify-center cursor-pointer transition-colors duration-200 pointer-events-auto border outline-none ${
            isChatOpen 
              ? "bg-[#EA4335] text-white border-red-500 hover:bg-red-600" 
              : "bg-[#4285F4] text-white border-blue-500 hover:bg-blue-600 animate-bounce"
          }`}
          title="Toggle Lore Concierge"
        >
          {isChatOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </motion.button>
      </div>

    </div>
  );
}
