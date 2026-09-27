-- PORTAIL-44 : chaque opération de paiement est tracée, sans jamais garder le numéro complet de la carte.
pragma foreign_keys = on;

create table if not exists journal_paiements (
  id          integer primary key,
  contrat_id  integer not null references contrats(id),
  reference   text not null,
  etape       text not null check (etape in ('authentification', 'debit', 'refus', 'annulation')),
  montant     real not null check (montant > 0),
  carte_fin   text,                -- quatre derniers chiffres seulement
  cree_le     text not null default (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

create index if not exists journal_paiements_reference on journal_paiements (reference);
create index if not exists journal_paiements_contrat on journal_paiements (contrat_id);
