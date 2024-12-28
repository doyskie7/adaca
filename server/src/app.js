import express from "express";
import fs from 'fs';
import path from "path"
import cors from "cors";
import userRoute from "./routes/user-route";
import morgan from 'morgan';

require("dotenv").config();

const app = express();
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use("/v1/adaca/", userRoute);

module.exports = app;
