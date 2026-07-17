import assert from "node:assert/strict";
import { test } from "node:test";
import { validateEmail, validatePassword, validateSignup } from "./auth-credentials.js";

test("accepte une adresse e-mail correcte", () => {
  assert.equal(validateEmail("karim.bensalah@example.com"), true);
});

test("refuse une adresse sans domaine", () => {
  assert.equal(validateEmail("karim@"), false);
});

test("liste chaque règle de mot de passe non respectée", () => {
  assert.deepEqual(validatePassword("court"), [
    "Le mot de passe doit contenir au moins 10 caractères.",
    "Ajoutez une majuscule.",
    "Ajoutez un chiffre.",
  ]);
});

test("valide une inscription complète", () => {
  assert.deepEqual(validateSignup({ email: "nour@example.com", password: "Portail2024ok" }), { valid: true, errors: [] });
});

test("place l'erreur d'e-mail en premier", () => {
  const result = validateSignup({ email: "x", password: "Portail2024ok" });
  assert.equal(result.errors[0], "L'adresse e-mail n'est pas valide.");
});
