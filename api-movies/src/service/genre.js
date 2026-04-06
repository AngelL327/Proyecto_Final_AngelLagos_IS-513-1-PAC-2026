import { pool } from '../config/db.js'

export default class Genre {

    static getAll = async () => {
        const [rows] = await pool.query('SELECT id, name FROM genres ORDER BY name ASC')
        return rows
    }

    static find = async (id) => {
        const [rows] = await pool.query(
            'SELECT id, name FROM genres WHERE id = ?',
            [id]
        )

        return rows[0] || null
    }
    static create = async ({ name }) => {
        const [result] = await pool.query(
            'INSERT INTO genres(name) VALUES(?)',
            [name]
        )

        return await Genre.find(result.insertId)
    }
    
    static update = async (id, { name }) => {
        await pool.query(
            'UPDATE genres SET name = ? WHERE id = ?',
            [name, id]
        )

        return await Genre.find(id)
    }

    static delete = async (id) => {
        await pool.query('DELETE FROM movie_genres WHERE genre_id = ?', [id])
        await pool.query('DELETE FROM genres WHERE id = ?', [id])
    }



}
