import { Router } from 'express'
import { create, deleteGenre, getAll, getById, update } from '../controllers/genre.controller.js'

const genreRouter = Router()

genreRouter.get('/', getAll)
genreRouter.get('/:id', getById)
genreRouter.post('/', create)
genreRouter.put('/:id', update)
genreRouter.delete('/:id', deleteGenre)

export default genreRouter
