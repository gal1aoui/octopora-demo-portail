// Paiement par carte : contrôles côté navigateur, avant l'appel au prestataire.
export function luhnValid(number) {
  const digits = number.replace(/\s/g, "");
  if (!/^\d{13,19}$/.test(digits)) return false;
  let sum = 0;
  [...digits].reverse().forEach((char, index) => {
    let digit = Number(char);
    if (index % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  });
  return sum % 10 === 0;
}

export function validateCardPayment({ number, expiry, amount }, now = new Date()) {
  const errors = [];
  if (!luhnValid(number ?? "")) errors.push("Numéro de carte invalide.");
  const match = /^(\d{2})\/(\d{2})$/.exec(expiry ?? "");
  if (!match || Number(match[1]) < 1 || Number(match[1]) > 12) {
    errors.push("Date d'expiration invalide.");
  } else if (2000 + Number(match[2]) < now.getUTCFullYear() ||
    (2000 + Number(match[2]) === now.getUTCFullYear() && Number(match[1]) < now.getUTCMonth() + 1)) {
    errors.push("Cette carte est expirée.");
  }
  if (!(amount > 0)) errors.push("Le montant doit être positif.");
  return errors;
}

// Authentification forte (3-D Secure) : toujours, sauf petit montant sur un appareil déjà connu.
export function strongAuthRequired(amount, knownDevice) {
  return !(amount < 30 && knownDevice);
}

// Une ligne du journal des paiements ne garde que les quatre derniers chiffres de la carte.
export function journalEntry({ reference, step, amount, number }, now = () => Date.now()) {
  return { reference, step, amount, cardEnd: number.replace(/\s/g, "").slice(-4), at: new Date(now()).toISOString() };
}
