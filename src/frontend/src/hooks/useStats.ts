export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const DEFAULT_STATS: Stat[] = [
  { value: 120, suffix: "+", label: "Projects Completed" },
  { value: 12, suffix: "", label: "Years of Practice" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 4, suffix: "", label: "Design Awards" },
];

const STORAGE_KEY = "d2u_stats";

export function getStats(): Stat[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw) as Stat[];
    if (Array.isArray(parsed) && parsed.length === 4) return parsed;
    return DEFAULT_STATS;
  } catch {
    return DEFAULT_STATS;
  }
}

export function saveStats(stats: Stat[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function useStats() {
  return getStats();
}
