import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/auth.js";
import connnectDb from "./config/dbconfig.js";

import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config({ path: "./config.env" });

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/auth", router);

/* Put error middleware below this comment*/
app.use(errorHandler());

/* Start Local Server and Database Connection */
const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  try {
    await connnectDb();
    await app.listen(PORT, console.log(`Server is listening to port ${PORT}`));
  } catch (error) {
    console.log(error.message);
  }
};

startServer();
