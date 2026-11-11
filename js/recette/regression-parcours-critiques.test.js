import assert from "node:assert/strict";
import { test } from "node:test";
import { cacheKey, createCertificateCache, TTL_MS } from "../certificate-cache.js";
import { canContinue } from "../claim-form.js";
import { filterContracts } from "../contracts.js";
import { formatDate } from "../dates.js";
import { CONTRACTS } from "../sample-data.js";

test("contrats : le filtre par type et par statut garde les bons contrats", () => {
  assert.deepEqual(filterContracts(CONTRACTS, { type: "auto", statut: "actif" }).map((c) => c.numero), ["AUTO-2024-0187"]);
  assert.deepEqual(filterContracts(CONTRACTS, { statut: "resilie" }).map((c) => c.numero), ["SAN-2022-0440"]);
});

test("contrats : les dates s'affichent au format jj/mm/aaaa", () => {
  assert.equal(formatDate("2024-03-01"), "01/03/2024");
  assert.equal(formatDate("2023-12-31"), "31/12/2023");
});

test("attestations : un avenant change la clé du cache, 24 heures de durée de vie", () => {
  assert.notEqual(cacheKey({ id: 1, version: 3 }), cacheKey({ id: 1, version: 4 }));
  let clock = 0;
  const cache = createCertificateCache({ now: () => clock });
  cache.set({ id: 1, version: 3 }, "pdf");
  clock = TTL_MS + 1;
  assert.equal(cache.get({ id: 1, version: 3 }), null);
});

test("sinistre : on ne passe pas l'étape des faits avec une description trop courte", () => {
  const faits = { date: "2025-04-01", type: "vol", description: "trop court" };
  assert.equal(canContinue("faits", faits), false);
  assert.equal(canContinue("faits", { ...faits, description: "On m'a volé mon véhicule devant l'immeuble." }), true);
});
