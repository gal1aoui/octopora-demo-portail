-- PORTAIL-16 : demandes de renouvellement faites depuis le portail.
pragma foreign_keys = on;

create table if not exists renouvellements (
  id          integer primary key,
  contrat_id  integer not null references contrats(id) on delete cascade,
  demande_le  text not null default (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  nouvelle_fin text not null,
  statut      text not null default 'en_attente' check (statut in ('en_attente', 'accepte', 'refuse'))
);

create index if not exists renouvellements_contrat on renouvellements (contrat_id);
