import Movie from '../service/movie.js'
import { validateMovieSchema, validatePartialMovieSchema } from '../schemas/movie.schema.js'

const formatMovie = (movie) => ({
    ...movie,
    genres: movie.genres ? movie.genres.split(', ') : [],
    directors: movie.directors ? movie.directors.split(', ') : []
})

export const getAll = async (req, res) => {

    const { query } = req // server

    //TODO: capturar los errores que puedan venir de la bbdd
    const dataFilter = {}

    if (query.genre) dataFilter.genre = query.genre
    if (query.director) dataFilter.director = query.director
    if (query.year) dataFilter.year = query.year

    //consulta a la bbdd (service/model)
    try {

        const filtered_movies = await Movie.getAll(dataFilter)


        if (!filtered_movies) {
            return  res.json({
                message: 'Obtener todas las peliculas',
                data: filtered_movies.map(formatMovie)
            })//server
        }

    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al consultar la base de datos: ' + e.message,
            error: e.message,
            data: null
        })
    }

}

export const getById = async (req, res) => {

    const { id } = req.params

    try {
        const [movie] = await Movie.find(id)

        if (!movie) {
            return res.status(404).json({
                status: 'error',
                message: 'pelicula no encontrada',
                data: null
            })
        }

        return res.json({
            message: 'Obtener una pelicula por su id',
            data: formatMovie(movie)
        })
    } catch {
        res.status(500).json({
            message: 'Error en el server',
            error: e.message,
            data: null
        })
    }
}

export const create = async (req, res) => {

    //obtener los datos
    const body = req.body // server

    // validar que los datos sean correctos -> server
    const { success, data, error, errors } = validateMovieSchema(body)

    if (!success) {
        return res.status(400).json({
            status: 'error',
            message: 'verifique la información enviada',
            errors: errors?.error?.issues || JSON.parse(error.message)
        })
    }

    try {
    const newMovie = await Movie.create(data)

    return res.status(201).json({
            status: 'success',
            message: 'Pelicula creada correctamente',
            data: newMovie
        })
    } catch (e) {
    return res.status(500).json({
        status: 'error',
        message: 'No se pudo crear la pelicula: ' + e.message,
        data: e.message
    })
}

}


export const update = async (req, res) => {

    const { id } = req.params
    const { success, errors, error, data } = validatePartialMovieSchema(req.body)
    if (!success) {
        return res.status(400).json({
            status: 'error',
            message: 'Datos incorrectos',
            errors: errors?.error?.issues || JSON.parse(error.message)
        })
    }

   try {
    const movie = await Movie.find(id)

    if (!movie) {
        return res.status(404).json(
            {
                status: 'error',
                message: 'Pelicula no encontrada'
            }
        )
    }
    const updatedMovie = await Movie.update(id, data)

    return res.json({
        status: 'success',
        message: 'Pelicula actualizada',
        data: updatedMovie
    })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'No se pudo actualizar la pelicula',
            error: e.message
        })
    }

}

export const deleteMovie = async (req, res) => {
    const { id } = req.params

     try {
        const movie = await Movie.find(id)

        if (!movie) {
            return res.status(404).json({
                status: 'error',
                message: 'Pelicula no encontrada'
            })
        }

        await Movie.delete(id)

        return res.json({
            status: 'success',
            message: 'Pelicula eliminada'
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'No se pudo eliminar la pelicula',
            error: e.message
        })
    }

}