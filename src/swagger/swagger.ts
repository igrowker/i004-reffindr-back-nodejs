import 'dotenv/config'
import { Express } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

const { DEPLOY_URL } = process.env

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
        url: `${DEPLOY_URL}`,
        description: 'Deployment Server',
      },
      { 
        url: `http://localhost:3000`, 
        description: 'Local server'
       }
    ],
  },
  apis: ['./src/swagger/*.yaml'],
}

const swaggerSpec = swaggerJSDoc(options)

const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
}

export default setupSwagger
