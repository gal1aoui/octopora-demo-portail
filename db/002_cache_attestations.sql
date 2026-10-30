-- PORTAIL-61 : les attestations générées sont gardées 24 heures.
-- Un avenant change le contrat : son attestation en cache n'est plus valable.
pragma foreign_keys = on;

create table if not exists attestations_cache (
  cle         text primary key,       -- contrat et version, par exemple '12:v3'
  contrat_id  integer not null references contrats(id) on delete cascade,
  version     integer not null,
  pdf         blob not null,
  cree_le     text not null default (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  expire_le   text not null default (strftime('%Y-%m-%dT%H:%M:%SZ', 'now', '+24 hours'))
);

create index if not exists attestations_cache_contrat on attestations_cache (contrat_id);

create trigger if not exists attestations_cache_invalidee_par_avenant
after insert on avenants
begin
  delete from attestations_cache where contrat_id = new.contrat_id;
end;

-- Ménage quotidien, lancé par la tâche planifiée :
-- delete from attestations_cache where expire_le < strftime('%Y-%m-%dT%H:%M:%SZ', 'now');
