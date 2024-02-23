import express, { type Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { routes } from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerOutput from './swagger_output.json'

// For env File
dotenv.config()

const app: Application = express()

app.use(express.json())
app.use(express.static('public'))

app.use(cors())

app.use('/', () => {
  console.log('running')
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput))

export { app }
