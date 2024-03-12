import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connnectDb from "./config/dbconfig.js";

dotenv.config({ path: "./config.env" });

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* Put error middleware below this comment*/

/* ROUTES */
app.get("/", (req, res) => {
  res.send("Hello fakah");
});

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
