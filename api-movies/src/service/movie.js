import MOVIES from '../data/movies.json' with { type: 'json' }
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../config/db.js'
const baseSelect = `
    SELECT 
        m.id,
        m.title,
        m.release_year,
        m.synopsis,
        GROUP_CONCAT(DISTINCT g.name ORDER BY g.name SEPARATOR ', ') AS genres,
        GROUP_CONCAT(DISTINCT d.full_name ORDER BY d.full_name SEPARATOR ', ') AS directors
    FROM movies m
    LEFT JOIN movie_genres mg ON m.id = mg.movie_id
    LEFT JOIN genres g ON mg.genre_id = g.id
    LEFT JOIN movie_directors md ON m.id = md.movie_id
    LEFT JOIN directors d ON md.director_id = d.id
`

export default class Movie {
    static getAll = async ({ genre, director, year } = {}) => {
        const filters = []
        const params = {}

        if (genre) {
            filters.push('g.name = :genre')
            params.genre = genre
        }

        if (director) {
            filters.push('d.full_name = :director')
            params.director = director
        }

        if (year) {
            filters.push('m.release_year = :year')
            params.year = year
        }

        const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : ''

        const [rows] = await pool.query(
            `${baseSelect}
            ${whereClause}
            GROUP BY m.id
            ORDER BY m.title ASC;`,
            params
        )

        return rows
    }
    
    static find = async (id) => {
        const [rows] = await pool.query(
            `${baseSelect}
            WHERE m.id = :id
            GROUP BY m.id;`,
            { id }
        )

        return rows[0] || null
    }


}

