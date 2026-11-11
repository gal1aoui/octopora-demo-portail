// Bandeau affiché quand la connexion est perdue, puis quand elle revient.
export function bannerState({ online, wasOffline }) {
  if (!online) {
    return {
      visible: true,
      tone: "warning",
      message: "Connexion perdue. Votre saisie est conservée sur cet appareil.",
    };
  }
  if (wasOffline) {
    return { visible: true, tone: "success", message: "Connexion rétablie." };
  }
  return { visible: false, tone: "success", message: "" };
}

export function mountConnectionBanner(element, win = window) {
  let wasOffline = false;
  let hideTimer;

  const update = () => {
    const state = bannerState({ online: win.navigator.onLine, wasOffline });
    element.hidden = !state.visible;
    element.dataset.tone = state.tone;
    element.textContent = state.message;
    clearTimeout(hideTimer);
    if (state.visible && state.tone === "success") {
      hideTimer = setTimeout(() => {
        element.hidden = true;
      }, 4000);
    }
    wasOffline = !win.navigator.onLine;
  };

  win.addEventListener("online", update);
  win.addEventListener("offline", update);
  update();
}

if (typeof document !== "undefined") {
  const element = document.getElementById("connexion");
  if (element) {
    mountConnectionBanner(element);
  }
}
