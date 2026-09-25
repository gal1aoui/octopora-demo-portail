import assert from "node:assert/strict";
import { test } from "node:test";
import { formatAmount, receiptFileName, receiptLines, receiptNumber } from "./payment-receipt.js";

const payment = { paidOn: "2025-04-15", sequence: 42, contractNumber: "AUTO-2024-0187", amount: 180, reference: "PAY-1-2025-04-15" };

test("le numéro de reçu porte l'année et un compteur sur cinq chiffres", () => {
  assert.equal(receiptNumber(payment), "REC-2025-00042");
  assert.equal(receiptFileName(payment), "recu-REC-2025-00042.pdf");
});

test("un montant s'écrit avec trois décimales et la virgule", () => {
  assert.equal(formatAmount(180), "180,000 DT");
  assert.equal(formatAmount(49.5), "49,500 DT");
});

test("le reçu reprend le contrat, la date, le montant et la référence", () => {
  assert.deepEqual(receiptLines(payment), [
    "Reçu n° REC-2025-00042",
    "Contrat : AUTO-2024-0187",
    "Payé le : 15/04/2025",
    "Montant : 180,000 DT",
    "Référence du paiement : PAY-1-2025-04-15",
  ]);
});
