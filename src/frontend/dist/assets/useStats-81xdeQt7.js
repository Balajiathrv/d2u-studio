const DEFAULT_STATS = [
  { value: 120, suffix: "+", label: "Projects Completed" },
  { value: 12, suffix: "", label: "Years of Practice" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 4, suffix: "", label: "Design Awards" }
];
const STORAGE_KEY = "d2u_stats";
function getStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === 4) return parsed;
    return DEFAULT_STATS;
  } catch {
    return DEFAULT_STATS;
  }
}
function saveStats(stats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}
function useStats() {
  return getStats();
}
export {
  getStats as g,
  saveStats as s,
  useStats as u
};
