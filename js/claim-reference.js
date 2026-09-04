// Numéro de dossier d'un sinistre (SIN-2025-000412) et texte de l'accusé de réception.
export function formatClaimNumber(year, sequence) {
  return `SIN-${year}-${String(sequence).padStart(6, "0")}`;
}

export function nextClaimNumber(lastNumber, year) {
  const match = /^SIN-(\d{4})-(\d{6})$/.exec(lastNumber ?? "");
  const sequence = match && Number(match[1]) === year ? Number(match[2]) + 1 : 1;
  return formatClaimNumber(year, sequence);
}

export function acknowledgement(claimNumber, firstName) {
  return {
    subject: `Votre déclaration ${claimNumber} est bien reçue`,
    body: `Bonjour ${firstName},\n\nNous avons enregistré votre déclaration sous le numéro ${claimNumber}. Un conseiller la prend en charge et vous répond sous 48 heures.`,
  };
}
