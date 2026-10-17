-- PORTAIL-54 : preuve de la signature électronique d'un avenant.
pragma foreign_keys = on;

create table if not exists signatures_avenants (
  id                 integer primary key,
  avenant_id         integer not null unique references avenants(id) on delete cascade,
  empreinte          text not null check (length(empreinte) = 64),  -- SHA-256 en hexadécimal
  signataire_masque  text not null,                                   -- e-mail masqué, jamais en clair
  signe_le           text not null
);

create index if not exists signatures_avenants_date on signatures_avenants (signe_le);
