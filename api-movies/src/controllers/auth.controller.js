import Auth from '../service/auth.js'
import User from '../service/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const SALT_ROUNDS = 10

export default class AuthController {
    static register = async (req, res) => {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Debe enviar username, email y password'
            })
        }

        try {
            const users = await User.findUserByUsername(username)
            const existingUser = users[0]

            if (existingUser) {
                return res.status(409).json({
                    status: 'error',
                    message: 'El usuario ya existe'
                })
            }

            const password_hash = await bcrypt.hash(password, SALT_ROUNDS)
            await User.create({ username, email, password_hash })

            return res.status(201).json({
                status: 'success',
                message: 'Usuario registrado correctamente'
            })
        } catch (e) {
            return res.status(500).json({
                status: 'error',
                message: 'Error al registrar el usuario',
                error: e.message
            })
        }
    }

    static login = async (req, res) => {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Debe enviar los datos de inicio de sesion'
            })
        }

        try {
            const [user] = await Auth.login({ username })

            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Credenciales incorrectas'
                })
            }

            const isValidPassword = await bcrypt.compare(password, user.password_hash)

            if (!isValidPassword) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Credenciales incorrectas'
                })
            }

            const dataToken = {
                issuer: 'midominio.com',
                username: user.username
            }

            const token = jwt.sign(dataToken, process.env.JWT_SECRET_KEY, {
                expiresIn: '10h'
            })

            return res.json({
                status: 'success',
                message: 'Bienvenido',
                data: {
                    user: user.username,
                    email: user.email,
                    token
                }
            })
        } catch (e) {
            return res.status(500).json({
                status: 'error',
                message: 'Error al realizar la consulta',
                error: e.message
            })
        }
    }
}
