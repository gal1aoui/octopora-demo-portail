import assert from "node:assert/strict";
import { test } from "node:test";
import { normalizeNumber, searchContracts } from "./contract-search.js";
import { CONTRACTS } from "./sample-data.js";

test("ignore la casse et les tirets du numéro saisi", () => {
  assert.equal(normalizeNumber("auto 2024-0187"), "AUTO20240187");
});

test("retrouve un contrat avec un morceau de son numéro", () => {
  assert.deepEqual(searchContracts(CONTRACTS, { query: "hab-2023" }).map((c) => c.id), [2]);
});

test("combine la recherche et le filtre de statut", () => {
  assert.deepEqual(searchContracts(CONTRACTS, { query: "2022", statut: "actif" }), []);
});

test("sans critère, renvoie tous les contrats", () => {
  assert.equal(searchContracts(CONTRACTS).length, 3);
});
