-- PORTAIL-39 : messages échangés entre un assuré et son conseiller, par dossier.
pragma foreign_keys = on;

create table if not exists messages_conseiller (
  id          integer primary key,
  assure_id   integer not null references assures(id) on delete cascade,
  dossier     text,                       -- numéro de dossier, par exemple 'SIN-2025-000412'
  auteur      text not null check (auteur in ('assure', 'conseiller')),
  contenu     text not null,
  piece_jointe text,
  envoye_le   text not null default (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  lu_le       text
);

create index if not exists messages_conseiller_fil on messages_conseiller (assure_id, dossier, envoye_le);
