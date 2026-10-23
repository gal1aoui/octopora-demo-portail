import assert from "node:assert/strict";
import { test } from "node:test";
import { filterContracts } from "../contracts.js";
import { certificateFileName } from "../certificates.js";
import { CONTRACTS } from "../sample-data.js";

test("une valeur d'injection SQL dans le filtre ne renvoie aucun contrat", () => {
  assert.deepEqual(filterContracts(CONTRACTS, { type: "auto' OR '1'='1" }), []);
  assert.deepEqual(filterContracts(CONTRACTS, { statut: "actif'; drop table contrats;--" }), []);
});

test("un filtre vide renvoie tous les contrats de l'assuré, ni plus ni moins", () => {
  assert.equal(filterContracts(CONTRACTS, {}).length, CONTRACTS.length);
});

test("le nom de l'attestation est construit depuis le numéro du contrat et l'année donnée", () => {
  assert.equal(certificateFileName(CONTRACTS[0], 2025), "attestation-AUTO-2024-0187-2025.pdf");
});
