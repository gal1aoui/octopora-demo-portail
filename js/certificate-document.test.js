import assert from "node:assert/strict";
import { test } from "node:test";
import { buildCertificateLines } from "./certificate-document.js";
import { CONTRACTS } from "./sample-data.js";

const holder = { prenom: "Karim", nom: "Ben Salah" };
const NOW = Date.parse("2025-01-10T10:00:00Z");

test("reprend le numéro, l'assuré et la date de début", () => {
  const lines = buildCertificateLines(CONTRACTS[0], holder, NOW);
  assert.ok(lines.includes("Assuré : Karim Ben Salah"));
  assert.ok(lines.includes("En vigueur depuis le 01/03/2024"));
});

test("date la délivrance à l'heure de Tunis", () => {
  // 23 h 30 UTC, c'est déjà le lendemain à Tunis.
  const lines = buildCertificateLines(CONTRACTS[0], holder, Date.parse("2025-01-10T23:30:00Z"));
  assert.equal(lines.at(-1), "Délivrée le 11/01/2025");
});

test("refuse un contrat résilié", () => {
  assert.throws(() => buildCertificateLines(CONTRACTS[2], holder, NOW), /contrat actif/);
});
