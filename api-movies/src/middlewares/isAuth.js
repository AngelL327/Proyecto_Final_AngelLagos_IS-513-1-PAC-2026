
import jwt from 'jsonwebtoken'

export const isAuth = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({
            status: 'error',
            message: 'Acceso denegado: no hay token'
        })
    }

    const [scheme, token] = authorization.split(' ')

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({
            status: 'error',
            message: 'Acceso denegado: formato de token invalido'
        })
    }

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = tokenDecoded
        next()
    } catch {
        return res.status(401).json({
            status: 'error',
            message: 'Acceso denegado: token invalido'
        })
    }
}