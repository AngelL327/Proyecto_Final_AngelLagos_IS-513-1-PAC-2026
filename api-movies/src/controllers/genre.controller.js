import Genre from '../service/genre.js'

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