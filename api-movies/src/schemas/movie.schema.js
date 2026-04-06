import * as z from 'zod'


const movieSchema = z.object({
    "title": z.string('El titulo debe ser un string').min(2).max(100, 'no debe superar los 100 caracteres'),
    "director": z.array(z.int().positive(), "naaaa").min(1),
    "posterUrl": z.url().nullable(),
    "genre": z.array(z.int('el valor debe ser numerico').positive(), 'Los generos deben ser un arreglo de enteros').min(1).nullable(),
}).strict()

export const validateMovieSchema = (movie) => {
    return movieSchema.safeParse(movie)
}

export const validatePartialMovieSchema = (movie) => {
    return movieSchema.partial().safeParse(movie)
}