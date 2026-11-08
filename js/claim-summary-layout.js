// Résumé de la déclaration de sinistre : à côté du formulaire sur grand écran, empilé en dessous sur petit écran.
export const SIDE_BY_SIDE_MIN_WIDTH = 768;

export function summaryMode(viewportWidth) {
  return viewportWidth >= SIDE_BY_SIDE_MIN_WIDTH ? "cote-a-cote" : "empile";
}

// Le résumé n'est jamais masqué, quelle que soit la largeur (l'iPhone SE fait 320 px).
export function summaryHidden() {
  return false;
}
