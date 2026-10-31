import assert from "node:assert/strict";
import { test } from "node:test";
import { CODE_TTL_MS, isNewDevice, issueCode, verifyCode } from "./sms-code.js";

const record = issueCode({ randomInt: () => 42, now: () => 1000 });

test("le code est complété à six chiffres et expire après 5 minutes", () => {
  assert.equal(record.code, "000042");
  assert.equal(record.expiresAt, 1000 + CODE_TTL_MS);
});

test("un code juste dans le délai est accepté", () => {
  assert.equal(verifyCode(record, "000042", () => 2000).ok, true);
});

test("un code juste après le délai est refusé comme expiré", () => {
  assert.equal(verifyCode(record, "000042", () => 1000 + CODE_TTL_MS + 1).reason, "expire");
});

test("après trois erreurs, même le bon code est refusé", () => {
  let current = record;
  for (let i = 0; i < 3; i += 1) {
    const result = verifyCode(current, "999999", () => 2000);
    assert.equal(result.reason, "incorrect");
    current = result.record;
  }
  assert.equal(verifyCode(current, "000042", () => 2000).reason, "trop-d-essais");
});

test("le code n'est demandé que depuis un appareil inconnu", () => {
  assert.equal(isNewDevice(["tel-1"], "tel-1"), false);
  assert.equal(isNewDevice(["tel-1"], "pc-2"), true);
});
