import React, { useState } from "react";
import { Sparkles, ArrowLeft } from "lucide-react";

interface SignInFormProps {
  onLoginSuccess: (email: string) => void;
  onGoBackHome: () => void;
  className?: string;
}

export default function SignInForm({ onLoginSuccess, onGoBackHome, className = "" }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter a valid email address to authenticate.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please include a proper '@' domain name in the simulated login.");
      return;
    }

    // Pass email up to parent state to simulate standard authentication
    onLoginSuccess(email.trim());
  };

  return (
    <div className={`bg-white rounded-xl shadow-2xl border border-gray-150 overflow-hidden w-full max-w-md ${className}`}>
      {/* CARD TOP SLAT - GDG Logo Brand Header */}
      <div className="bg-slate-50 border-b border-gray-150 p-5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
          </div>
          <span className="text-xs font-black uppercase text-gray-800 tracking-widest font-mono">
            GDG Lore Master
          </span>
        </div>
        <span className="text-[10px] text-gray-400 font-mono font-bold">APAC Chapter</span>
      </div>

      <div className="p-7 md:p-9 text-left">
        {/* Back Link to Home */}
        <button
          type="button"
          onClick={onGoBackHome}
          className="text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1.5 mb-5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <h2 className="text-xl md:text-2xl font-black text-gray-900 font-sans tracking-tight mb-1">
          Sign In
        </h2>
        <p className="text-xs text-slate-500 mb-6 font-sans">
          Access the secure chapter administrator console.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600 font-semibold leading-snug">
            {error}
          </div>
        )}

        {/* INPUT LAYERS */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="text-xs font-bold text-gray-500 block mb-1.5 tracking-wide">
              Email
            </label>
            <input
              id="login-email"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              placeholder="name@example.com"
              className="w-full border-2 border-gray-200 rounded-lg py-2.5 px-4 text-sm font-medium focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4]/30 bg-white text-gray-800 transition-all font-sans"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#202124] hover:bg-black active:scale-98 text-white font-bold py-3 px-4 rounded-lg text-xs shadow-md scroll-smooth tracking-wider uppercase transition-all duration-150 cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>Next</span>
          </button>
        </form>

        <div className="relative my-6 flex py-0.5 items-center justify-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative bg-white px-3 text-xs font-bold text-gray-400 uppercase tracking-widest bg-transparent">
            Or:
          </div>
        </div>

        {/* GOOGLE CONTINUATION BUTTON - Autodesk Styling */}
        <button
          onClick={() => onLoginSuccess("juan.delacruz@gdgchapter.org")}
          className="w-full border-2 border-gray-200 hover:bg-slate-50 active:scale-98 text-gray-800 font-bold py-3 px-4 rounded-lg text-xs transition-all cursor-pointer flex items-center justify-center space-x-2.5 font-sans shadow-sm"
        >
          {/* Custom Multi-color Google SVG indicator */}
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
              fill="#FBBC05"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span className="font-semibold text-gray-700">Continue with Google</span>
        </button>

        <div className="mt-6 flex flex-wrap justify-between text-[11px] text-gray-400 font-sans border-t border-gray-100 pt-4">
          <button
            onClick={onGoBackHome}
            className="hover:text-gray-600 font-semibold cursor-pointer border-none bg-transparent"
          >
            Cancel Sign In
          </button>
          <a
            href="https://developers.google.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#4285F4] font-semibold flex items-center gap-1"
          >
            GDG Global Wiki <Sparkles className="w-3 h-3 text-[#FBBC05] inline" />
          </a>
        </div>
      </div>
    </div>
  );
}
