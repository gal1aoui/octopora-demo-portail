// Contrôle des identifiants à la création de compte et à la connexion.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(email) {
  return EMAIL.test((email ?? "").trim());
}

export function validatePassword(password) {
  const errors = [];
  if ((password ?? "").length < 10) errors.push("Le mot de passe doit contenir au moins 10 caractères.");
  if (!/[A-Z]/.test(password ?? "")) errors.push("Ajoutez une majuscule.");
  if (!/[0-9]/.test(password ?? "")) errors.push("Ajoutez un chiffre.");
  return errors;
}

export function validateSignup({ email, password }) {
  const errors = validatePassword(password);
  if (!validateEmail(email)) errors.unshift("L'adresse e-mail n'est pas valide.");
  return { valid: errors.length === 0, errors };
}
