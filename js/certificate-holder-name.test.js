import assert from "node:assert/strict";
import { test } from "node:test";
import { splitHolderName } from "./certificate-holder-name.js";

test("garde un nom court sur une seule ligne", () => {
  assert.deepEqual(splitHolderName("Karim Ben Salah"), ["Karim Ben Salah"]);
});

test("PORTAIL-18 : un nom de plus de 30 caractères n'est plus tronqué", () => {
  const name = "Mohamed Amine Ben Abdelkader El Ouaer";
  const lines = splitHolderName(name);
  assert.equal(lines.join(" "), name);
  assert.ok(lines.every((line) => line.length <= 30));
});

test("coupe un mot unique plus long qu'une ligne", () => {
  assert.deepEqual(splitHolderName("A".repeat(40)), ["A".repeat(30), "A".repeat(10)]);
});
