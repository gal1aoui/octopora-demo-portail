import assert from "node:assert/strict";
import { test } from "node:test";
import { missingFacts, nextButtonDisabled } from "./claim-step-validation.js";

const TODAY = "2025-01-10";
const valid = { date: "2025-01-08", type: "vol", description: "Mon véhicule a disparu du parking cette nuit." };

test("un formulaire complet laisse passer", () => {
  assert.equal(nextButtonDisabled(valid, TODAY), false);
});

test("PORTAIL-24 : le bouton Suivant reste bloqué quand la date est vide", () => {
  assert.deepEqual(missingFacts({ ...valid, date: "" }, TODAY), ["date"]);
  assert.equal(nextButtonDisabled({ ...valid, date: "   " }, TODAY), true);
});

test("refuse une date dans le futur", () => {
  assert.deepEqual(missingFacts({ ...valid, date: "2025-02-01" }, TODAY), ["date"]);
});

test("liste tous les champs manquants", () => {
  assert.deepEqual(missingFacts({}, TODAY), ["date", "type", "description"]);
});
