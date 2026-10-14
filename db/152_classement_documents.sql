-- PORTAIL-52 : trace du classement automatique des documents reçus.
-- Ajout seul, avec un retour arrière : drop table classement_documents;
pragma foreign_keys = on;

create table if not exists classement_documents (
  id          integer primary key,
  nom_fichier text not null,
  contrat_id  integer references contrats(id) on delete set null,
  methode     text not null default 'numero' check (methode in ('numero', 'manuel')),
  a_verifier  integer not null default 0 check (a_verifier in (0, 1)),
  classe_le   text not null default (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

create index if not exists classement_documents_contrat on classement_documents (contrat_id);
create index if not exists classement_documents_a_verifier on classement_documents (a_verifier);
