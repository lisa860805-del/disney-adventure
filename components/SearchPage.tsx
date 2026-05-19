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
          /* 手機 ~72svh 讓下方區塊微微露出；桌機 80svh 維持氣勢 */
          minHeight: state === "idle" ? "min(72svh, 820px)" : "260px",
          transition: "min-height 0.7s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 500, height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
            top: -160, right: -120,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 320, height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
            bottom: -80, left: -60,
          }}
        />

        {/* Top logo bar — 縮短上方空白 */}
        <div className="relative z-10 flex justify-center pt-8 sm:pt-12 pb-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div
              className="w-px h-4"
              style={{ background: "linear-gradient(to bottom, transparent, #C9A84C)" }}
            />
            <span
              className="text-xs tracking-[0.35em] uppercase"
              style={{ color: "#C9A84C", fontFamily: "'Noto Sans TC', sans-serif", opacity: 0.9 }}
            >
              Disney Cruise Line
            </span>
            <div
              className="w-px h-4"
              style={{ background: "linear-gradient(to bottom, transparent, #C9A84C)" }}
            />
          </motion.div>
        </div>

        {/* Hero content — 上下 padding 大幅縮小 */}
        <div
          className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
          style={{
            paddingTop: state === "idle" ? "5vh" : "20px",
            paddingBottom: state === "idle" ? "4vh" : "36px",
            transition: "padding 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* Gold ornament — 更緊湊 */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-10" style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }} />
            <span style={{ color: "#C9A84C", fontSize: 11 }}>✦</span>
            <div className="h-px w-10" style={{ background: "linear-gradient(to left, transparent, #C9A84C)" }} />
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif mb-3 leading-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
              fontWeight: 500,
              color: "#FFFFFF",
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            Disney Adventure
            <br />
            <span style={{ color: "#C9A84C", fontStyle: "italic" }}>房型查詢</span>
          </motion.h1>

          {/* Subtitle — 縮短下方 margin */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mb-7 font-light"
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "clamp(0.82rem, 2vw, 0.95rem)",
              letterSpacing: "0.04em",
              fontFamily: "'Noto Sans TC', sans-serif",
              maxWidth: 380,
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

          {/* Hint text */}
          {state === "idle" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 text-xs tracking-widest"
              style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'Noto Sans TC', sans-serif" }}
            >
              輸入客艙房號即可查詢
            </motion.p>
          )}
        </div>

        {/* ── Scroll hint — 只在 idle 顯示 ── */}
        <AnimatePresence>
          {state === "idle" && (
            <motion.div
              key="scroll-hint"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute bottom-10 left-0 right-0 z-10 flex flex-col items-center gap-1.5 pointer-events-none"
            >
              <span
                className="text-xs tracking-[0.22em] uppercase"
                style={{ color: "rgba(201,168,76,0.5)", fontFamily: "'Noto Sans TC', sans-serif" }}
              >
                Scroll to explore
              </span>
              {/* Bouncing chevron */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg
                  width="20" height="12"
                  viewBox="0 0 20 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L10 10L19 1"
                    stroke="#C9A84C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.5"
                  />
                  <path
                    d="M1 5L10 14L19 5"
                    stroke="#C9A84C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.25"
                  />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom wave — 高度縮小 */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: 28 }}
          >
            <path d="M0 28 C360 0 1080 0 1440 28 L1440 28 L0 28Z" fill="#FAFAF7" />
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
