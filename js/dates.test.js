import assert from "node:assert/strict";
import { test } from "node:test";
import { formatDate } from "./dates.js";

test("affiche le jour avant le mois", () => {
  assert.equal(formatDate("2024-03-01"), "01/03/2024");
});

test("affiche la date de Tunis pour un horodatage UTC de fin de journée", () => {
  // 23 h 30 UTC le 31 décembre, c'est déjà le 1er janvier à Tunis.
  assert.equal(formatDate("2024-12-31T23:30:00Z"), "01/01/2025");
});
