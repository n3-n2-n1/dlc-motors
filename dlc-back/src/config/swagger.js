import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import __dirname from "../dirname.js";

export const swaggerUi = () => {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.1",
      info: {
        title: "DLC Motors V4 API Documentation",
        description:
          "Hello there! In this document you will find the API definitions for the various modules of this project, with all their routes, responses, schemas and possible inputs. All endpoints that require certain user roles must be tried with a valid token.",
      },
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
  };

  const specs = swaggerJsdoc(swaggerOptions);
  return [swaggerUiExpress.serve, swaggerUiExpress.setup(specs)];
};
