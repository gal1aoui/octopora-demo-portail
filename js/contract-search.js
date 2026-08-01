// Recherche d'un contrat par numéro, avec les filtres de type et de statut de la liste.
import { filterContracts } from "./contracts.js";

export function normalizeNumber(text) {
  return (text ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function searchContracts(contracts, { query = "", type = "", statut = "" } = {}) {
  const wanted = normalizeNumber(query);
  return filterContracts(contracts, { type, statut }).filter(
    (contract) => !wanted || normalizeNumber(contract.numero).includes(wanted)
  );
}
