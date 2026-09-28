import assert from "node:assert/strict";
import { test } from "node:test";
import { journalEntry, luhnValid, strongAuthRequired, validateCardPayment } from "./card-payment.js";

const now = new Date("2025-04-10T09:00:00Z");

test("le contrôle de Luhn accepte une carte de test et refuse un chiffre faux", () => {
  assert.equal(luhnValid("4242 4242 4242 4242"), true);
  assert.equal(luhnValid("4242 4242 4242 4241"), false);
});

test("une carte valide et un montant positif ne donnent aucune erreur", () => {
  assert.deepEqual(validateCardPayment({ number: "4242424242424242", expiry: "12/27", amount: 180 }, now), []);
});

test("une carte expirée le mois dernier est refusée", () => {
  const errors = validateCardPayment({ number: "4242424242424242", expiry: "03/25", amount: 180 }, now);
  assert.deepEqual(errors, ["Cette carte est expirée."]);
});

test("l'authentification forte est demandée sauf petit montant sur appareil connu", () => {
  assert.equal(strongAuthRequired(180, true), true);
  assert.equal(strongAuthRequired(20, false), true);
  assert.equal(strongAuthRequired(20, true), false);
});

test("le journal ne garde que la fin du numéro de carte", () => {
  const entry = journalEntry({ reference: "PAY-1", step: "debit", amount: 180, number: "4242 4242 4242 4242" }, () => 0);
  assert.equal(entry.cardEnd, "4242");
  assert.equal(JSON.stringify(entry).includes("4242424242424242"), false);
});
