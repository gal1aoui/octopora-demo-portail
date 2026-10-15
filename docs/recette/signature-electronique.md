# Recette de la signature électronique des avenants

## Périmètre

Signature d'un avenant sur ordinateur (Chrome, Firefox) et sur téléphone (Safari iPhone, Chrome Android).

## Cas de test

| N° | Étapes | Résultat attendu | Résultat |
|----|--------|------------------|----------|
| 1 | Ouvrir un avenant à signer depuis la liste des documents | Résumé de l'avenant affiché, bouton de signature inactif tant que la case n'est pas cochée | Conforme |
| 2 | Cocher la case et saisir le bon code SMS | Avenant signé, écran de confirmation avec la date | Conforme |
| 3 | Saisir trois fois un mauvais code | Signature bloquée, message clair, nouveau code à demander | Conforme |
| 4 | Saisir le code après 5 minutes | Code expiré, un nouveau code est proposé | Conforme |
| 5 | Retrouver l'avenant signé dans le coffre-fort | Copie signée présente, rangée dans le bon contrat | Conforme |
| 6 | Signer depuis un iPhone SE (320 px) | Tous les champs restent visibles et utilisables | Écart corrigé (PORTAIL-79) |

## Ce qui a été trouvé

- Sur iPhone SE, le résumé de la déclaration de sinistre était masqué : corrigé dans PORTAIL-79, rejoué avec succès.
- La date de signature s'affiche bien à l'heure de Tunis.
- Résultats partagés dans le canal du projet.
