import assert from "node:assert/strict";
import { test } from "node:test";
import { acknowledgement, formatClaimNumber, nextClaimNumber } from "./claim-reference.js";

test("complète le numéro avec des zéros", () => {
  assert.equal(formatClaimNumber(2025, 412), "SIN-2025-000412");
});

test("incrémente le dernier numéro de l'année", () => {
  assert.equal(nextClaimNumber("SIN-2025-000412", 2025), "SIN-2025-000413");
});

test("repart de 1 au changement d'année", () => {
  assert.equal(nextClaimNumber("SIN-2024-000990", 2025), "SIN-2025-000001");
});

test("repart de 1 quand il n'y a pas encore de dossier", () => {
  assert.equal(nextClaimNumber(null, 2025), "SIN-2025-000001");
});

test("cite le numéro dans l'objet de l'accusé de réception", () => {
  assert.match(acknowledgement("SIN-2025-000001", "Nour").subject, /SIN-2025-000001/);
});
