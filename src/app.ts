import express, { type Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import swaggerUi from 'swagger-ui-express'


// For env File
dotenv.config()

const app: Application = express()

app.use(express.json())
app.use(express.static('public'))

app.use(cors())

app.use('/', () => {
    console.log('running')
})

export { app }
