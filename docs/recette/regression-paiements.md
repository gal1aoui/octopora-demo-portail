# Régression : paiements

## Périmètre

Rejouer les paiements acceptés, refusés et remboursés avant la mise en production, avec le prestataire actuel puis le nouveau (PORTAIL-67).

## Cas de test

| N° | Étapes | Résultat attendu | Résultat |
|----|--------|------------------|----------|
| 1 | Payer une échéance avec une carte de test acceptée | Paiement réussi, reçu `REC-AAAA-NNNNN` disponible | Conforme |
| 2 | Payer avec une carte refusée | Message clair, aucun débit, échéance inchangée | Conforme |
| 3 | Rafraîchir la page de confirmation | Aucun second débit | Conforme |
| 4 | Rembourser un paiement depuis l'interface conseiller | Statut « remboursé », ligne dans le journal des paiements | À rejouer |
| 5 | Payer avec le nouveau prestataire | Même résultat qu'avec l'ancien, même référence d'idempotence | En cours |
| 6 | Rappel automatique sept jours avant l'échéance | Un seul message par échéance | À rejouer |

## Ce qui a été trouvé

- Les trois premiers cas sont conformes avec le prestataire actuel.
- Le remboursement et le nouveau prestataire dépendent de PORTAIL-67, encore en cours.

## Reste à faire

- Rejouer les remboursements quand PORTAIL-67 les gère
- Rejouer tout le plan avec le nouveau prestataire
- Partager le résultat dans le canal du projet
