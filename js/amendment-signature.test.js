import assert from "node:assert/strict";
import { test } from "node:test";
import { buildSignatureRecord, maskEmail, sha256Hex } from "./amendment-signature.js";

const avenant = { id: 7, objet: "Changement d'adresse" };
const email = "karim.bensalah@example.com";

test("l'empreinte SHA-256 d'un texte connu est stable", async () => {
  assert.equal(await sha256Hex("abc"), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
});

test("l'adresse e-mail est masquée dans l'enregistrement", async () => {
  assert.equal(maskEmail(email), "k***@example.com");
  const record = await buildSignatureRecord({ avenant, email }, () => Date.parse("2025-04-15T10:00:00Z"));
  assert.equal(JSON.stringify(record).includes("karim.bensalah"), false);
  assert.equal(record.signeLe, "2025-04-15T10:00:00.000Z");
});

test("une autre date de signature donne une autre empreinte", async () => {
  const first = await buildSignatureRecord({ avenant, email }, () => 0);
  const second = await buildSignatureRecord({ avenant, email }, () => 1000);
  assert.notEqual(first.empreinte, second.empreinte);
  assert.equal(first.empreinte.length, 64);
});
