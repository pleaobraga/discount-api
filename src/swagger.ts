import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'Discount API',
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: '',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    schemas: {
      CartDiscountRequest: {
        type: 'object',
        properties: {
          cart: {
            type: 'object',
            properties: {
              reference: 'string',
              lineItems: {
                type: 'object',
                properties: {
                  name: 'string',
                  price: 'number',
                  sku: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/index.ts']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)
