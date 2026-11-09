import assert from "node:assert/strict";
import { test } from "node:test";
import { friendlyError, normalizeEmail, normalizePhone } from "./beta-feedback-fixes.js";

test("bêta 3 : une adresse saisie avec des majuscules et un espace final reste reconnue", () => {
  assert.equal(normalizeEmail("  Karim.BenSalah@Example.com "), "karim.bensalah@example.com");
});

test("bêta 7 : un téléphone sans indicatif ou avec des espaces est accepté", () => {
  assert.equal(normalizePhone("00 000 101"), "+216 00 000 101");
  assert.equal(normalizePhone("+216 00 000 101"), "+216 00 000 101");
  assert.equal(normalizePhone("123"), null);
});

test("bêta 9 : une erreur serveur n'affiche plus un code technique", () => {
  assert.match(friendlyError(500), /momentanément indisponible/);
  assert.match(friendlyError(401), /session a expiré/);
  assert.equal(/\d{3}/.test(friendlyError(502)), false);
});
