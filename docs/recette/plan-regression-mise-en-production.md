# Plan de tests de régression avant mise en production

## Périmètre

Rejouer tous les parcours critiques avant l'ouverture aux assurés : connexion, contrats et attestations, déclaration de sinistre, paiements, signature, documents.

## Cas de test

| N° | Étapes | Résultat attendu | Résultat |
|----|--------|------------------|----------|
| 1 | Connexion avec double authentification depuis un nouvel appareil | Code SMS demandé, accès accordé | À rejouer |
| 2 | Liste des contrats, filtres type et statut | Les contrats attendus, dates au format jj/mm/aaaa | Conforme (test automatique) |
| 3 | Attestation PDF d'un contrat après un avenant | Nouvelle attestation, pas celle du cache | Conforme (test automatique) |
| 4 | Déclaration de sinistre en trois étapes | Chaque étape bloque tant que le champ obligatoire est vide | Conforme (test automatique) |
| 5 | Paiement d'une échéance | Voir le plan « Régression : paiements » | En cours |
| 6 | Signature d'un avenant | Copie signée dans le coffre-fort | À rejouer |

## Ce qui a été trouvé

- Les parcours contrats et sinistre sont couverts par `js/recette/regression-parcours-critiques.test.js`.
- Les parcours de connexion, de paiement et de signature se rejouent à la main sur l'environnement de pré-production.

## Reste à faire

- Rejouer la connexion et la signature sur la pré-production
- Attendre la fin de la régression des paiements
- Partager le résultat final dans le canal du projet
