import assert from "node:assert/strict";
import { test } from "node:test";
import { previewSize, previewStyle, rotationFor } from "./scan-orientation.js";

test("bug PORTAIL-55 : un scan pris à l'envers (EXIF 3) est tourné de 180 degrés", () => {
  assert.equal(rotationFor(3), 180);
  assert.equal(previewStyle(3), "transform: rotate(180deg);");
});

test("un scan de téléphone tenu en portrait (EXIF 6 et 8) est redressé", () => {
  assert.equal(rotationFor(6), 90);
  assert.equal(rotationFor(8), 270);
});

test("un scan déjà à l'endroit, ou sans information, n'est pas touché", () => {
  assert.equal(previewStyle(1), "");
  assert.equal(previewStyle(undefined), "");
});

test("les dimensions s'échangent après un quart de tour", () => {
  assert.deepEqual(previewSize({ width: 1200, height: 800 }, 6), { width: 800, height: 1200 });
  assert.deepEqual(previewSize({ width: 1200, height: 800 }, 3), { width: 1200, height: 800 });
});
