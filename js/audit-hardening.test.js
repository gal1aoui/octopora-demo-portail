import assert from "node:assert/strict";
import { test } from "node:test";
import { escapeHtml, maskPhone, redactForLog } from "./audit-hardening.js";

test("un libellé piégé ne peut plus injecter de balise", () => {
  assert.equal(escapeHtml('<img src=x onerror="alert(1)">'), "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
});

test("le téléphone est masqué sauf les trois derniers chiffres", () => {
  assert.equal(maskPhone("+216 00 000 101"), "********101");
});

test("le journal ne garde ni mot de passe, ni code, ni e-mail ou téléphone en clair", () => {
  const entry = redactForLog({
    action: "connexion",
    email: "nour.trabelsi@example.com",
    telephone: "+216 00 000 102",
    password: "secret",
    code: "123456",
  });
  assert.deepEqual(entry, {
    action: "connexion",
    email: "n***@example.com",
    telephone: "********102",
    password: "[masqué]",
    code: "[masqué]",
  });
});
