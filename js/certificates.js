// Télécharge l'attestation PDF d'un contrat, générée par l'API.
export function certificateFileName(contract, year = new Date().getFullYear()) {
  return `attestation-${contract.numero}-${year}.pdf`;
}

export async function fetchCertificate(contract, fetchImpl = fetch) {
  const response = await fetchImpl(`/api/contrats/${contract.id}/attestation`);
  if (!response.ok) {
    throw new Error(`Attestation indisponible (${response.status})`);
  }
  return response.blob();
}

export async function downloadCertificate(contract) {
  const pdf = await fetchCertificate(contract);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(pdf);
  link.download = certificateFileName(contract);
  link.click();
  URL.revokeObjectURL(link.href);
}
