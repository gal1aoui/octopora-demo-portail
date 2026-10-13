-- PORTAIL-50 : coffre-fort des documents de l'assuré, au même endroit pour tous ses contrats.
-- Ajout seul : les tables existantes ne sont pas modifiées.
-- Retour arrière : drop table coffre_documents;
pragma foreign_keys = on;

create table if not exists coffre_documents (
  id             integer primary key,
  assure_id      integer not null references assures(id),
  contrat_id     integer references contrats(id) on delete set null,  -- null : document général
  nom            text not null,
  type_mime      text not null,
  taille_octets  integer not null check (taille_octets >= 0),
  depose_le      text not null default (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

create index if not exists coffre_documents_assure on coffre_documents (assure_id);
create index if not exists coffre_documents_contrat on coffre_documents (contrat_id);
