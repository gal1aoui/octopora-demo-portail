# Recette de la déclaration de sinistre

## Périmètre
Déclaration en trois étapes, jouée avec trois cas réels fournis par le client (accident de la route, dégât des eaux, vol), sur les navigateurs cibles.

## Cas
| N° | Cas | Étapes | Résultat attendu |
|----|-----|--------|------------------|
| S1 | Accident, dossier complet | Remplir les faits, joindre deux photos, certifier | Dossier envoyé, numéro affiché |
| S2 | Date vide | Laisser la date vide, cliquer sur Continuer | On reste à l'étape 1 |
| S3 | Description trop courte | Écrire 10 caractères | On reste à l'étape 1 |
| S4 | Sans photo | Passer l'étape 2 sans fichier | L'étape 3 s'ouvre |
| S5 | Certification oubliée | Ne pas cocher la case à l'étape 3 | L'envoi est refusé |
| S6 | Photo de 12 Mo | Joindre une photo lourde | Message clair, pas d'échec silencieux |

## Ce qui a été trouvé
- S2 : le bouton Continuer restait actif sur une date vide (PORTAIL-24, corrigé).
- S6 : l'envoi échouait sans message au-delà de 10 Mo (PORTAIL-38, corrigé).

S2 à S5 sont rejoués par `js/recette/declaration-sinistre.test.js`.
