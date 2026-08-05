import assert from "node:assert/strict";
import { test } from "node:test";
import { contractsOfInsured, toContractPayload } from "./contracts-api.js";

const contracts = [
  { id: 1, assure_id: 1, numero: "AUTO-2024-0187", type: "auto", statut: "actif" },
  { id: 3, assure_id: 2, numero: "SAN-2022-0440", type: "sante", statut: "resilie" },
];
const guarantees = [
  { contrat_id: 1, code: "RC", libelle: "Responsabilité civile", plafond: null, franchise: 0 },
  { contrat_id: 1, code: "BRIS", libelle: "Bris de glace", plafond: 2500, franchise: 0 },
  { contrat_id: 3, code: "HOSP", libelle: "Hospitalisation", plafond: 30000, franchise: 0 },
];

test("joint les garanties du contrat et seulement les siennes", () => {
  const payload = toContractPayload(contracts[0], guarantees);
  assert.deepEqual(payload.garanties.map((g) => g.code), ["RC", "BRIS"]);
});

test("garde un plafond nul pour la responsabilité civile", () => {
  assert.equal(toContractPayload(contracts[0], guarantees).garanties[0].plafond, null);
});

test("ne renvoie que les contrats de l'assuré demandé", () => {
  assert.deepEqual(contractsOfInsured(contracts, guarantees, 2).map((c) => c.numero), ["SAN-2022-0440"]);
});
