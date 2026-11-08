# Régression : déclaration de sinistre

## Périmètre

Rejouer la déclaration d'un sinistre en trois étapes et son suivi, sur ordinateur et sur iPhone SE.

## Cas de test

| N° | Étapes | Résultat attendu | Résultat |
|----|--------|------------------|----------|
| 1 | Laisser la description vide et cliquer sur Continuer | On reste sur l'étape des faits | Conforme (test automatique) |
| 2 | Saisir une description de moins de 20 caractères | On reste sur l'étape des faits | Conforme (test automatique) |
| 3 | Passer l'étape des photos sans photo | On passe à la confirmation | Conforme (test automatique) |
| 4 | Envoyer sans cocher la certification | L'envoi est bloqué | Conforme (test automatique) |
| 5 | Envoyer une photo de plus de 10 Mo | Message clair, la déclaration reste possible | Conforme |
| 6 | Afficher le résumé sur iPhone SE | Résumé visible sous le formulaire | Conforme (PORTAIL-79) |
| 7 | Suivre le statut du dossier après l'envoi | Numéro de dossier et statut à jour | Conforme |

## Ce qui a été trouvé

- Aucune régression sur les sept cas.
- Les quatre premiers cas sont couverts par un test automatique, rejoué à chaque modification du formulaire.
- Résultat partagé dans le canal du projet.
