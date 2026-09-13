import assert from "node:assert/strict";
import { test } from "node:test";
import { SAMPLE_CLAIMS, ageInDays, sortClaims } from "./advisor-claims.js";

test("place les priorités hautes d'abord, les plus anciennes en premier", () => {
  assert.deepEqual(sortClaims(SAMPLE_CLAIMS).map((c) => c.numero), ["SIN-2025-000412", "SIN-2025-000421", "SIN-2025-000398"]);
});

test("ne modifie pas la liste d'origine", () => {
  const before = SAMPLE_CLAIMS.map((c) => c.numero);
  sortClaims(SAMPLE_CLAIMS);
  assert.deepEqual(SAMPLE_CLAIMS.map((c) => c.numero), before);
});

test("compte l'ancienneté en jours entiers", () => {
  assert.equal(ageInDays(SAMPLE_CLAIMS[0], Date.parse("2025-01-10T09:00:00Z")), 2);
});
