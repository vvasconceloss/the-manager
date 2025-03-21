INSERT INTO coach (id, first_name, last_name, birth_date, matches, wins, draws, losses, nation_id) VALUES
(1, 'Mikel', 'Arteta', '1982-03-26', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'ESP')),
(2, 'Unai', 'Emery', '1971-11-03', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'ESP')),
(3, 'Andoni', 'Iraola', '1982-06-22', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'ESP')),
(4, 'Thomas', 'Frank', '1973-10-09', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'DNK')),
(5, 'Fabian', 'Hürzeler', '1993-02-26', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'DEU')),
(6, 'Enzo', 'Maresca', '1980-02-10', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'ITA')),
(7, 'Oliver', 'Glasner', '1974-08-28', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'AUT')),
(8, 'David', 'Moyes', '1963-04-25', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'SCO')),
(9, 'Marco', 'Silva', '1977-07-12', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'POR')),
(10, 'Kieran', 'McKenna', '1986-05-14', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'NIR')),
(11, 'Ruud', 'van Nistelrooy', '1976-07-01', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'NLD')),
(12, 'Arne', 'Slot', '1978-09-17', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'NLD')),
(13, 'Pep', 'Guardiola', '1971-01-18', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'ESP')),
(14, 'Ruben', 'Amorim', '1985-01-27', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'POR')),
(15, 'Eddie', 'Howe', '1977-11-29', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'ENG')),
(16, 'Nuno', 'Espirito Santo', '1974-01-25', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'POR')),
(17, 'Ivan', 'Juric', '1975-08-25', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'HRV')),
(18, 'Ange', 'Postecoglou', '1965-08-27', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'GRC')),
(19, 'Graham', 'Potter', '1975-05-20', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'ENG')),
(20, 'Vitor', 'Pereira', '1968-07-26', 0, 0, 0, 0, (SELECT id FROM nation WHERE code = 'POR'));

INSERT INTO coach_contract (id, salary, start_date, end_date, coach_id, club_id) VALUES
(1, 100000, '2019-12-20', '2025-06-30', 1, 1), 
(2, 80000, '2022-10-24', '2026-06-30', 2, 2),
(3, 50000, '2023-06-01', '2025-06-30', 3, 3),
(4, 60000, '2018-10-16', '2024-06-30', 4, 4),
(5, 40000, '2023-07-01', '2025-06-30', 5, 5),
(6, 70000, '2023-07-01', '2026-06-30', 6, 6),
(7, 55000, '2023-02-01', '2025-06-30', 7, 7),
(8, 90000, '2019-12-30', '2024-06-30', 8, 8),
(9, 65000, '2021-07-01', '2025-06-30', 9, 9),
(10, 30000, '2021-12-16', '2024-06-30', 10, 10),
(11, 45000, '2023-07-01', '2025-06-30', 11, 11),
(12, 85000, '2023-06-01', '2026-06-30', 12, 12),
(13, 200000, '2016-07-01', '2025-06-30', 13, 13),
(14, 75000, '2020-03-05', '2026-06-30', 14, 14),
(15, 80000, '2021-11-08', '2025-06-30', 15, 15),
(16, 50000, '2023-07-01', '2025-06-30', 16, 16),
(17, 40000, '2021-05-28', '2024-06-30', 17, 17),
(18, 70000, '2023-07-01', '2026-06-30', 18, 18),
(19, 60000, '2023-07-01', '2025-06-30', 19, 19),
(20, 50000, '2023-07-01', '2025-06-30', 20, 20);