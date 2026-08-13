// Renouvellement en ligne : possible dans les 60 jours qui précèdent l'échéance d'un contrat actif.
export const RENEWAL_WINDOW_DAYS = 60;
const DAY_MS = 24 * 60 * 60 * 1000;

export function daysUntilEnd(contract, now) {
  return Math.ceil((Date.parse(contract.fin) - now) / DAY_MS);
}

export function canRenew(contract, now) {
  if (contract.statut !== "actif" || !contract.fin) return false;
  const days = daysUntilEnd(contract, now);
  return days >= 0 && days <= RENEWAL_WINDOW_DAYS;
}

export function renewedEndDate(contract) {
  const end = new Date(contract.fin);
  end.setUTCFullYear(end.getUTCFullYear() + 1);
  return end.toISOString().slice(0, 10);
}
