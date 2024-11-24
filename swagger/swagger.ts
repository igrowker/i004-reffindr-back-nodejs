import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import 'dotenv/config'
import { Express } from 'express'

const { PORT } = process.env

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bff Node Reffindr',
      version: '0.0.1',
      description: 'Reffindr Node',
    },
    contact: {
      name: 'Jack',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Local Server',
      },
    ],
  },
  apis: ['./swagger/*.yaml'],
}

const swaggerSpec = swaggerJSDoc(options)

const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
}

export default setupSwagger
