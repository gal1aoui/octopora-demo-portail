-- PORTAIL-14 : jetons de réinitialisation du mot de passe, à usage unique.
pragma foreign_keys = on;

create table if not exists jetons_reinitialisation (
  jeton       text primary key,
  assure_id   integer not null references assures(id) on delete cascade,
  expire_le   text not null,
  utilise_le  text
);

create index if not exists jetons_reinitialisation_assure on jetons_reinitialisation (assure_id);
