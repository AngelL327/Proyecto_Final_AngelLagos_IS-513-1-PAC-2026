import * as z from 'zod'

const movieSchema = z.object({
    title: z.string().min(2, 'El titulo debe tener al menos 2 caracteres').max(100, 'El titulo no debe superar los 100 caracteres'),
    release_year: z.int('El anio de estreno debe ser numerico').positive('El anio de estreno debe ser positivo'),
    synopsis: z.string().min(10, 'La sinopsis debe tener al menos 10 caracteres'),
    genres: z.array(z.int('Cada genero debe ser numerico').positive('Cada genero debe ser positivo')).min(1, 'Debe enviar al menos un genero'),
    directors: z.array(z.int('Cada director debe ser numerico').positive('Cada director debe ser positivo')).min(1, 'Debe enviar al menos un director')
}).strict()

export const validateMovieSchema = (movie) => {
    return movieSchema.safeParse(movie)
}

export const validatePartialMovieSchema = (movie) => {
    return movieSchema.partial().safeParse(movie)
}
