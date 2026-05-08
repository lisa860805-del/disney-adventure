"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Room } from "@/types/room";
import { findRoom } from "@/lib/roomUtils";
import SearchBar from "./SearchBar";
import RoomCard from "./RoomCard";

type SearchState = "idle" | "found" | "notfound";

export default function SearchPage() {
  const [state, setState] = useState<SearchState>("idle");
  const [result, setResult] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    setLoading(true);
    setState("idle");
    setResult(null);

    const res = await fetch("/rooms.json");
    const rooms: Room[] = await res.json();
    const room = findRoom(rooms, query);

    setLoading(false);
    if (room) {
      setResult(room);
      setState("found");
    } else {
      setState("notfound");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#FAFAF7" }}>
      {/* ── HERO ───────────────────────────────────────────────── */}
      <header
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #060E1C 0%, #0A1628 45%, #162340 100%)",
          minHeight: state === "idle" ? "100svh" : "340px",
          transition: "min-height 0.7s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 600, height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
            top: -200, right: -150,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 400, height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
            bottom: -100, left: -80,
          }}
        />

        {/* Top logo bar */}
        <div className="relative z-10 flex justify-center pt-10 pb-0">
          <div className="flex items-center gap-3">
            <div
              className="w-px h-5"
              style={{ background: "linear-gradient(to bottom, transparent, #C9A84C)" }}
            />
            <span
              className="text-xs tracking-[0.35em] uppercase"
              style={{ color: "#C9A84C", fontFamily: "'Noto Sans TC', sans-serif", opacity: 0.9 }}
            >
              Disney Cruise Line
            </span>
            <div
              className="w-px h-5"
              style={{ background: "linear-gradient(to bottom, transparent, #C9A84C)" }}
            />
          </div>
        </div>

        {/* Hero content */}
        <div
          className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
          style={{
            paddingTop: state === "idle" ? "12vh" : "32px",
            paddingBottom: state === "idle" ? "14vh" : "48px",
            transition: "padding 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* Gold ornament */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-3 mb-7"
          >
            <div className="h-px w-12" style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }} />
            <span style={{ color: "#C9A84C", fontSize: 12 }}>✦</span>
            <div className="h-px w-12" style={{ background: "linear-gradient(to left, transparent, #C9A84C)" }} />
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif mb-4 leading-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              fontWeight: 500,
              color: "#FFFFFF",
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            Disney Adventure
            <br />
            <span style={{ color: "#C9A84C", fontStyle: "italic" }}>房型查詢</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mb-10 font-light"
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "clamp(0.875rem, 2vw, 1rem)",
              letterSpacing: "0.04em",
              fontFamily: "'Noto Sans TC', sans-serif",
              maxWidth: 420,
            }}
          >
            快速查詢 Disney Adventure 房號、主題與入住資訊
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="w-full flex justify-center"
          >
            <SearchBar onSearch={handleSearch} loading={loading} />
          </motion.div>

          {/* Hint */}
          {state === "idle" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-5 text-xs tracking-widest"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Noto Sans TC', sans-serif" }}
            >
              輸入客艙房號即可查詢
            </motion.p>
          )}
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 48 }}>
            <path d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48Z" fill="#FAFAF7" />
          </svg>
        </div>
      </header>

      {/* ── RESULT ─────────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <AnimatePresence mode="wait">
          {state === "found" && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <RoomCard room={result} />
            </motion.div>
          )}

          {state === "notfound" && (
            <motion.div
              key="notfound"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{ background: "#F5EDE0", border: "1px solid #E8D9B8" }}
              >
                <span style={{ color: "#C9A84C", fontSize: 24 }}>✦</span>
              </div>
              <p
                className="text-xl font-semibold mb-2"
                style={{ color: "#0A1628", fontFamily: "'Playfair Display', serif" }}
              >
                查無此房號
              </p>
              <p
                className="text-sm font-light"
                style={{ color: "#9CA3AF", fontFamily: "'Noto Sans TC', sans-serif" }}
              >
                請確認房號後再試一次
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer
        className="py-8 text-center"
        style={{ borderTop: "1px solid #EDE8DF" }}
      >
        <p
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: "#C9A84C", fontFamily: "'Noto Sans TC', sans-serif", opacity: 0.7 }}
        >
          Disney Adventure &nbsp;✦&nbsp; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
