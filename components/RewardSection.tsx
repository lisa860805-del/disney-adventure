"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ─── Data ──────────────────────────────────────────────── */
const TIERS = [
  {
    id: "starter",
    label: "入門首選",
    labelEn: "STARTER",
    accent: "#4CAF7D",
    accentBg: "rgba(76,175,125,0.10)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.02 12.02.708.707M1 12h2m18 0h2M4.927 19.073l.707-.707M18.364 5.636l.707-.707M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z" />
      </svg>
    ),
    rows: [
      { range: "$1,000 – $1,999", credit: "$50" },
      { range: "$2,000 – $2,999", credit: "$100" },
      { range: "$3,000 – $3,999", credit: "$150" },
    ],
  },
  {
    id: "popular",
    label: "熱門推薦",
    labelEn: "POPULAR",
    accent: "#4B8FD5",
    accentBg: "rgba(75,143,213,0.10)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
      </svg>
    ),
    rows: [
      { range: "$4,000 – $4,999", credit: "$200" },
      { range: "$5,000 – $5,999", credit: "$250" },
      { range: "$6,000 – $6,999", credit: "$300" },
      { range: "$7,000 – $7,999", credit: "$350" },
      { range: "$8,000 – $8,999", credit: "$400" },
      { range: "$9,000 – $9,999", credit: "$450" },
    ],
  },
  {
    id: "premium",
    label: "尊榮升級",
    labelEn: "PREMIUM",
    accent: "#9B6DD5",
    accentBg: "rgba(155,109,213,0.10)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
      </svg>
    ),
    rows: [
      { range: "$10,000 – $10,999", credit: "$500" },
      { range: "$11,000 – $11,999", credit: "$550" },
      { range: "$12,000 – $12,999", credit: "$600" },
      { range: "$13,000 – $13,999", credit: "$650" },
      { range: "$14,000 – $14,999", credit: "$700" },
      { range: "$15,000 – $15,999", credit: "$750" },
      { range: "$16,000 – $16,999", credit: "$800" },
      { range: "$17,000 – $17,999", credit: "$850" },
      { range: "$18,000 – $18,999", credit: "$900" },
      { range: "$19,000 – $19,999", credit: "$950" },
    ],
  },
  {
    id: "elite",
    label: "頂級體驗",
    labelEn: "ELITE",
    accent: "#C9A84C",
    accentBg: "rgba(201,168,76,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    rows: [
      { range: "$20,000 以上", credit: "$1,000" },
    ],
  },
] as const;

/* ─── Sparkle decoration ─────────────────────────────────── */
const SPARKLES = [
  { x: "8%",  y: "12%", size: 14, delay: 0    },
  { x: "92%", y: "8%",  size: 10, delay: 0.4  },
  { x: "5%",  y: "55%", size: 8,  delay: 0.8  },
  { x: "95%", y: "45%", size: 12, delay: 0.2  },
  { x: "50%", y: "5%",  size: 9,  delay: 1.0  },
  { x: "88%", y: "78%", size: 7,  delay: 0.6  },
  { x: "15%", y: "88%", size: 11, delay: 1.2  },
];

