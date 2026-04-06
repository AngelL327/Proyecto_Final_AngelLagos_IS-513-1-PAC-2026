-- Insertar Usuarios de prueba
INSERT INTO users (username, email, password_hash) VALUES
('profesor', 'profesor@clase.edu', 'hash_falso_123'),
('alumno1', 'alumno1@clase.edu', 'hash_falso_456');

-- Insertar Géneros
-- Forzamos los IDs para asegurar la integridad de las relaciones más abajo
INSERT INTO genres (id, name) VALUES
(1, 'Ciencia Ficción'),
(2, 'Acción'),
(3, 'Drama'),
(4, 'Crimen');

-- Insertar Directores
INSERT INTO directors (id, full_name) VALUES
(1, 'Christopher Nolan'),
(2, 'Quentin Tarantino'),
(3, 'Lana Wachowski'),
(4, 'Lilly Wachowski');

-- Insertar Películas
INSERT INTO movies (id, title, release_year, synopsis, poster_url) VALUES
(1, 'Inception', 2010, 'Un ladrón que roba secretos corporativos a través del uso de tecnología de compartir sueños.', 'https://ejemplo.com/posters/inception.jpg'),
(2, 'Pulp Fiction', 1994, 'Las vidas de dos sicarios, un boxeador y la esposa de un gángster se entrelazan en historias de violencia y redención.', 'https://ejemplo.com/posters/pulpfiction.jpg'),
(3, 'The Matrix', 1999, 'Un hacker informático descubre la verdadera naturaleza de su realidad y su papel en la guerra contra sus controladores.', 'https://ejemplo.com/posters/matrix.jpg');

-- Insertar Relaciones Muchos a Muchos: Películas y Géneros
INSERT INTO movie_genres (movie_id, genre_id) VALUES
(1, 1), (1, 2), -- Inception es Ciencia Ficción y Acción
(2, 3), (2, 4), -- Pulp Fiction es Drama y Crimen
(3, 1), (3, 2); -- The Matrix es Ciencia Ficción y Acción

-- Insertar Relaciones Muchos a Muchos: Películas y Directores
INSERT INTO movie_directors (movie_id, director_id) VALUES
(1, 1),         -- Inception dirigida por Christopher Nolan
(2, 2),         -- Pulp Fiction dirigida por Quentin Tarantino
(3, 3), (3, 4); -- The Matrix dirigida por Lana y Lilly Wachowski (Ejemplo de múltiples directores)