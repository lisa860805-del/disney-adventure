import type { Room } from "@/types/room";

export function findRoom(rooms: Room[], query: string): Room | null {
  const normalized = query.trim();
  return rooms.find((r) => r.stateroom === normalized) ?? null;
}

export const THEME_COLORS: Record<string, string> = {
  FROZEN: "bg-blue-100 text-blue-800",
  MOANA: "bg-orange-100 text-orange-800",
  ENCANTO: "bg-purple-100 text-purple-800",
  MARVEL: "bg-red-100 text-red-800",
  IRONMAN: "bg-red-200 text-red-900",
  SPIDERMAN: "bg-red-100 text-red-800",
  THOR: "bg-yellow-100 text-yellow-800",
  ALADDIN: "bg-amber-100 text-amber-800",
  "FINDING NEMO": "bg-cyan-100 text-cyan-800",
  "LITTLE MERMAID": "bg-teal-100 text-teal-800",
  "LION KING": "bg-yellow-200 text-yellow-900",
  UP: "bg-green-100 text-green-800",
  "ANNA SUITE": "bg-sky-100 text-sky-800",
  "ELSA SUITE": "bg-indigo-100 text-indigo-800",
  JASMIN: "bg-violet-100 text-violet-800",
};

export const THEME_LABELS: Record<string, string> = {
  FROZEN: "冰雪奇緣",
  MOANA: "海洋奇緣",
  ENCANTO: "魔法滿屋",
  MARVEL: "漫威",
  IRONMAN: "鋼鐵人",
  SPIDERMAN: "蜘蛛人",
  THOR: "雷神索爾",
  ALADDIN: "阿拉丁",
  "FINDING NEMO": "海底總動員",
  "LITTLE MERMAID": "小美人魚",
  "LION KING": "獅子王",
  UP: "天外奇蹟",
  "ANNA SUITE": "安娜套房",
  "ELSA SUITE": "艾莎套房",
  JASMIN: "茉莉",
};
