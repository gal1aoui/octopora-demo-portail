import assert from "node:assert/strict";
import { test } from "node:test";
import { STEPS, canContinue } from "../claim-form.js";

const facts = { date: "2025-01-08", type: "accident", description: "Collision à un carrefour, aile avant enfoncée." };

test("S1 : les trois étapes sont dans l'ordre faits, photos, confirmation", () => {
  assert.deepEqual(STEPS, ["faits", "photos", "confirmation"]);
});

test("S2 : une date vide bloque l'étape des faits", () => {
  assert.equal(canContinue("faits", { ...facts, date: "" }), false);
});

test("S3 : une description de moins de 20 caractères bloque l'étape des faits", () => {
  assert.equal(canContinue("faits", { ...facts, description: "trop court" }), false);
});

test("S4 : l'étape des photos se passe sans fichier", () => {
  assert.equal(canContinue("photos", {}), true);
});

test("S5 : sans certification, l'envoi est refusé", () => {
  assert.equal(canContinue("confirmation", {}), false);
  assert.equal(canContinue("confirmation", { certifie: "on" }), true);
});
