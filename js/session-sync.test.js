import assert from "node:assert/strict";
import { test } from "node:test";
import { createSessionSync, LOGOUT_MESSAGE } from "./session-sync.js";

// Un faux canal qui se comporte comme BroadcastChannel : le message va aux autres, pas à l'émetteur.
function fakeChannels(count) {
  const channels = [];
  for (let i = 0; i < count; i += 1) {
    const channel = {
      onmessage: null,
      postMessage(data) {
        channels.filter((other) => other !== channel).forEach((other) => other.onmessage?.({ data }));
      },
    };
    channels.push(channel);
  }
  return channels;
}

test("bug PORTAIL-58 : se déconnecter dans un onglet ferme la session des autres", () => {
  const [a, b, c] = fakeChannels(3);
  const closed = [];
  const tabA = createSessionSync(a, { onLogout: () => closed.push("A") });
  createSessionSync(b, { onLogout: () => closed.push("B") });
  createSessionSync(c, { onLogout: () => closed.push("C") });

  tabA.logout();

  assert.deepEqual(closed.sort(), ["A", "B", "C"]);
});

test("l'onglet qui se déconnecte ne se ferme qu'une fois", () => {
  const [a, b] = fakeChannels(2);
  let closedA = 0;
  const tabA = createSessionSync(a, { onLogout: () => (closedA += 1) });
  createSessionSync(b, { onLogout: () => {} });
  tabA.logout();
  assert.equal(closedA, 1);
});

test("un message inconnu est ignoré", () => {
  const [a] = fakeChannels(1);
  let closed = 0;
  createSessionSync(a, { onLogout: () => (closed += 1) });
  a.onmessage({ data: "autre" });
  assert.equal(closed, 0);
  a.onmessage({ data: LOGOUT_MESSAGE });
  assert.equal(closed, 1);
});
