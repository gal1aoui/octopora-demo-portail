import { formatDate } from "./dates.js";

// Reçu de paiement : le numéro suit l'année du paiement et un compteur annuel.
export function receiptNumber({ paidOn, sequence }) {
  return `REC-${paidOn.slice(0, 4)}-${String(sequence).padStart(5, "0")}`;
}

export function receiptFileName(payment) {
  return `recu-${receiptNumber(payment)}.pdf`;
}

export function formatAmount(amount) {
  return `${amount.toFixed(3).replace(".", ",")} DT`;
}

// Les lignes envoyées au générateur de PDF de l'API.
export function receiptLines(payment) {
  return [
    `Reçu n° ${receiptNumber(payment)}`,
    `Contrat : ${payment.contractNumber}`,
    `Payé le : ${formatDate(payment.paidOn)}`,
    `Montant : ${formatAmount(payment.amount)}`,
    `Référence du paiement : ${payment.reference}`,
  ];
}
