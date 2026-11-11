import assert from "node:assert/strict";
import { test } from "node:test";
import { loadStep, nextStep, previousStep, saveStep } from "./onboarding.js";

function memoryStorage(initial = {}) {
  const items = new Map(Object.entries(initial));
  return {
    getItem: (key) => (items.has(key) ? items.get(key) : null),
    setItem: (key, value) => items.set(key, String(value)),
  };
}

test("reprend à l'étape enregistrée", () => {
  const storage = memoryStorage();
  saveStep(storage, 2);
  assert.equal(loadStep(storage, 3), 2);
});

test("revient au début quand l'étape enregistrée n'existe plus", () => {
  assert.equal(loadStep(memoryStorage({ "accueil:etape": "7" }), 3), 0);
  assert.equal(loadStep(memoryStorage({ "accueil:etape": "abc" }), 3), 0);
});

test("ne dépasse ni le premier ni le dernier écran", () => {
  assert.equal(nextStep(2, 3), 2);
  assert.equal(previousStep(0), 0);
});
