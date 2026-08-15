import assert from "node:assert/strict";
import { test } from "node:test";
import { canRenew, daysUntilEnd, renewedEndDate } from "./contract-renewal.js";

const NOW = Date.parse("2025-02-01T09:00:00Z");
const contract = { statut: "actif", fin: "2025-03-01" };

test("compte les jours restants avant l'échéance", () => {
  assert.equal(daysUntilEnd(contract, NOW), 28);
});

test("autorise le renouvellement à moins de 60 jours de l'échéance", () => {
  assert.equal(canRenew(contract, NOW), true);
});

test("refuse le renouvellement trop tôt", () => {
  assert.equal(canRenew({ ...contract, fin: "2025-09-01" }, NOW), false);
});

test("refuse le renouvellement d'un contrat résilié ou sans échéance", () => {
  assert.equal(canRenew({ ...contract, statut: "resilie" }, NOW), false);
  assert.equal(canRenew({ statut: "actif", fin: null }, NOW), false);
});

test("repousse l'échéance d'un an", () => {
  assert.equal(renewedEndDate(contract), "2026-03-01");
});
