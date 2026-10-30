import assert from "node:assert/strict";
import { test } from "node:test";
import { cacheKey, createCertificateCache, TTL_MS } from "./certificate-cache.js";
import { fetchCertificate } from "./certificates.js";

const contract = { id: 12, numero: "AUTO-2024-0187", version: 3 };

test("la clé dépend du contrat et de sa version", () => {
  assert.equal(cacheKey(contract), "12:v3");
  assert.notEqual(cacheKey({ ...contract, version: 4 }), cacheKey(contract));
});

test("une attestation sert pendant 24 heures, puis elle est régénérée", () => {
  let clock = 0;
  const cache = createCertificateCache({ now: () => clock });
  cache.set(contract, "pdf");
  clock = TTL_MS - 1;
  assert.equal(cache.get(contract), "pdf");
  clock = TTL_MS + 1;
  assert.equal(cache.get(contract), null);
});

test("un avenant invalide l'attestation en cache", () => {
  const cache = createCertificateCache();
  cache.set(contract, "pdf");
  cache.invalidate(contract.id);
  assert.equal(cache.get(contract), null);
});

test("l'API n'est appelée qu'une fois pour la même attestation", async () => {
  let calls = 0;
  const fakeFetch = async () => {
    calls += 1;
    return { ok: true, blob: async () => "pdf" };
  };
  const store = createCertificateCache();
  await fetchCertificate(contract, fakeFetch, store);
  await fetchCertificate(contract, fakeFetch, store);
  assert.equal(calls, 1);
});
