// Champs obligatoires de l'étape « faits » : un champ rempli d'espaces compte comme vide.
export function missingFacts(values, today) {
  const missing = [];
  const date = (values.date ?? "").trim();
  if (!date || Number.isNaN(Date.parse(date)) || date > today) missing.push("date");
  if (!(values.type ?? "").trim()) missing.push("type");
  if ((values.description ?? "").trim().length < 20) missing.push("description");
  return missing;
}

export function nextButtonDisabled(values, today) {
  return missingFacts(values, today).length > 0;
}
