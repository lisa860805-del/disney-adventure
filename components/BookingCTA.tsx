"use client";

import { motion } from "framer-motion";

const LINE_ICON = (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 shrink-0"
    aria-hidden="true"
  >
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
  </svg>
);

export default function BookingCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto px-4 sm:px-6 pt-8 pb-14 sm:pt-10 sm:pb-20 flex flex-col items-center"
    >
      {/* Ornamental divider */}
      <div className="flex items-center gap-4 mb-8 w-full max-w-xs">
        <div
          className="flex-1 h-px"
          style={{ background: "linear-gradient(to right, transparent, #C9A84C44)" }}
        />
        <span style={{ color: "#C9A84C", fontSize: 10, opacity: 0.7 }}>✦</span>
        <div
          className="flex-1 h-px"
          style={{ background: "linear-gradient(to left, transparent, #C9A84C44)" }}
        />
      </div>

      {/* Trust label */}
      <p
        className="text-xs tracking-[0.2em] uppercase mb-5 text-center"
        style={{
          color: "#9CA3AF",
          fontFamily: "'Noto Sans TC', sans-serif",
          letterSpacing: "0.18em",
        }}
      >
        由官方認證旅遊顧問協助預訂
      </p>

      {/* CTA Button */}
      <motion.a
        href="https://lin.ee/ohR5MNm"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{
          scale: 1.03,
          boxShadow:
            "0 0 40px rgba(201,168,76,0.35), 0 16px 48px rgba(201,168,76,0.25), 0 4px 16px rgba(0,0,0,0.12)",
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-full sm:w-auto flex flex-col items-center justify-center gap-1.5 rounded-2xl px-10 py-5 cursor-pointer select-none"
        style={{
          background: "linear-gradient(135deg, #F5E6A3 0%, #C9A84C 45%, #96720E 100%)",
          boxShadow:
            "0 0 24px rgba(201,168,76,0.20), 0 8px 32px rgba(201,168,76,0.18), 0 2px 8px rgba(0,0,0,0.10)",
          minWidth: "min(100%, 340px)",
          textDecoration: "none",
        }}
      >
        {/* Top row: LINE icon + main text */}
        <span className="flex items-center gap-2.5">
          <span
            style={{
              color: "#3D2800",
              display: "flex",
              alignItems: "center",
            }}
          >
            {LINE_ICON}
          </span>
          <span
            className="font-semibold tracking-wide"
            style={{
              color: "#1A1000",
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: "clamp(1rem, 4vw, 1.125rem)",
              letterSpacing: "0.06em",
            }}
          >
            點此預訂迪士尼遊輪
          </span>
        </span>

        {/* Subtitle */}
        <span
          className="text-center font-medium"
          style={{
            color: "#5C3D00",
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: "clamp(0.7rem, 3vw, 0.8rem)",
            letterSpacing: "0.05em",
            opacity: 0.85,
          }}
        >
          最高贈送 1,000 美金船上消費額度
        </span>
      </motion.a>

      {/* Fine print */}
      <p
        className="mt-4 text-center"
        style={{
          color: "#C9C5BB",
          fontFamily: "'Noto Sans TC', sans-serif",
          fontSize: "0.68rem",
          letterSpacing: "0.05em",
        }}
      >
        點擊後將以新分頁開啟 LINE 官方帳號
      </p>
    </motion.section>
  );
}
