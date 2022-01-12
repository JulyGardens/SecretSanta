import shuffleRoute from "@Routes/shuffle";
import userRoute from "@Routes/user";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import logMiddleware from "@Middlewares/logMiddleware";

config({ path: "./.env" });

const PORT = process.env.PORT || 5000;
const server = express();

// MIDDLEWARE
server.use(cors());
server.use(express.json());
server.use(logMiddleware);

// ROUTES
server.use("/api", userRoute);
server.use("/api", shuffleRoute);

server.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
