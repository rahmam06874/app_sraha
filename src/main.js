import express from "express";
import dotenv from "dotenv";
import bootstrap from "./app.bootstrap.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

bootstrap(app).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
  });
});