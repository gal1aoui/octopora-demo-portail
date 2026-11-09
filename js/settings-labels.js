// Libellés de la page Paramètres. Chaque clé doit exister en français : plus de texte anglais côté assuré.
export const SETTINGS_LABELS_FR = {
  profile: "Profil",
  notifications: "Notifications",
  language: "Langue",
  security: "Sécurité",
  twoFactor: "Double authentification",
  signOut: "Se déconnecter",
  deleteAccount: "Supprimer mon compte",
  save: "Enregistrer",
};

// `keys` : les clés utilisées par la page. Renvoie celles qui n'ont pas de libellé.
export function missingLabels(keys, labels = SETTINGS_LABELS_FR) {
  return keys.filter((key) => !labels[key]);
}

export function label(key, labels = SETTINGS_LABELS_FR) {
  return labels[key] ?? key;
}
