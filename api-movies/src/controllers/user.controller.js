
import { pool } from '../config/db.js'


class User {

  static async findUserByUsername(username) {

    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    )

    return rows
  }

  static async create({ username, email, password_hash }) {

    const [result] = await pool.query(
      `
      INSERT INTO users(username,email,password_hash)
      VALUES(?,?,?)
      `,
      [username, email, password_hash]
    )

    return result
  }

}

export default User