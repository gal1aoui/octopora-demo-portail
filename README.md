# Portail client

Ce dépôt est celui du projet « Portail client » de l'espace de démonstration
d'[Octopora](https://octopora.com) : le portail en ligne des assurés d'un assureur : contrats, attestations, déclaration de sinistre.

Chaque branche, commit et demande de fusion porte la clé du ticket qu'il fait avancer (`PORTAIL-61`, par
exemple), et Octopora les affiche sur ce ticket.

Le code reste volontairement simple : des pages HTML, des modules JavaScript sans dépendance et des scripts
SQLite.

## Lancer les tests

```sh
npm test
```

Node 20 ou plus récent suffit, il n'y a rien à installer.

## Créer la base SQLite

```sh
sqlite3 portail.db < db/001_contrats.sql
sqlite3 portail.db < db/seed.sql
```

## Conventions

- Une branche par ticket : `feature/PORTAIL-12-description`, `fix/PORTAIL-41-description`.
- La clé du ticket en tête de chaque commit et de chaque titre de demande de fusion.
- Les branches `helpi/…` sont ouvertes par Helpi Agent, l'agent de développement d'Octopora. Un humain les
  relit et les fusionne.
