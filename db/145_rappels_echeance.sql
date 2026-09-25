-- PORTAIL-45 : mémoire des rappels envoyés, pour ne jamais prévenir deux fois pour la même échéance.
pragma foreign_keys = on;

create table if not exists rappels_echeance (
  id          integer primary key,
  contrat_id  integer not null references contrats(id) on delete cascade,
  echeance_le text not null,
  canal       text not null check (canal in ('email', 'sms')),
  envoye_le   text not null default (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  unique (contrat_id, echeance_le, canal)
);

create index if not exists rappels_echeance_date on rappels_echeance (echeance_le);
