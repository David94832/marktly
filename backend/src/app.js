// Configureert de Express-app: middleware en routes. Los van server.js zodat de app testbaar is zonder poort te openen.
import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'
import './db/db.js' // initialiseert de database + schema zodra de app laadt

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', routes)

export default app
