// import { createserver } from 'node:http'
import express from 'express'
import moviesRouter from './src/routes/movies.routes.js'
import { isAuth } from './src/middlewares/isAuth.js'
import dotenv from 'dotenv'
import { loadEnvFile } from 'node:process'
import authsRoutes from './src/routes/auth.routes.js'

// dotenv.config() // carga las variables de entorno (.env)
loadEnvFile()

// const server = createserver((req, res)=>{})
const app = express()
const PORT = process.env.PORT || 4321


// middlewares

//capturar los datos que vienen en la peticion y convertirlos a formato json
// e inyectarlo en el objeto body de l a request
app.use(express.json())


//definir las rutas
app.get('/', (req, res) => {
    res.send('<h1>Hola mundo</h1>')
})

//aqui, se define el punto de entrada (endpoint) "/movies"
app.use('/movies', isAuth, moviesRouter)
app.use('/auth', authsRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})