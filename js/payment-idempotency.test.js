import assert from "node:assert/strict";
import { test } from "node:test";
import { createPaymentGuard, paymentReference } from "./payment-idempotency.js";

const reference = paymentReference(12, "2025-04-15");

test("la référence est stable pour un même contrat et une même échéance", () => {
  assert.equal(reference, "PAY-12-2025-04-15");
});

test("bug PORTAIL-41 : rafraîchir la page de confirmation ne débite pas une seconde fois", async () => {
  let debits = 0;
  const charge = async () => {
    debits += 1;
    return { statut: "paye" };
  };
  const storage = new Map();

  await createPaymentGuard({ storage }).submit(reference, charge);
  // Après le rafraîchissement, la page recrée sa garde avec le même stockage.
  const again = await createPaymentGuard({ storage }).submit(reference, charge);

  assert.equal(debits, 1);
  assert.equal(again.rejoue, true);
});

test("un double clic rapide ne lance qu'un débit", async () => {
  let debits = 0;
  const guard = createPaymentGuard();
  const charge = async () => {
    debits += 1;
    return { statut: "paye" };
  };
  await Promise.all([guard.submit(reference, charge), guard.submit(reference, charge)]);
  assert.equal(debits, 1);
});

test("un paiement refusé peut être retenté", async () => {
  const guard = createPaymentGuard();
  await assert.rejects(guard.submit(reference, async () => Promise.reject(new Error("refusé"))));
  const result = await guard.submit(reference, async () => ({ statut: "paye" }));
  assert.equal(result.statut, "paye");
});
