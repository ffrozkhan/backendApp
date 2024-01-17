import express from "express";
import { homeController } from "./controllers/homeController.js";
import usersRouter from "./routes/usersRoute.js";
import authRouter from "./routes/authRoutes.js";
import tasksRouter from "./routes/tasksRoutes.js";
import { mydb } from "./config/db.js";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
//test

const app = express();

mydb.connect((error) => {
  if (error) {
    console.log(`Error Connection DB--->, &{error}`.bgRed);
  } else {
    console.log("DB Connected".bgMagenta);
  }
});

app.use(express.json());
app.use(morgan());
dotenv.config();

app.get("/", homeController);

app.use("/api/v1/users", usersRouter);

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/tasks", tasksRouter);

app.listen(6000);
