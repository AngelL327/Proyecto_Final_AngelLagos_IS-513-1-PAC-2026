// import { createserver } from 'node:http'
import express from 'express'
import moviesRouter from './src/routes/movies.routes.js'
import { isAuth } from './src/middlewares/isAuth.js'
import { loadEnvFile } from 'node:process'
import authsRoutes from './src/routes/auth.routes.js'
import genreRouter from './src/routes/genre.routes.js'
import directorRouter from './src/routes/actor.routes.js'
import { pool } from './src/config/db.js'

loadEnvFile()

// const server = createserver((req, res)=>{})
const app = express()
const PORT = process.env.PORT || 4321


// middlewares

//capturar los datos que vienen en la peticion y convertirlos a formato json
// e inyectarlo en el objeto body de l a request
app.use(express.json())

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users')
    res.json({
      status: 'success',
      message: 'Conexión a DB correcta',
      data: rows
    })
  } catch (err) {
    console.error('Error en DB:', err)
    res.status(500).json({
      status: 'error',
      message: 'No se pudo conectar a la base de datos',
      error: err.message
    })
  }
})
//definir las rutas
app.get('/', (req, res) => {
    res.send('<h1>Hola mundo</h1>')
})

//aqui, se define el punto de entrada (endpoint) "/movies"
app.use('/movies', isAuth, moviesRouter)
app.use('/genres', isAuth, genreRouter)
app.use('/directors', isAuth, directorRouter)
app.use('/auth', authsRoutes)

// Manejo de error de JSON inválido (express.json / body-parser)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 'error',
      message: 'JSON inválido en el body. Revisa comas, llaves y que no haya texto extra después del JSON.'
    })
  }

  return next(err)
})

// Fallback de errores en JSON (evita respuestas HTML por defecto)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Error interno del servidor'
  })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
