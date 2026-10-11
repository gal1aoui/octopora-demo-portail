import assert from "node:assert/strict";
import { test } from "node:test";
import { detectContract, fileDocuments } from "./document-filing.js";
import { CONTRACTS } from "./sample-data.js";

test("le numéro de contrat dans le nom du fichier désigne le contrat", () => {
  assert.equal(detectContract("constat auto-2024-0187.pdf", CONTRACTS).id, 1);
  assert.equal(detectContract("HAB_2023_0921_avenant.pdf".replace(/_/g, "-"), CONTRACTS).id, 2);
});

test("un nom sans numéro, ou avec deux numéros, n'est pas classé", () => {
  assert.equal(detectContract("scan.pdf", CONTRACTS), null);
  assert.equal(detectContract("AUTO-2024-0187-et-HAB-2023-0921.pdf", CONTRACTS), null);
});

test("les documents non reconnus sont renvoyés à la vérification", () => {
  const result = fileDocuments(["AUTO-2024-0187-carte-grise.pdf", "photo.jpg"], CONTRACTS);
  assert.deepEqual(result.filed, [{ fileName: "AUTO-2024-0187-carte-grise.pdf", contractId: 1 }]);
  assert.deepEqual(result.toReview, ["photo.jpg"]);
});
