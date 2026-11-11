import assert from "node:assert/strict";
import { test } from "node:test";
import { createProviderClient, mapProviderStatus } from "./payment-provider.js";

function fakeFetch(status, body) {
  const calls = [];
  const impl = async (url, options) => {
    calls.push({ url, options });
    return { ok: status < 400, status, json: async () => body };
  };
  return { impl, calls };
}

test("les statuts du prestataire sont traduits dans ceux du portail", () => {
  assert.equal(mapProviderStatus("succeeded"), "paye");
  assert.equal(mapProviderStatus("requires_action"), "authentification");
  assert.equal(mapProviderStatus("nouveau-statut"), "inconnu");
});

test("un débit envoie la référence comme clé d'idempotence et le montant en millimes", async () => {
  const { impl, calls } = fakeFetch(200, { id: "ch_1", status: "succeeded" });
  const client = createProviderClient({ baseUrl: "https://prestataire.test", apiKey: "cle-de-test", fetchImpl: impl });

  const result = await client.charge({ reference: "PAY-1-2025-04-15", amount: 180.5 });

  assert.equal(calls[0].options.headers["Idempotency-Key"], "PAY-1-2025-04-15");
  assert.equal(JSON.parse(calls[0].options.body).amount, 180500);
  assert.deepEqual(result, { reference: "PAY-1-2025-04-15", statut: "paye", idPrestataire: "ch_1" });
});

test("une panne du prestataire renvoie un message clair", async () => {
  const { impl } = fakeFetch(502, {});
  const client = createProviderClient({ baseUrl: "https://prestataire.test", apiKey: "cle-de-test", fetchImpl: impl });
  await assert.rejects(client.charge({ reference: "PAY-2", amount: 10 }), /Prestataire indisponible \(502\)/);
});
