-- PORTAIL-11 : vue lue par l'API des contrats, une ligne par garantie.
pragma foreign_keys = on;

create view if not exists v_contrats_garanties as
select c.id as contrat_id, c.assure_id, c.numero, c.type, c.statut,
       g.code, g.libelle, g.plafond, g.franchise
from contrats c
left join garanties g on g.contrat_id = c.id;
