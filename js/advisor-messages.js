// Messagerie entre l'assuré et son conseiller : ordre du fil, heure de Tunis, messages non lus.
const TIME = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "Africa/Tunis",
});

export function orderThread(messages) {
  return [...messages].sort((a, b) => Date.parse(a.envoye_le) - Date.parse(b.envoye_le));
}

export function formatMessageTime(iso) {
  return TIME.format(new Date(iso));
}

export function unreadCount(messages, reader) {
  return messages.filter((m) => m.auteur !== reader && !m.lu_le).length;
}
