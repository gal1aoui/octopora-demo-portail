import assert from "node:assert/strict";
import { test } from "node:test";
import { loadDashboard } from "./dashboard-loader.js";

function deferred() {
  let resolve;
  const promise = new Promise((done) => (resolve = done));
  return { promise, resolve };
}

test("tous les blocs démarrent avant que le premier ne se termine", async () => {
  const started = [];
  const gates = { contrats: deferred(), paiements: deferred(), sinistres: deferred() };
  const loaders = Object.fromEntries(
    Object.entries(gates).map(([name, gate]) => [name, () => (started.push(name), gate.promise)])
  );

  const pending = loadDashboard(loaders);
  assert.deepEqual(started, ["contrats", "paiements", "sinistres"]);

  Object.values(gates).forEach((gate) => gate.resolve(1));
  const result = await pending;
  assert.equal(result.contrats.ok, true);
});

test("un bloc en erreur est signalé sans bloquer les autres", async () => {
  const result = await loadDashboard({
    contrats: async () => 3,
    paiements: async () => {
      throw new Error("Paiements indisponibles");
    },
  });
  assert.deepEqual(result.contrats, { ok: true, value: 3 });
  assert.deepEqual(result.paiements, { ok: false, error: "Paiements indisponibles" });
});
