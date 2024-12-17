import { Application, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import YAML from "yamljs";

const swaggerDocument = YAML.load(path.join(__dirname, "../docs/openapi.yaml"));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Playas API with Swagger",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger for an personal project of Peruvian Signs Language",
    },
  },
  apis: ["src/routes/*.ts"],
};

const specs = swaggerJSDoc(options);

const swaggerDocs = (app: Application, port: string | number) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get("/api/docs.json", (_, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });

  console.log(`Swagger docs available at http://localhost:${port}/api/docs`);
  console.log(
    `Swagger docs available at https://signs-lang-pe.up.railway.app/api/docs`,
  );
};

export default swaggerDocs;
