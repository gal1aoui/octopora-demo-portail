# Recette des parcours contrats

## Périmètre
Liste des contrats, filtres, détail, attestation PDF, sur Chrome, Firefox, Safari iOS et Chrome Android.

## Cas
| N° | Parcours | Étapes | Résultat attendu |
|----|----------|--------|------------------|
| K1 | Liste complète | Ouvrir « Mes contrats » | Trois contrats affichés avec type, numéro et date de début |
| K2 | Filtre par type | Choisir « Santé » | Seul SAN-2022-0440 reste affiché |
| K3 | Filtre par statut | Choisir « Actif » | Les deux contrats actifs restent affichés |
| K4 | Aucun résultat | Type « Santé » et statut « Actif » | Message « Aucun contrat ne correspond à ces filtres. » |
| K5 | Date de début | Lire la date de AUTO-2024-0187 | Format jj/mm/aaaa : 01/03/2024 |
| K6 | Attestation | Cliquer sur « Attestation PDF » | Téléchargement de `attestation-<numéro>-<année>.pdf` |

## Résultats
- K1 à K5 : conformes sur les quatre navigateurs.
- K6 : le nom du fichier est correct, mais l'attestation d'un nom très long était tronquée (voir PORTAIL-18, corrigé).

Les cas K1 à K5 sont rejoués automatiquement par `js/recette/parcours-contrats.test.js`.
