"use client";

import { FormEvent, useRef } from "react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export default function SearchBar({ onSearch, loading = false }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const value = inputRef.current?.value.trim() ?? "";
    if (value) onSearch(value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-xl gap-3">
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        placeholder="輸入房號，例如：9100"
        className="flex-1 rounded-full border border-white/30 bg-white/15 backdrop-blur-sm px-6 py-4 text-base text-white placeholder-white/50 transition-all duration-300"
        autoComplete="off"
        maxLength={6}
        style={{ fontFamily: "'Noto Sans TC', sans-serif" }}
      />
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(201,168,76,0.45)" }}
        whileTap={{ scale: 0.97 }}
        className="w-full sm:w-auto rounded-full px-8 py-4 text-sm font-semibold tracking-widest text-[#0A1628] disabled:opacity-60 transition-all duration-200"
        style={{
          background: "linear-gradient(135deg, #F0DFA0 0%, #C9A84C 50%, #A07828 100%)",
          fontFamily: "'Noto Sans TC', sans-serif",
          letterSpacing: "0.15em",
        }}
      >
        {loading ? "查詢中…" : "查　詢"}
      </motion.button>
    </form>
  );
}
