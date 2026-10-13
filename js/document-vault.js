// Coffre-fort : les documents d'un assuré, groupés par contrat, avec une taille lisible.
export function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1).replace(".", ",")} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} Mo`;
}

export function groupByContract(documents, contracts) {
  const groups = new Map();
  for (const document of documents) {
    const contract = contracts.find((candidate) => candidate.id === document.contratId);
    const label = contract ? contract.numero : "Documents généraux";
    groups.set(label, [...(groups.get(label) ?? []), document]);
  }
  return [...groups].map(([label, items]) => ({ label, items }));
}
