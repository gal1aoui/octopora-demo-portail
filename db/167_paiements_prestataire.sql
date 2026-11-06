-- PORTAIL-67 : suivi de chaque paiement chez le nouveau prestataire.
pragma foreign_keys = on;

create table if not exists paiements_prestataire (
  reference       text primary key,
  contrat_id      integer not null references contrats(id),
  id_prestataire  text,
  statut          text not null check (statut in ('paye', 'refuse', 'annule', 'authentification', 'inconnu')),
  montant         real not null check (montant > 0),
  cree_le         text not null default (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

create index if not exists paiements_prestataire_contrat on paiements_prestataire (contrat_id);
