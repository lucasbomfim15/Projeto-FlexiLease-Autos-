import app from '@shared/http/app';
import conn from "@shared/db/conn"
import routes from './routes/index';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';


const PORT = process.env.PORT || 3000;



const setupSwagger = () => {
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API FlexiLease Autos',
        version: '1.0.0',
        description: 'Documentação da API do Projeto FlexiLease Autos',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'User ID',
              },
              name: {
                type: 'string',
                description: 'User name',
              },
              email: {
                type: 'string',
                format: 'email',
                description: 'User email address',
              },
            },
          },
          Car: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                description: 'Car ID',
              },
              model: {
                type: 'string',
                description: 'Model of the car',
              },
              color: {
                type: 'string',
                description: 'Color of the car',
              },
              year: {
                type: 'integer',
                description: 'Year of manufacture',
                minimum: 1950,
                maximum: 2023,
              },
              value_per_day: {
                type: 'number',
                description: 'Value per day for renting',
              },
              accessories: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      description: 'Accessory ID',
                    },
                    description: {
                      type: 'string',
                      description: 'Description of the accessory',
                    },
                  },
                },
                description: 'List of accessories',
              },
              number_of_passengers: {
                type: 'integer',
                description: 'Number of passengers the car can carry',
              },
            },
            required: ['model', 'color', 'year', 'value_per_day', 'accessories', 'number_of_passengers'],
          },
          Reserve: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                description: 'Reserve ID',
              },
              user_id: {
                type: 'string',
                description: 'User ID',
              },
              car_id: {
                type: 'string',
                description: 'Car ID',
              },
              start_date: {
                type: 'string',
                format: 'date',
                description: 'Start date of the reservation',
              },
              end_date: {
                type: 'string',
                format: 'date',
                description: 'End date of the reservation',
              },
              total_value: {
                type: 'number',
                description: 'Total value of the reservation',
              },
            },
            required: ['user_id', 'car_id', 'start_date', 'end_date', 'total_value'],
          },

        },
      },
      security: [{ bearerAuth: [] }],

    },
    
    apis: [
      './src/shared/http/routes/*.ts',
      './src/modules/reserves/controllers/*.ts',
      './src/modules/reserves/routes/*.ts',
      './src/modules/cars/controllers/*.ts',
      './src/modules/cars/routes/*.ts',
      './src/modules/users/controllers/*.ts',
      './src/modules/users/routes/*.ts',
    ],
    
  };
 
  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        docExpansion: 'none',
        filter: true,
        showRequestHeaders: true,
      },
      customSiteTitle: 'FlexiLease Autos API Documentation',
      customCss: '.swagger-ui .topbar { display: none }',
    }),
  );
};

 
conn()
  .then(() => {
    app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
    setupSwagger()
    app.use('/', routes)
  })
  .catch((error) => {
    console.log('Connection with database generated an error:\r\n');
    console.error(error);
    console.log('\r\nServer initialization cancelled');
    process.exit(0);
  });

//Q1IPVdaQJAj39pdc