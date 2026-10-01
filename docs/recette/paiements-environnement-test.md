# Recette des paiements en environnement de test

## Périmètre

Paiement d'une cotisation par carte avec les cartes de test du prestataire, en environnement de test uniquement. Aucune vraie carte n'est utilisée.

## Cas de test

| N° | Étapes | Résultat attendu | Résultat |
|----|--------|------------------|----------|
| 1 | Payer une échéance avec la carte de test 4242 4242 4242 4242 | Paiement accepté, reçu disponible, une ligne `debit` dans le journal | Conforme |
| 2 | Payer avec une carte de test refusée (fonds insuffisants) | Message « paiement refusé » clair, aucun débit, échéance toujours à payer | Conforme |
| 3 | Annuler le paiement sur l'écran d'authentification forte | Retour à l'échéancier, journal : `annulation`, aucun débit | Conforme |
| 4 | Cliquer deux fois sur « Payer » | Un seul débit | Conforme |
| 5 | Rafraîchir la page de confirmation après un paiement réussi | Pas de second débit (PORTAIL-41) | Conforme |
| 6 | Saisir une carte expirée | Erreur « Cette carte est expirée. » avant tout appel au prestataire | Conforme |

## Ce qui a été trouvé

- Le message de refus manquait de la raison (fonds, plafond) : remonté à l'équipe, accepté tel quel pour la première version.
- Aucun double débit constaté sur les six cas.
- Résultats partagés dans le canal du projet.
