// Nom de l'assuré sur l'attestation : on le coupe à la ligne au lieu de le tronquer.
export const MAX_LINE = 30;

export function splitHolderName(fullName, maxLine = MAX_LINE) {
  const lines = [];
  let current = "";
  for (const word of fullName.trim().split(/\s+/)) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxLine) {
      current = candidate;
      continue;
    }
    if (current) lines.push(current);
    current = word;
    while (current.length > maxLine) {
      lines.push(current.slice(0, maxLine));
      current = current.slice(maxLine);
    }
  }
  if (current) lines.push(current);
  return lines;
}
