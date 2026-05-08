"use client";

interface TagBadgeProps {
  label: string;
  colorClass?: string;
  variant?: "default" | "gold" | "outline";
}

export default function TagBadge({
  label,
  colorClass = "bg-slate-100 text-slate-600",
  variant = "default",
}: TagBadgeProps) {
  if (variant === "gold") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest"
        style={{
          background: "linear-gradient(135deg, #F0DFA0 0%, #C9A84C 60%, #A07828 100%)",
          color: "#3D2B00",
          letterSpacing: "0.12em",
        }}
      >
        ✦ {label}
      </span>
    );
  }

  if (variant === "outline") {
    return (
      <span
        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide border"
        style={{ borderColor: "#C9A84C", color: "#A07828", background: "#FDFBF5" }}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${colorClass}`}
    >
      {label}
    </span>
  );
}
