"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Room } from "@/types/room";
import TagBadge from "./TagBadge";
import { THEME_COLORS, THEME_LABELS } from "@/lib/roomUtils";

interface RoomCardProps {
  room: Room;
}

const DETAILS = (room: Room) => [
  { label: "房型", value: room.roomType },
  { label: "主題", value: THEME_LABELS[room.theme] ?? room.theme },
  { label: "樓層", value: `Deck ${room.deck}` },
  { label: "入住人數", value: `最多 ${room.occupancy} 人` },
  { label: "分類代號", value: room.category },
];

export default function RoomCard({ room }: RoomCardProps) {
  const themeLabel = THEME_LABELS[room.theme] ?? room.theme;
  const themeColor = THEME_COLORS[room.theme] ?? "bg-slate-100 text-slate-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto"
    >
      <div
        className="rounded-3xl overflow-hidden"
        style={{
          background: "#FFFFFF",
          boxShadow: "0 4px 6px rgba(10,22,40,0.04), 0 20px 60px rgba(10,22,40,0.10), 0 0 0 1px rgba(201,168,76,0.12)",
        }}
      >
        {/* Image */}
        {room.image && (
          <motion.div
            className="relative w-full overflow-hidden"
            style={{ height: "280px", background: "#F5F0E8" }}
            whileHover="hover"
          >
            <motion.div
              className="absolute inset-0"
              variants={{ hover: { scale: 1.04 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image
                src={`/images/${room.image}`}
                alt={`${room.roomType} 平面圖`}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
              />
            </motion.div>
            {/* Bottom fade */}
            <div
              className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(255,255,255,0.9), transparent)" }}
            />
          </motion.div>
        )}

        {/* Body */}
        <div className="px-8 py-8 sm:px-10 sm:py-9">
          {/* Top badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {room.isConcierge && <TagBadge label="CONCIERGE" variant="gold" />}
            <TagBadge label={themeLabel} colorClass={themeColor} />
          </div>

          {/* Room number + type */}
          <div className="mb-1">
            <p
              className="text-xs tracking-[0.25em] uppercase mb-2"
              style={{ color: "#C9A84C", fontFamily: "'Noto Sans TC', sans-serif" }}
            >
              Disney Adventure
            </p>
            <h2
              className="font-serif text-4xl sm:text-5xl font-semibold leading-none mb-2"
              style={{ color: "#0A1628", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {room.stateroom}
            </h2>
            <p
              className="text-base font-light tracking-wide"
              style={{ color: "#6B7280", fontFamily: "'Noto Sans TC', sans-serif" }}
            >
              {room.roomType}
            </p>
          </div>

          {/* Gold divider */}
          <div className="flex items-center gap-3 my-7">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, #C9A84C22, #C9A84C)" }} />
            <span style={{ color: "#C9A84C", fontSize: "10px" }}>✦</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, #C9A84C22, #C9A84C)" }} />
          </div>

          {/* Detail rows */}
          <div className="space-y-0 rounded-2xl overflow-hidden" style={{ border: "1px solid #F0E8D4" }}>
            {DETAILS(room).map(({ label, value }, i) => (
              <div
                key={label}
                className="flex items-center justify-between px-5 py-4"
                style={{
                  background: i % 2 === 0 ? "#FDFBF6" : "#FFFFFF",
                  borderBottom: i < DETAILS(room).length - 1 ? "1px solid #F0E8D4" : "none",
                }}
              >
                <span
                  className="text-sm font-medium tracking-wide"
                  style={{ color: "#9CA3AF", fontFamily: "'Noto Sans TC', sans-serif" }}
                >
                  {label}
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#1A1A2E", fontFamily: "'Noto Sans TC', sans-serif" }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