function Sparkle({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
      transition={{ duration: 3, delay, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
    >
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path
          d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z"
          fill="#C9A84C"
          opacity="0.7"
        />
      </svg>
    </motion.div>
  );
}

/* ─── Tier card ──────────────────────────────────────────── */
function TierCard({
  tier,
  index,
}: {
  tier: (typeof TIERS)[number];
  index: number;
}) {
  const isElite = tier.id === "elite";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: isElite
          ? "linear-gradient(135deg, rgba(201,168,76,0.18) 0%, rgba(160,120,40,0.10) 100%)"
          : "rgba(255,255,255,0.04)",
        border: isElite
          ? "1px solid rgba(201,168,76,0.45)"
          : `1px solid ${tier.accent}33`,
        backdropFilter: "blur(12px)",
        boxShadow: isElite
          ? "0 0 40px rgba(201,168,76,0.12), 0 8px 32px rgba(0,0,0,0.3)"
          : "0 4px 24px rgba(0,0,0,0.25)",
      }}
    >
      {/* Tier header */}
      <div
        className="flex items-center gap-3 px-5 py-3.5"
        style={{
          background: isElite
            ? "linear-gradient(90deg, rgba(201,168,76,0.22) 0%, rgba(201,168,76,0.06) 100%)"
            : tier.accentBg,
          borderBottom: `1px solid ${tier.accent}28`,
        }}
      >
        <span style={{ color: tier.accent }}>{tier.icon}</span>
        <span
          className="font-semibold tracking-wide text-sm"
          style={{ color: tier.accent, fontFamily: "'Noto Sans TC', sans-serif" }}
        >
          {tier.label}
        </span>
        <span
          className="ml-auto text-xs tracking-[0.2em] opacity-50"
          style={{ color: tier.accent, fontFamily: "system-ui" }}
        >
          {tier.labelEn}
        </span>
      </div>

      {/* Rows */}
      <div>
        {tier.rows.map((row, i) => (
          <motion.div
            key={row.range}
            whileHover={{
              backgroundColor: "rgba(201,168,76,0.07)",
              x: 2,
            }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-between px-5 py-3.5 cursor-default"
            style={{
              borderBottom:
                i < tier.rows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}
          >
            <span
              className="text-sm font-light tracking-wide"
              style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Noto Sans TC', sans-serif" }}
            >
              {row.range}
            </span>

            <div className="flex items-center gap-2">
              <span style={{ color: "#C9A84C", fontSize: 13, opacity: 0.7 }}>🎁</span>
              <span
                className="font-bold tabular-nums"
                style={{
                  color: isElite ? "#F5E290" : "#C9A84C",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: isElite ? "1.35rem" : "1.05rem",
                  textShadow: isElite ? "0 0 20px rgba(201,168,76,0.5)" : "none",
                  letterSpacing: "0.02em",
                }}
              >
                {row.credit}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main Section ───────────────────────────────────────── */
export default function RewardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #070F1E 0%, #0C1830 60%, #101E38 100%)",
      }}
    >
      {/* Sparkles */}
      {SPARKLES.map((s, i) => (
        <Sparkle key={i} {...s} />
      ))}

      {/* Top gradient transition from cream */}
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #FAFAF7, transparent)" }}
      />

      {/* Radial glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-20">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          {/* Certified badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{
              background: "rgba(201,168,76,0.12)",
              border: "1px solid rgba(201,168,76,0.35)",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="#C9A84C" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
            <span
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: "#C9A84C", fontFamily: "'Noto Sans TC', sans-serif" }}
            >
              官方認證 Disney Cruise 顧問協助預訂
            </span>
          </div>

          {/* Gold ornament */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }} />
            <span style={{ color: "#C9A84C", fontSize: 11 }}>✦</span>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #C9A84C)" }} />
          </div>

          {/* Title */}
          <h2
            className="mb-4 leading-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
              fontWeight: 500,
              color: "#FFFFFF",
            }}
          >
            迪士尼郵輪
            <br />
            <span style={{ color: "#C9A84C", fontStyle: "italic" }}>
              船上消費額度回饋
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="mx-auto font-light leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)",
              maxWidth: 400,
              letterSpacing: "0.03em",
            }}
          >
            透過官方認證旅遊顧問預訂，
            <br />
            最高贈送{" "}
            <span style={{ color: "#C9A84C", fontWeight: 600 }}>USD $1,000</span>{" "}
            船上消費額度
          </p>

          {/* Usage note */}
          <p
            className="mt-3 text-xs tracking-widest"
            style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'Noto Sans TC', sans-serif" }}
          >
            可用於餐飲・SPA・活動・購物等
          </p>
        </motion.div>

        {/* ── Column headers ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-between px-5 mb-3"
        >
          <span
            className="text-xs tracking-[0.18em] uppercase"
            style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Noto Sans TC', sans-serif" }}
          >
            郵輪金額（USD）
          </span>
          <span
            className="text-xs tracking-[0.18em] uppercase"
            style={{ color: "rgba(201,168,76,0.5)", fontFamily: "'Noto Sans TC', sans-serif" }}
          >
            船上消費額度（USD）
          </span>
        </motion.div>

        {/* ── Tier cards ── */}
        <div className="flex flex-col gap-4 mb-14">
          {TIERS.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center gap-5"
        >
          <p
            className="text-sm font-light"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Noto Sans TC', sans-serif", letterSpacing: "0.05em" }}
          >
            額度依實際訂單金額計算，詳情請洽顧問確認
          </p>

          <motion.a
            href="https://lin.ee/ohR5MNm"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 50px rgba(201,168,76,0.4), 0 16px 48px rgba(201,168,76,0.25)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-full sm:w-auto flex flex-col items-center justify-center gap-1.5 rounded-2xl px-12 py-5 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #F5E6A3 0%, #C9A84C 45%, #96720E 100%)",
              boxShadow: "0 0 28px rgba(201,168,76,0.22), 0 8px 32px rgba(0,0,0,0.35)",
              minWidth: "min(100%, 360px)",
              textDecoration: "none",
            }}
          >
            <span
              className="font-semibold tracking-wide"
              style={{
                color: "#1A1000",
                fontFamily: "'Noto Sans TC', sans-serif",
                fontSize: "clamp(1rem, 4vw, 1.1rem)",
                letterSpacing: "0.07em",
              }}
            >
              立即諮詢 Disney Concierge 優惠
            </span>
            <span
              className="text-xs font-medium"
              style={{ color: "#5C3D00", fontFamily: "'Noto Sans TC', sans-serif", opacity: 0.8 }}
            >
              LINE 官方帳號・即時回覆
            </span>
          </motion.a>

          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Noto Sans TC', sans-serif" }}
          >
            點擊後將以新分頁開啟 LINE 官方帳號
          </p>
        </motion.div>
      </div>

      {/* Bottom gradient transition to cream */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to top, #FAFAF7, transparent)" }}
      />
    </section>
  );
}
