import Genre from '../service/genre.js'
import { validateGenreSchema } from '../schemas/genre.schema.js'

export const getAll = async (req, res) => {
    try {
        const genres = await Genre.getAll()

        return res.json({
            status: 'success',
            message: 'Listado de generos',
            data: genres
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'No se pudieron consultar los generos',
            error: e.message
        })
    }
}

export const getById = async (req, res) => {
    try {
        const genre = await Genre.find(req.params.id)

        if (!genre) {
            return res.status(404).json({
                status: 'error',
                message: 'Genero no encontrado'
            })
        }

        return res.json({
            status: 'success',
            message: 'Genero encontrado',
            data: genre
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'No se pudo consultar el genero',
            error: e.message
        })
    }
}

export const create = async (req, res) => {
    const validation = validateGenreSchema(req.body)

    if (!validation.success) {
        return res.status(400).json({
            status: 'error',
            message: 'Verifique la informacion enviada',
            errors: validation.error.issues
        })
    }

    try {
        const { name } = validation.data
        const genre = await Genre.create({ name })

        return res.status(201).json({
            status: 'success',
            message: 'Genero creado correctamente',
            data: genre
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'No se pudo crear el genero',
            error: e.message
        })
    }
}

export const update = async (req, res) => {
    const validation = validateGenreSchema(req.body)

    if (!validation.success) {
        return res.status(400).json({
            status: 'error',
            message: 'Datos incorrectos',
            errors: validation.error.issues
        })
    }

    try {
        const currentGenre = await Genre.find(req.params.id)

        if (!currentGenre) {
            return res.status(404).json({
                status: 'error',
                message: 'Genero no encontrado'
            })
        }

        const { name } = validation.data
        const genre = await Genre.update(req.params.id, { name })

        return res.json({
            status: 'success',
            message: 'Genero actualizado',
            data: genre
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'No se pudo actualizar el genero',
            error: e.message
        })
    }
}

export const deleteGenre = async (req, res) => {
    try {
        const currentGenre = await Genre.find(req.params.id)

        if (!currentGenre) {
            return res.status(404).json({
                status: 'error',
                message: 'Genero no encontrado'
            })
        }

        await Genre.delete(req.params.id)

        return res.json({
            status: 'success',
            message: 'Genero eliminado'
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'No se pudo eliminar el genero',
            error: e.message
        })
    }
}
