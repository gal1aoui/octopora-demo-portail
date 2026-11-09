import assert from "node:assert/strict";
import { test } from "node:test";
import { clearDraft, restoreDraft, saveDraft } from "./claim-form.js";
import { bannerState } from "./connection-banner.js";

function memoryStorage() {
  const items = new Map();
  return {
    getItem: (key) => (items.has(key) ? items.get(key) : null),
    setItem: (key, value) => items.set(key, String(value)),
    removeItem: (key) => items.delete(key),
  };
}

test("le bandeau apparaît quand la connexion est perdue", () => {
  const state = bannerState({ online: false, wasOffline: false });
  assert.equal(state.visible, true);
  assert.equal(state.tone, "warning");
});

test("le bandeau annonce le retour de la connexion", () => {
  const state = bannerState({ online: true, wasOffline: true });
  assert.deepEqual([state.visible, state.message], [true, "Connexion rétablie."]);
});

test("le bandeau reste caché tant que la connexion tient", () => {
  assert.equal(bannerState({ online: true, wasOffline: false }).visible, false);
});

test("la saisie en cours est restaurée après une coupure", () => {
  const storage = memoryStorage();
  const values = { type: "vol", description: "Vélo volé devant la résidence, cadenas coupé." };
  saveDraft(storage, values);
  assert.deepEqual(restoreDraft(storage), values);
  clearDraft(storage);
  assert.deepEqual(restoreDraft(storage), {});
});
