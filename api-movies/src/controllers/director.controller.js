import Director from '../service/director.js'

export const getAll = async (req, res) => {
    try {
        const directors = await Director.getAll()

        return res.json({
            status: 'success',
            message: 'Listado de directores',
            data: directors
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'No se pudieron consultar los directores',
            error: e.message
        })
    }
}

export const getById = async (req, res) => {
    try {
        const director = await Director.find(req.params.id)

        if (!director) {
            return res.status(404).json({
                status: 'error',
                message: 'Director no encontrado'
            })
        }

        return res.json({
            status: 'success',
            message: 'Director encontrado',
            data: director
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'No se pudo consultar el director',
            error: e.message
        })
    }
}

