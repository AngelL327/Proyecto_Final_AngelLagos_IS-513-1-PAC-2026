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

export const create = async (req, res) => {
    const { full_name } = req.body

    if (!full_name) {
        return res.status(400).json({
            status: 'error',
            message: 'Debe enviar el nombre del director'
        })
    }

    try {
        const director = await Director.create({ full_name })

        return res.status(201).json({
            status: 'success',
            message: 'Director creado correctamente',
            data: director
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'No se pudo crear el director',
            error: e.message
        })
    }
}

export const update = async (req, res) => {
    const { full_name } = req.body

    if (!full_name) {
        return res.status(400).json({
            status: 'error',
            message: 'Debe enviar el nombre del director'
        })
    }

    try {
        const currentDirector = await Director.find(req.params.id)

        if (!currentDirector) {
            return res.status(404).json({
                status: 'error',
                message: 'Director no encontrado'
            })
        }

        const director = await Director.update(req.params.id, { full_name })

        return res.json({
            status: 'success',
            message: 'Director actualizado',
            data: director
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'No se pudo actualizar el director',
            error: e.message
        })
    }
}

export const deleteDirector = async (req, res) => {
    try {
        const currentDirector = await Director.find(req.params.id)

        if (!currentDirector) {
            return res.status(404).json({
                status: 'error',
                message: 'Director no encontrado'
            })
        }

        await Director.delete(req.params.id)

        return res.json({
            status: 'success',
            message: 'Director eliminado'
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'No se pudo eliminar el director',
            error: e.message
        })
    }
}
