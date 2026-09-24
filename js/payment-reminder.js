import { formatDate } from "./dates.js";

// Rappel automatique : l'assuré est prévenu sept jours avant chaque échéance non réglée.
export const REMINDER_DAYS = 7;

function dayNumber(isoDate) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate ?? "");
  if (!match) {
    throw new Error(`Date d'échéance invalide : ${isoDate}`);
  }
  return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])) / 86400000;
}

export function daysUntil(dueDate, today) {
  return dayNumber(dueDate) - dayNumber(today);
}

// `sent` contient les identifiants d'échéance déjà prévenus : un rappel ne part qu'une fois.
export function dueReminders(echeances, today, sent = new Set()) {
  return echeances.filter(
    (echeance) => !echeance.paye && !sent.has(echeance.id) && daysUntil(echeance.date, today) === REMINDER_DAYS
  );
}

export function reminderMessage(echeance) {
  const montant = echeance.montant.toFixed(3).replace(".", ",");
  return `Votre cotisation de ${montant} DT (contrat ${echeance.numero}) arrive à échéance le ${formatDate(echeance.date)}.`;
}
