-- PORTAIL-26 : numéro de dossier attribué à chaque déclaration de sinistre.
pragma foreign_keys = on;

create table if not exists dossiers_sinistres (
  numero      text primary key,          -- par exemple 'SIN-2025-000412'
  assure_id   integer not null references assures(id),
  contrat_id  integer references contrats(id),
  declare_le  text not null default (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  accuse_envoye_le text
);

create index if not exists dossiers_sinistres_assure on dossiers_sinistres (assure_id);
