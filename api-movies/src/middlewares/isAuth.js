
import jwt from 'jsonwebtoken'


export const isAuth = (req, res, next) => {
    //verificar si quien accede al recurso está autenticado

    const { authorization } = req.headers // Bearer ey1243.3242341.12rfrd423

    const token = authorization.split(' ')[1]

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        //TODO: modificar la req

        next()// permite el paso a la siguente parte del ciclo de vida de la peticion
    }
    catch {
        return res.json({
            status: 'error',
            "message": "acceso denegado"
        })
    }

}