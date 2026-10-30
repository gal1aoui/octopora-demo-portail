// Une déconnexion est annoncée aux autres onglets par un canal (BroadcastChannel dans le navigateur).
export const LOGOUT_MESSAGE = "session:logout";

export function createSessionSync(channel, { onLogout }) {
  channel.onmessage = (event) => {
    if (event.data === LOGOUT_MESSAGE) onLogout();
  };
  return {
    logout() {
      channel.postMessage(LOGOUT_MESSAGE);
      onLogout();
    },
    close() {
      channel.close?.();
    },
  };
}

export function openSessionChannel(name = "portail-session") {
  return typeof BroadcastChannel === "undefined" ? null : new BroadcastChannel(name);
}
