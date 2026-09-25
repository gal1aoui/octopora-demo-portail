import assert from "node:assert/strict";
import { test } from "node:test";
import { daysUntil, dueReminders, reminderMessage } from "./payment-reminder.js";

const echeance = { id: 1, numero: "AUTO-2024-0187", date: "2025-04-15", montant: 180, paye: false };

test("l'écart en jours se calcule sur des dates ISO", () => {
  assert.equal(daysUntil("2025-04-15", "2025-04-08"), 7);
  assert.equal(daysUntil("2025-03-02", "2025-02-23"), 7);
});

test("une échéance à sept jours déclenche un rappel", () => {
  assert.deepEqual(dueReminders([echeance], "2025-04-08"), [echeance]);
});

test("pas de rappel trop tôt, trop tard, déjà envoyé ou déjà payé", () => {
  assert.deepEqual(dueReminders([echeance], "2025-04-07"), []);
  assert.deepEqual(dueReminders([echeance], "2025-04-09"), []);
  assert.deepEqual(dueReminders([echeance], "2025-04-08", new Set([1])), []);
  assert.deepEqual(dueReminders([{ ...echeance, paye: true }], "2025-04-08"), []);
});

test("le message donne le montant et la date au format jj/mm/aaaa", () => {
  assert.equal(
    reminderMessage(echeance),
    "Votre cotisation de 180,000 DT (contrat AUTO-2024-0187) arrive à échéance le 15/04/2025."
  );
});

test("une date invalide renvoie une erreur claire", () => {
  assert.throws(() => daysUntil("15/04/2025", "2025-04-08"), /Date d'échéance invalide/);
});
