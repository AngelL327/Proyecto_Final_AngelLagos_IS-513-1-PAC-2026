import { pool } from '../config/db.js'

export default class Director {
    static getAll = async () => {
        const [rows] = await pool.query('SELECT id, full_name FROM directors ORDER BY full_name ASC')
        return rows
    }

    static find = async (id) => {
        const [rows] = await pool.query(
            'SELECT id, full_name FROM directors WHERE id = ?',
            [id]
        )

        return rows[0] || null
    }

    static create = async ({ full_name }) => {
        const [result] = await pool.query(
            'INSERT INTO directors(full_name) VALUES(?)',
            [full_name]
        )

        return await Director.find(result.insertId)
    }

    static update = async (id, { full_name }) => {
        await pool.query(
            'UPDATE directors SET full_name = ? WHERE id = ?',
            [full_name, id]
        )

        return await Director.find(id)
    }

    static delete = async (id) => {
        await pool.query('DELETE FROM movie_directors WHERE director_id = ?', [id])
        await pool.query('DELETE FROM directors WHERE id = ?', [id])
    }
}
