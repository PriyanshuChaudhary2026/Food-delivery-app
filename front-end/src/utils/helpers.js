export const CUISINE_CONFIG = {
  Indian: { emoji: "🍛", bg: "linear-gradient(135deg,#1a0a00,#3d1c00)" },
  American: { emoji: "🍔", bg: "linear-gradient(135deg,#0a0a1a,#1a1a3d)" },
  Chinese: { emoji: "🥡", bg: "linear-gradient(135deg,#1a0a0a,#3d0000)" },
  Italian: { emoji: "🍕", bg: "linear-gradient(135deg,#0a1a0a,#003d00)" },
  Japanese: { emoji: "🍱", bg: "linear-gradient(135deg,#0a0a1a,#00003d)" },
  Mexican: { emoji: "🌮", bg: "linear-gradient(135deg,#1a1000,#3d2800)" },
  default: { emoji: "🍽️", bg: "linear-gradient(135deg,#1a1a1a,#2d2d2d)" },
};

export function getCuisineConfig(type) {
  return CUISINE_CONFIG[type] || CUISINE_CONFIG.default;
}

export function getStatusBadge(status) {
  const map = {
    DELIVERED: "badge-delivered", PENDING: "badge-pending", PREPARING: "badge-preparing",
    OUT_FOR_DELIVERY: "badge-out", ON_THE_WAY: "badge-out",
    SUCCESS: "badge-success", FAILED: "badge-failed",
  };
  return map[status] || "badge-pending";
}

export function getOrderSteps(status) {
  const steps = ["Placed", "Confirmed", "Preparing", "Out for Delivery", "Delivered"];
  const idx = { PLACED: 0, CONFIRMED: 1, PREPARING: 2, OUT_FOR_DELIVERY: 3, DELIVERED: 4 }[status] ?? 0;
  return steps.map((s, i) => ({ label: s, done: i < idx, active: i === idx }));
}