import shuffleRoute from "@Routes/shuffle";
import userRoute from "@Routes/user";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import log from "@Helpers/Middlewares/log";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

config({ path: "./.env" });

const PORT = process.env.PORT || 5000;
const server = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "0.0.1",
      description: "API for Secret Santa game!",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/Routes/*.ts"],
};
const specs = swaggerJsDoc(options);

// MIDDLEWARE
server.use(cors());
server.use(express.json());
server.use(log);
server.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// ROUTES
server.use("/api", userRoute);
server.use("/api", shuffleRoute);

server.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
