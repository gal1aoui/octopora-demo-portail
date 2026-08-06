// Mise en forme des réponses de l'API des contrats : un contrat et ses garanties.
export function toContractPayload(contract, guarantees = []) {
  return {
    id: contract.id,
    numero: contract.numero,
    type: contract.type,
    statut: contract.statut,
    garanties: guarantees
      .filter((g) => g.contrat_id === contract.id)
      .map((g) => ({ code: g.code, libelle: g.libelle, plafond: g.plafond ?? null, franchise: g.franchise })),
  };
}

export function contractsOfInsured(contracts, guarantees, insuredId) {
  return contracts
    .filter((contract) => contract.assure_id === insuredId)
    .map((contract) => toContractPayload(contract, guarantees));
}
