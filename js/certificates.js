import { createCertificateCache } from "./certificate-cache.js";

// Télécharge l'attestation PDF d'un contrat, générée par l'API, en passant d'abord par le cache.
const cache = createCertificateCache();

export function certificateFileName(contract, year = new Date().getFullYear()) {
  return `attestation-${contract.numero}-${year}.pdf`;
}

export async function fetchCertificate(contract, fetchImpl = fetch, store = cache) {
  const cached = store.get(contract);
  if (cached) {
    return cached;
  }
  const response = await fetchImpl(`/api/contrats/${contract.id}/attestation`);
  if (!response.ok) {
    throw new Error(`Attestation indisponible (${response.status})`);
  }
  const pdf = await response.blob();
  store.set(contract, pdf);
  return pdf;
}

export async function downloadCertificate(contract) {
  const pdf = await fetchCertificate(contract);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(pdf);
  link.download = certificateFileName(contract);
  link.click();
  URL.revokeObjectURL(link.href);
}
