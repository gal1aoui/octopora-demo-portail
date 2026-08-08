import { formatDate } from "./dates.js";
import { CONTRACTS } from "./sample-data.js";

const TYPE_LABELS = { auto: "Auto", habitation: "Habitation", sante: "Santé" };

export function filterContracts(contracts, { type = "", statut = "" } = {}) {
  return contracts.filter(
    (contract) => (!type || contract.type === type) && (!statut || contract.statut === statut)
  );
}

export function contractRow(contract) {
  const start = formatDate(contract.debut);
  return `<li class="card contract">
    <span class="tag">${TYPE_LABELS[contract.type]}</span>
    <strong>${contract.libelle}</strong>
    <span class="muted">${contract.numero}, depuis le ${start}</span>
  </li>`;
}

function render(form, list) {
  const filters = Object.fromEntries(new FormData(form));
  const contracts = filterContracts(CONTRACTS, filters);
  list.innerHTML = contracts.length
    ? contracts.map(contractRow).join("")
    : `<li class="muted">Aucun contrat ne correspond à ces filtres.</li>`;
}

if (typeof document !== "undefined") {
  const form = document.getElementById("filtres");
  const list = document.getElementById("contrats");
  form.addEventListener("change", () => render(form, list));
  render(form, list);
}
