import assert from "node:assert/strict";
import { test } from "node:test";
import { RESET_TTL_MS, checkResetToken, createResetToken } from "./password-reset.js";

const NOW = Date.UTC(2025, 0, 10, 9, 0, 0);
const record = createResetToken(1, { now: () => NOW, random: () => "jeton-de-test" });

test("crée un jeton qui expire une heure plus tard", () => {
  assert.equal(record.expiresAt - record.issuedAt, RESET_TTL_MS);
});

test("accepte le jeton pendant l'heure de validité", () => {
  assert.deepEqual(checkResetToken(record, "jeton-de-test", NOW + 30 * 60 * 1000), { ok: true });
});

test("refuse le jeton après une heure", () => {
  assert.equal(checkResetToken(record, "jeton-de-test", NOW + RESET_TTL_MS + 1).reason, "expire");
});

test("refuse un jeton déjà utilisé", () => {
  assert.equal(checkResetToken({ ...record, used: true }, "jeton-de-test", NOW).reason, "deja-utilise");
});

test("refuse un jeton qui n'est pas le bon", () => {
  assert.equal(checkResetToken(record, "autre", NOW).reason, "inconnu");
});
