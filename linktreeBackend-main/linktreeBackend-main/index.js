"--unhandled-rejections=strict";
import dotenv from "dotenv";
import express from "express";
import "./database/connection.js";
import authRoute from "./routes/authRoute.js";
import analyticsRoute from "./routes/analyticsRoute.js";
import dataRoute from "./routes/dataRoute.js";
import linktreeRoute from "./routes/linktreeRoute.js";
import editRoute from "./routes/editRoute.js";
import themesRoute from "./routes/themesRoute.js";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/auth", authRoute);
app.use("/data", dataRoute);
app.use("/get", linktreeRoute);
app.use("/edit", editRoute);
app.use("/analytics", analyticsRoute);
app.use("/themes", themesRoute);

app.listen(port, (req, res) => {
  console.log(`server started on ${port}`);
});
