// Classement automatique : un document dont le nom contient un numéro de contrat va dans ce contrat.
function normalize(text) {
  return text.toUpperCase().replace(/[\s_]+/g, "-");
}

export function detectContract(fileName, contracts) {
  const name = normalize(fileName);
  const matches = contracts.filter((contract) => name.includes(contract.numero));
  // Deux numéros dans un même nom : on ne devine pas, un conseiller tranchera.
  return matches.length === 1 ? matches[0] : null;
}

export function fileDocuments(fileNames, contracts) {
  const filed = [];
  const toReview = [];
  for (const fileName of fileNames) {
    const contract = detectContract(fileName, contracts);
    if (contract) filed.push({ fileName, contractId: contract.id });
    else toReview.push(fileName);
  }
  return { filed, toReview };
}
