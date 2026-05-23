export interface HallOfFameMember {
  id: string;
  name: string;
  year: string;
  achievement: string;
  photoUrl?: string;
}

export interface FormLink {
  name: string;
  url: string;
}

export interface RoleDirectoryItem {
  role: string;
  name: string;
  handle: string;
  contact: string;
  responsibilities: string[];
  forms: FormLink[];
}

export interface HistoricalProject {
  id: string;
  name: string;
  year: number;
  theme: string;
  budget: number;
  attendees: number;
  assets: {
    slides?: string;
    github?: string;
    photos?: string;
    recording?: string;
    [key: string]: string | undefined;
  };
  key_takeaways: string[];
  location?: string;
  date?: string;
}

export interface VibeCheck {
  id: string;
  text: string;
  timestamp: string;
  censored?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  source?: string;
}
