import assert from "node:assert/strict";
import { test } from "node:test";
import { planCompression } from "./photo-compression.js";

test("laisse une petite photo telle quelle", () => {
  assert.equal(planCompression({ width: 800, height: 600, bytes: 200 * 1024 }).compress, false);
});

test("ramène une photo de téléphone à 1600 px sur le grand côté", () => {
  const plan = planCompression({ width: 4000, height: 3000, bytes: 3 * 1024 * 1024 });
  assert.deepEqual([plan.width, plan.height], [1600, 1200]);
});

test("compresse davantage une photo très lourde", () => {
  assert.equal(planCompression({ width: 4000, height: 3000, bytes: 6 * 1024 * 1024 }).quality, 0.7);
});

test("n'agrandit jamais une image", () => {
  const plan = planCompression({ width: 1200, height: 900, bytes: 900 * 1024 });
  assert.deepEqual([plan.width, plan.height], [1200, 900]);
});
