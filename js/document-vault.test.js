import assert from "node:assert/strict";
import { test } from "node:test";
import { formatSize, groupByContract } from "./document-vault.js";
import { CONTRACTS } from "./sample-data.js";

test("la taille est lisible en o, Ko et Mo", () => {
  assert.equal(formatSize(512), "512 o");
  assert.equal(formatSize(2048), "2,0 Ko");
  assert.equal(formatSize(1572864), "1,5 Mo");
});

test("les documents sont groupés par numéro de contrat, les autres en général", () => {
  const documents = [
    { nom: "constat.pdf", contratId: 1 },
    { nom: "cin.pdf", contratId: null },
    { nom: "facture.pdf", contratId: 1 },
  ];
  const groups = groupByContract(documents, CONTRACTS);
  assert.deepEqual(groups.map((group) => [group.label, group.items.length]), [
    ["AUTO-2024-0187", 2],
    ["Documents généraux", 1],
  ]);
});
