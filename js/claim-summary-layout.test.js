import assert from "node:assert/strict";
import { test } from "node:test";
import { summaryHidden, summaryMode } from "./claim-summary-layout.js";

test("bug PORTAIL-79 : à 320 px (iPhone SE) le résumé est empilé et visible", () => {
  assert.equal(summaryMode(320), "empile");
  assert.equal(summaryHidden(320), false);
});

test("sur une tablette ou un ordinateur, le résumé passe à côté du formulaire", () => {
  assert.equal(summaryMode(768), "cote-a-cote");
  assert.equal(summaryMode(1280), "cote-a-cote");
});

test("juste sous le seuil, le résumé reste empilé", () => {
  assert.equal(summaryMode(767), "empile");
});
