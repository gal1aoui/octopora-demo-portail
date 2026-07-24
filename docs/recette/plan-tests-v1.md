# Plan de tests de la première version

## Périmètre
Parcours critiques du portail client à rejouer à chaque sprint : connexion, liste des contrats, attestation PDF, déclaration de sinistre. Les paiements et la signature électronique sont hors périmètre de cette version.

## Environnements
- Recette : dernière version de `main`, données de `db/seed.sql`.
- Navigateurs : Chrome et Firefox récents, Safari iOS 16, Chrome Android 12.

## Cas à rejouer
| N° | Parcours | Étapes | Résultat attendu |
|----|----------|--------|------------------|
| 1 | Connexion | Saisir un e-mail et un mot de passe valides | L'assuré arrive sur « Mes contrats » |
| 2 | Connexion refusée | Saisir un mot de passe faux | Message clair, aucun détail sur le compte |
| 3 | Liste des contrats | Filtrer sur « Habitation » puis « Actif » | Seul le contrat HAB-2023-0921 reste affiché |
| 4 | Attestation | Cliquer sur « Attestation PDF » d'un contrat actif | Le fichier `attestation-<numéro>-<année>.pdf` est téléchargé |
| 5 | Déclaration | Remplir les trois étapes puis envoyer | Un numéro de dossier est affiché |
| 6 | Déclaration incomplète | Laisser la date vide et continuer | Le passage à l'étape 2 est refusé |

## Ce qui a été constaté
- Les cas 1 à 4 passent sur les quatre navigateurs cibles.
- Le cas 6 dépend de la validation du formulaire : à rejouer après chaque modification de `claim-form.js`.

## Critères de sortie
Aucun cas bloquant ouvert et les tests automatisés (`npm test`) au vert.
