-- PORTAIL-5 : comptes de connexion des assurés. Le mot de passe n'est jamais stocké en clair.
pragma foreign_keys = on;

create table if not exists comptes (
  id             integer primary key,
  assure_id      integer not null unique references assures(id) on delete cascade,
  mot_de_passe   text not null,          -- empreinte salée, jamais le mot de passe
  essais_echoues integer not null default 0,
  verrouille_le  text,
  derniere_connexion text
);

create index if not exists comptes_assure on comptes (assure_id);
