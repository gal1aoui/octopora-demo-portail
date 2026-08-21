import assert from "node:assert/strict";
import { test } from "node:test";
import { filterContracts } from "../contracts.js";
import { formatDate } from "../dates.js";
import { CONTRACTS } from "../sample-data.js";

test("K1 : la liste complète contient trois contrats", () => {
  assert.equal(filterContracts(CONTRACTS).length, 3);
});

test("K2 : le filtre Santé ne garde que SAN-2022-0440", () => {
  assert.deepEqual(filterContracts(CONTRACTS, { type: "sante" }).map((c) => c.numero), ["SAN-2022-0440"]);
});

test("K3 : le filtre Actif garde deux contrats", () => {
  assert.equal(filterContracts(CONTRACTS, { statut: "actif" }).length, 2);
});

test("K4 : Santé et Actif ne donnent aucun résultat", () => {
  assert.deepEqual(filterContracts(CONTRACTS, { type: "sante", statut: "actif" }), []);
});

test("K5 : la date de début de AUTO-2024-0187 s'affiche jj/mm/aaaa", () => {
  assert.equal(formatDate(CONTRACTS[0].debut), "01/03/2024");
});
