-- PORTAIL-60 : index pour les requêtes du tableau de bord (contrats actifs, avenants récents).
create index if not exists contrats_assure_statut on contrats (assure_id, statut);
create index if not exists avenants_contrat_date on avenants (contrat_id, signe_le);
