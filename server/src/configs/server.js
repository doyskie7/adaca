import http from "http";
import app from "../app";
import DBConnection from "./connection";
require("dotenv").config();

const PORT = process.env.PORT;
const server = http.createServer(app);
const db = new DBConnection();

db.DBauthenticate();
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
