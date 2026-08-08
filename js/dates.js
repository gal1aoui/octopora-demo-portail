// L'API envoie des dates ISO 8601 (2024-03-01). L'assuré les lit au format jj/mm/aaaa, à l'heure de Tunis.
const FORMAT = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "Africa/Tunis",
});

export function formatDate(isoDate) {
  return FORMAT.format(new Date(isoDate));
}
