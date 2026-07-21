-- PORTAIL-6 : données d'exemple pour la recette.
pragma foreign_keys = on;

insert into assures (id, nom, prenom, email, telephone) values
  (1, 'Ben Salah', 'Karim', 'karim.bensalah@example.com', '+216 00 000 101'),
  (2, 'Trabelsi', 'Nour', 'nour.trabelsi@example.com', '+216 00 000 102');

insert into contrats (id, assure_id, numero, type, libelle, statut, debut) values
  (1, 1, 'AUTO-2024-0187', 'auto', 'Peugeot 208, tous risques', 'actif', '2024-03-01'),
  (2, 1, 'HAB-2023-0921', 'habitation', 'Appartement, La Marsa', 'actif', '2023-09-15'),
  (3, 2, 'SAN-2022-0440', 'sante', 'Complémentaire santé famille', 'resilie', '2022-01-01');

insert into garanties (contrat_id, code, libelle, plafond, franchise) values
  (1, 'RC', 'Responsabilité civile', null, 0),
  (1, 'DOM', 'Dommages tous accidents', 40000, 300),
  (1, 'BRIS', 'Bris de glace', 2500, 0),
  (2, 'DDE', 'Dégât des eaux', 15000, 150),
  (2, 'VOL', 'Vol et vandalisme', 20000, 200),
  (3, 'HOSP', 'Hospitalisation', 30000, 0);

insert into avenants (contrat_id, objet) values
  (1, 'Ajout d''un conducteur secondaire'),
  (1, 'Changement d''adresse');
