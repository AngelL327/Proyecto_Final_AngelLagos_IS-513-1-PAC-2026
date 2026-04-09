import * as z from 'zod'

const directorSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(3, 'El nombre del director debe tener al menos 3 caracteres')
    .max(150, 'El nombre del director no debe superar los 150 caracteres')
}).strict()

export const validateDirectorSchema = (director) => {
  return directorSchema.safeParse(director)
}

