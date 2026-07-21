-- PORTAIL-6 : modèle de données des contrats et des garanties (SQLite).
pragma foreign_keys = on;

create table if not exists assures (
  id          integer primary key,
  nom         text not null,
  prenom      text not null,
  email       text not null unique,
  telephone   text,
  cree_le     text not null default (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

create table if not exists contrats (
  id          integer primary key,
  assure_id   integer not null references assures(id),
  numero      text not null unique,
  type        text not null check (type in ('auto', 'habitation', 'sante')),
  libelle     text not null,
  statut      text not null default 'actif' check (statut in ('actif', 'suspendu', 'resilie')),
  debut       text not null,
  fin         text,
  version     integer not null default 1
);

create table if not exists garanties (
  id          integer primary key,
  contrat_id  integer not null references contrats(id) on delete cascade,
  code        text not null,
  libelle     text not null,
  plafond     integer,          -- en dinars, null quand il n'y a pas de plafond
  franchise   integer not null default 0,
  unique (contrat_id, code)
);

create table if not exists avenants (
  id          integer primary key,
  contrat_id  integer not null references contrats(id) on delete cascade,
  objet       text not null,
  signe_le    text not null default (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- Chaque avenant fait passer le contrat à la version suivante.
create trigger if not exists contrats_version_apres_avenant
after insert on avenants
begin
  update contrats set version = version + 1 where id = new.contrat_id;
end;

create index if not exists contrats_assure on contrats (assure_id);
create index if not exists garanties_contrat on garanties (contrat_id);
