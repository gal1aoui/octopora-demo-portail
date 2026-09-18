import assert from "node:assert/strict";
import { test } from "node:test";
import { UPLOAD_LIMIT_BYTES, checkUploadSize, formatSize } from "./upload-size-message.js";

test("accepte un fichier juste à la limite", () => {
  assert.deepEqual(checkUploadSize({ name: "constat.pdf", size: UPLOAD_LIMIT_BYTES }), { ok: true });
});

test("PORTAIL-38 : un fichier de plus de 10 Mo reçoit un message explicite", () => {
  const result = checkUploadSize({ name: "degats.jpg", size: 12.4 * 1024 * 1024 });
  assert.equal(result.ok, false);
  assert.match(result.message, /degats\.jpg pèse 12,4 Mo : la limite est de 10,0 Mo/);
});

test("affiche les petites tailles en Ko", () => {
  assert.equal(formatSize(2048), "2 Ko");
});
