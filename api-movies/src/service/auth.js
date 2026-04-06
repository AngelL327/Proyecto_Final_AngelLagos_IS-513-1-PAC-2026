
import { pool } from '../config/db.js'

export default class Auth {


    static login = async ({ username }) => {

        const [rows] = await pool.query(` select *FROM users where username = :username `, { username })

        return rows


    }

}