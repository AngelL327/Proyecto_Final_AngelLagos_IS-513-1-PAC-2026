import * as z from 'zod'

const genreSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'El nombre del género debe tener al menos 3 caracteres')
    .max(50, 'El nombre del género no debe superar los 50 caracteres')
}).strict()

export const validateGenreSchema = (genre) => {
  return genreSchema.safeParse(genre)
}

