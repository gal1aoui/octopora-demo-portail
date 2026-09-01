import assert from "node:assert/strict";
import { test } from "node:test";
import { checkAttachments } from "./claim-attachments.js";

const photo = (n) => ({ name: `photo-${n}.jpg`, type: "image/jpeg" });

test("accepte dix photos", () => {
  assert.deepEqual(checkAttachments(Array.from({ length: 10 }, (_, i) => photo(i))), { ok: true, errors: [] });
});

test("refuse onze fichiers avec un message qui donne le compte", () => {
  const result = checkAttachments(Array.from({ length: 11 }, (_, i) => photo(i)));
  assert.equal(result.ok, false);
  assert.match(result.errors[0], /10 fichiers au plus \(11 sélectionnés\)/);
});

test("nomme le fichier d'un type refusé", () => {
  const result = checkAttachments([{ name: "constat.docx", type: "application/msword" }]);
  assert.match(result.errors[0], /^constat\.docx/);
});

test("accepte un PDF", () => {
  assert.equal(checkAttachments([{ name: "constat.pdf", type: "application/pdf" }]).ok, true);
});
