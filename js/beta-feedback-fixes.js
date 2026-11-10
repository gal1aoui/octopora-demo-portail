// Lot 1 des retours de la bêta : trois des douze anomalies touchaient la saisie et les messages d'erreur.
export function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

// Un numéro saisi avec des espaces ou sans l'indicatif est ramené au format +216 XX XXX XXX.
export function normalizePhone(phone) {
  const digits = phone.replace(/\D/g, "").replace(/^(00)?216/, "");
  if (digits.length !== 8) return null;
  return `+216 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
}

export function friendlyError(status) {
  if (status === 401) return "Votre session a expiré, reconnectez-vous.";
  if (status === 404) return "Cet élément n'existe plus.";
  if (status >= 500) return "Le service est momentanément indisponible, réessayez dans quelques minutes.";
  return "Une erreur est survenue, vérifiez votre saisie.";
}
