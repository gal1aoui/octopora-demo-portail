# Tests de bout en bout de la connexion

## Périmètre
Connexion, échec de connexion, verrouillage après essais répétés et réinitialisation du mot de passe, joués dans un vrai navigateur sur la recette.

## Cas
| N° | Scénario | Étapes | Résultat attendu |
|----|----------|--------|------------------|
| C1 | Connexion réussie | E-mail et mot de passe valides, clic sur « Se connecter » | Redirection vers « Mes contrats » |
| C2 | Mot de passe faux | Mot de passe incorrect | Message « Identifiants incorrects », champ e-mail conservé |
| C3 | Compte inconnu | E-mail qui n'existe pas | Même message que C2, pour ne pas révéler les comptes |
| C4 | Verrouillage | Cinq mots de passe faux de suite | Message de verrouillage temporaire |
| C5 | Réinitialisation | Demander un lien, ouvrir le lien reçu, choisir un nouveau mot de passe | Connexion possible avec le nouveau mot de passe |
| C6 | Lien expiré | Ouvrir un lien de plus d'une heure | Message demandant un nouveau lien |

## Ce qui a été trouvé
- C3 renvoyait un message différent de C2 sur la première recette : corrigé avant la fin du sprint.
- C6 n'est pas encore automatisé, le lien expire en une heure réelle : à jouer avec une horloge simulée.

## Suite
Brancher C1 à C5 sur le job de recette de l'intégration continue.
