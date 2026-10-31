-- PORTAIL-62 : codes SMS de connexion. Le code n'est jamais gardé en clair, seulement son empreinte.
pragma foreign_keys = on;

create table if not exists codes_sms (
  id          integer primary key,
  assure_id   integer not null references assures(id) on delete cascade,
  appareil    text not null,
  code_hash   text not null,
  expire_le   text not null,
  tentatives  integer not null default 0 check (tentatives between 0 and 3),
  utilise_le  text
);

create index if not exists codes_sms_assure on codes_sms (assure_id, expire_le);
