import { Sequelize } from "sequelize";
require("dotenv").config();

class DBConnection {
  constructor() {
    this.sequelize = new Sequelize({
      dialect: "mysql",
      host: process.env.MYSQL_DB_HOST,
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      logging: false,
    });
  }

  async DBauthenticate() {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  GetDBConnection() {
    return this.sequelize;
  }
}

module.exports = DBConnection;
