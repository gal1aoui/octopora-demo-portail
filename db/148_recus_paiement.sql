-- PORTAIL-48 : un reçu par paiement, numéroté, disponible dans l'espace client.
pragma foreign_keys = on;

create table if not exists recus_paiement (
  numero      text primary key,    -- par exemple 'REC-2025-00042'
  contrat_id  integer not null references contrats(id),
  reference   text not null unique, -- un paiement n'a jamais deux reçus
  montant     real not null,
  emis_le     text not null default (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  fichier     text not null         -- chemin du PDF dans le stockage
);

create index if not exists recus_paiement_contrat on recus_paiement (contrat_id);
