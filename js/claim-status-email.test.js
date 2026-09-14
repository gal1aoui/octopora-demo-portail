import assert from "node:assert/strict";
import { test } from "node:test";
import { shouldNotify, statusEmail } from "./claim-status-email.js";

test("cite le numéro de dossier et le nouveau statut dans l'objet", () => {
  const mail = statusEmail("SIN-2025-000412", "expertise", "Karim");
  assert.equal(mail.subject, "Dossier SIN-2025-000412 : Un expert va examiner les dommages.");
});

test("salue l'assuré par son prénom", () => {
  assert.match(statusEmail("SIN-2025-000412", "decision", "Nour").body, /^Bonjour Nour,/);
});

test("refuse un statut inconnu", () => {
  assert.throws(() => statusEmail("SIN-2025-000412", "archive", "Karim"), /Statut inconnu/);
});

test("ne prévient pas quand le statut ne change pas", () => {
  assert.equal(shouldNotify("recu", "recu"), false);
  assert.equal(shouldNotify("recu", "complet"), true);
});
