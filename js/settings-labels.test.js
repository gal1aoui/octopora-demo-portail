import assert from "node:assert/strict";
import { test } from "node:test";
import { label, missingLabels, SETTINGS_LABELS_FR } from "./settings-labels.js";

const PAGE_KEYS = ["profile", "notifications", "language", "security", "twoFactor", "signOut", "deleteAccount", "save"];

test("bug PORTAIL-71 : toutes les clés de la page Paramètres ont un libellé français", () => {
  assert.deepEqual(missingLabels(PAGE_KEYS), []);
});

test("une clé sans libellé est signalée", () => {
  assert.deepEqual(missingLabels(["profile", "darkMode"]), ["darkMode"]);
});

test("aucun libellé ne reste en anglais", () => {
  const english = ["Sign out", "Save", "Language", "Security", "Delete account", "Profile"];
  for (const value of Object.values(SETTINGS_LABELS_FR)) {
    assert.equal(english.includes(value), false, `${value} est en anglais`);
  }
  assert.equal(label("signOut"), "Se déconnecter");
});
