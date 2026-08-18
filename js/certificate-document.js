// Contenu d'une attestation d'assurance, prêt à être mis en page par le générateur PDF.
import { formatDate } from "./dates.js";

export function buildCertificateLines(contract, holder, now = Date.now()) {
  if (contract.statut !== "actif") {
    throw new Error("Une attestation n'est délivrée que pour un contrat actif.");
  }
  return [
    "ATTESTATION D'ASSURANCE",
    `Contrat : ${contract.numero} (${contract.libelle})`,
    `Assuré : ${holder.prenom} ${holder.nom}`,
    `En vigueur depuis le ${formatDate(contract.debut)}`,
    `Version du contrat : ${contract.version}`,
    `Délivrée le ${formatDate(new Date(now).toISOString())}`,
  ];
}
