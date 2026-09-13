// Tableau des sinistres du conseiller : par priorité, puis du plus ancien au plus récent.
const PRIORITY_RANK = { haute: 0, normale: 1, basse: 2 };
const DAY_MS = 24 * 60 * 60 * 1000;

export function ageInDays(claim, now) {
  return Math.floor((now - Date.parse(claim.declare_le)) / DAY_MS);
}

export function sortClaims(claims) {
  return [...claims].sort(
    (a, b) => PRIORITY_RANK[a.priorite] - PRIORITY_RANK[b.priorite] || Date.parse(a.declare_le) - Date.parse(b.declare_le)
  );
}

export const SAMPLE_CLAIMS = [
  { numero: "SIN-2025-000412", assure: "Karim Ben Salah", priorite: "haute", declare_le: "2025-01-08T08:00:00Z" },
  { numero: "SIN-2025-000398", assure: "Nour Trabelsi", priorite: "normale", declare_le: "2025-01-02T10:00:00Z" },
  { numero: "SIN-2025-000421", assure: "Karim Ben Salah", priorite: "haute", declare_le: "2025-01-09T14:00:00Z" },
];

if (typeof document !== "undefined") {
  const body = document.getElementById("sinistres");
  body.innerHTML = sortClaims(SAMPLE_CLAIMS)
    .map((c) => `<tr><td>${c.numero}</td><td>${c.assure}</td><td>${c.priorite}</td><td>${ageInDays(c, Date.now())} j</td></tr>`)
    .join("");
}
