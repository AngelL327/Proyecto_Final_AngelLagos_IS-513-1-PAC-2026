# Servidor de Base de Datos - Clase de Películas

Este proyecto levanta un contenedor de MySQL 8.0 con una estructura de base de datos preconfigurada para gestionar películas, géneros, directores y usuarios, incluyendo datos de prueba.

## Prerrequisitos
* Tener instalado [Docker](https://www.docker.com/get-started) y Docker Compose en tu máquina.

## Instrucciones para ponerlo en marcha

1. Abre tu terminal y navega hasta la carpeta raíz de este proyecto (donde se encuentra el archivo `docker-compose.yml`).

2. Ejecuta el siguiente comando para construir y levantar el contenedor en segundo plano:

   ```bash
   docker compose up -d
   ```

3. Una vez que el contenedor esté corriendo, puedes conectarte a la base de datos usando las siguientes credenciales:

   - **Host:** localhost
   - **Puerto:** 3308
   - **Usuario:** unah
   - **Contraseña:** unah2026
   - **Base de datos:** db_movies_unah

   También puedes usar el usuario root con contraseña 'root'.

## Estructura de la Base de Datos

La base de datos `db_movies_unah` contiene las siguientes tablas:

- **users**: Gestiona el acceso a la aplicación (id, username, email, password_hash, created_at)
- **movies**: Almacena información de películas (id, title, release_year, synopsis, poster_url, created_at)
- **genres**: Lista de géneros disponibles (id, name)
- **directors**: Lista de directores (id, full_name)
- **movie_genres**: Relación muchos-a-muchos entre películas y géneros
- **movie_directors**: Relación muchos-a-muchos entre películas y directores



## Consultas Útiles

### Obtener todas las películas con sus géneros y directores

```sql
SELECT 
    m.id, 
    m.title, 
    m.release_year,
    m.synopsis,
    GROUP_CONCAT(DISTINCT g.name SEPARATOR ', ') AS genres,
    GROUP_CONCAT(DISTINCT d.full_name SEPARATOR ', ') AS directors
FROM movies m
LEFT JOIN movie_genres mg ON m.id = mg.movie_id
LEFT JOIN genres g ON mg.genre_id = g.id
LEFT JOIN movie_directors md ON m.id = md.movie_id
LEFT JOIN directors d ON md.director_id = d.id
GROUP BY m.id;
```

## Detener el Contenedor

Para detener el contenedor, ejecuta:

```bash
docker compose down
```

