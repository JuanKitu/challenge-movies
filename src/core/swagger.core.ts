import swaggerJSDoc, { Options, SwaggerDefinition } from 'swagger-jsdoc';
import * as dotenv from 'dotenv';
import path from 'path';

const baseRouteENV = path.join(__dirname, '..', '..');
dotenv.config({ path: `${baseRouteENV}/config/.env` });
const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: process.env.SWAGGER_TITLE || '',
    version: process.env.SWAGGER_VERSION || '',
    description: process.env.SWAGGER_DESCRIPTION,
    contact: {
      name: process.env.SWAGGER_CONTACT_NAME,
      url: process.env.SWAGGER_CONTACT_URL,
    },
  },
  servers: [
    {
      url: process.env.SWAGGER_SERVER_URL,
      description: process.env.SWAGGER_SERVER_DESCRIPTION,
    },
  ],
};
const options: Options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  basePath: process.env.SWAGGER_OPTIONS_BASEPATH,
  apis: [process.env.SWAGGER_OPTIONS_APIS || ''],
};
export default swaggerJSDoc(options);
