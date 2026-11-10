import assert from "node:assert/strict";
import { test } from "node:test";
import { canContinue, STEPS } from "../claim-form.js";

const faits = { date: "2025-04-01", type: "accident", description: "Collision à un carrefour, pare-chocs avant endommagé." };

test("la déclaration garde ses trois étapes dans l'ordre", () => {
  assert.deepEqual(STEPS, ["faits", "photos", "confirmation"]);
});

test("les faits : date, type et 20 caractères de description sont obligatoires", () => {
  assert.equal(canContinue("faits", faits), true);
  assert.equal(canContinue("faits", { ...faits, description: "" }), false);
  assert.equal(canContinue("faits", { ...faits, description: "trop court" }), false);
  assert.equal(canContinue("faits", { ...faits, date: "" }), false);
  assert.equal(canContinue("faits", { ...faits, type: "" }), false);
});

test("les photos sont facultatives", () => {
  assert.equal(canContinue("photos", {}), true);
});

test("la confirmation exige la case de certification", () => {
  assert.equal(canContinue("confirmation", {}), false);
  assert.equal(canContinue("confirmation", { certifie: "on" }), true);
});
