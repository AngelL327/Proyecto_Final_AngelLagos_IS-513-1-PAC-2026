import Auth from "../service/auth.js"
import jwt from 'jsonwebtoken';

export default class AuthController {


    static login = async (req, res) => {


        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Debe enviar los datos de inicio de sesión'
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

            //validar que la clave sea correcta
            //TODO: mecanismo de creación de hash de contraseña

            //! IMPOETANTE, ESTO ES TEMPORAL, SE DEBE COMPRAR CON UNA COTRASENIA REAL HASEADA, INTEGRANDO ARGON2 O BCRYPT
            if (password !== user.password_hash) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Credenciales incorrectas'
                })
            }

            // generar el token
            const dataToken = {
                issuer: 'midominio.com',
                username: user.username
            }

            const token = jwt.sign(dataToken, process.env.JWT_SECRET_KEY, {
                expiresIn: '10h'
            })


            // responder al usuario
            res.json(
                {
                    status: 'success',
                    message: 'Bienvenido',
                    data: {
                        user: user.username,
                        email: user.email,
                        token
                    }
                }
            )


        } catch {

            return res.status(500).json({
                status: 'error',
                message: 'Error al realizar la consulta'
            })
        }
    }

}