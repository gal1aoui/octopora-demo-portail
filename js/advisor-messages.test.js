import assert from "node:assert/strict";
import { test } from "node:test";
import { formatMessageTime, orderThread, unreadCount } from "./advisor-messages.js";

const thread = [
  { id: 2, auteur: "assure", envoye_le: "2025-01-09T09:40:00Z", lu_le: "2025-01-09T10:00:00Z" },
  { id: 1, auteur: "conseiller", envoye_le: "2025-01-09T09:12:00Z", lu_le: null },
  { id: 3, auteur: "conseiller", envoye_le: "2025-01-10T10:05:00Z", lu_le: null },
];

test("ordonne le fil du plus ancien au plus récent", () => {
  assert.deepEqual(orderThread(thread).map((m) => m.id), [1, 2, 3]);
});

test("affiche l'heure de Tunis, une heure après UTC en hiver", () => {
  assert.match(formatMessageTime("2025-01-09T09:12:00Z"), /09\/01\/2025.*10:12/);
});

test("passe minuit à l'heure de Tunis", () => {
  assert.match(formatMessageTime("2025-01-10T23:30:00Z"), /11\/01\/2025.*00:30/);
});

test("compte les messages de l'autre partie pas encore lus", () => {
  assert.equal(unreadCount(thread, "assure"), 2);
  assert.equal(unreadCount(thread, "conseiller"), 0);
});
