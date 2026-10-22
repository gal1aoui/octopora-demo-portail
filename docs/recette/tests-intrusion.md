# Tests d'intrusion avec l'équipe sécurité du client

## Périmètre

Accompagnement des tests d'intrusion de l'équipe sécurité du client sur l'espace assuré : injections, accès à un contrat d'un autre assuré, session, journalisation.

## Cas de test

| N° | Étapes | Résultat attendu | Résultat |
|----|--------|------------------|----------|
| 1 | Injecter du HTML dans un libellé affiché | Le texte est échappé, rien ne s'exécute | Corrigé (PORTAIL-57) |
| 2 | Passer une valeur SQL dans le filtre de contrats | Aucun contrat renvoyé, aucune erreur | Conforme (test automatique) |
| 3 | Ouvrir l'attestation d'un contrat d'un autre assuré | Accès refusé, tentative journalisée | Conforme |
| 4 | Réutiliser la session après déconnexion dans un autre onglet | Session fermée partout | Corrigé (PORTAIL-58) |
| 5 | Chercher des données personnelles dans les journaux | E-mails et téléphones masqués, aucun mot de passe | Conforme |

## Ce qui a été trouvé

- Deux alertes élevées, corrigées dans PORTAIL-57 et PORTAIL-58, puis rejouées avec succès.
- Aucune alerte critique restante.
- Conclusions suivies avec l'équipe sécurité du client et partagées dans le canal du projet.
