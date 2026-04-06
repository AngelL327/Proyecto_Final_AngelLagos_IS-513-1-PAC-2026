import Movie from '../service/movie.js'
import { validateMovieSchema, validatePartialMovieSchema } from '../schemas/movie.schema.js'


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
            res.json({
                message: 'Obtener todas las peliculas',
                data: []
            })//server
        }


        const newList = filtered_movies.map((movie) => {

            return {
                ...movie,
                genres: movie.genres.split(', '),
                directors: movie.directors.split(', ')
            }

        })     // [{}]

        // filtered_movies.forEach((movie) => {
        //     movie.genres = movie.genres.split(', ')
        //     movie.directors = movie.directors.split(', ')
        // })

        res.json({
            message: 'Obtener todas las peliculas',
            data: newList
        })//server

    } catch (e) {
        return res.status(500).json({
            message: 'Error al consultar la base de datos: ' + e.message,
            data: null
        })
    }

}

export const getById = async (req, res) => {

    const { id } = req.params

    // if (isNaN(id) || id < 0) {
    //     return res.status(400).json({
    //         message: 'el parametro debe ser un numero'
    //     })
    // }

    //consultar la bbdd
    // const movie = MOVIES.find((movie) => {
    //     return movie.id === id
    // })

    //desde el servicio
    try {
        const [movie] = await Movie.find(id)

        if (!movie) {
            res.status(404).json({
                message: 'pelicula no encontrada',
                data: null
            })
        }

        res.json({
            message: 'Obtener una pelicula por su id',
            data: movie
        })
    } catch {
        res.status(500).json({
            message: 'Error en el server',
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
        res.status(400).json({
            status: 'error',
            message: 'verifique la información enviada',
            errors: errors?.error?.issues || JSON.parse(error.message)
        })
    }


    //TODO: guardar los datos en la base de datos
    // Service / Model
    const newMovie = await Movie.create(data)


    // responder al cliente -> server
    res
        .status(201)
        .json({
            status: 'success',
            message: 'Pelicula creada correctamente',
            data: newMovie
        })
}

export const update = async (req, res) => {

    const { id } = req.params

    const movie = await Movie.find(id)

    if (!movie) {
        return res.status(404).json(
            {
                status: 'error',
                message: 'Pelicula no encontrada'
            }
        )
    }

    const { success, errors, error, data } = validatePartialMovieSchema(req.body)

    if (!success) {
        return res.status(400).json({
            status: 'error',
            message: 'Datos incorrectos',
            errors: errors?.error?.issues || JSON.parse(error.message)
        })
    }

    const updatedMovie = await Movie.update(id, data)

    res.json({
        status: 'success',
        message: 'Pelicula actualizada',
        data: updatedMovie
    })

}

export const deleteMovie = async (req, res) => {
    const { id } = req.params

    const movie = await Movie.find(id)

    if (!movie) {
        return res.status(404).json(
            {
                status: 'error',
                message: 'Pelicula no encontrada'
            }
        )
    }

    await Movie.delete(id)


    res.json({
        status: "success",
        message: "Pelicula eliminada"
    })

}