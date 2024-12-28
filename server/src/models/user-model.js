import { DataTypes, Sequelize } from "sequelize";
import DBConnection from "../configs/connection";
const MYSQLDB = new DBConnection(); // Instance of MySQL connection
const Connection = MYSQLDB.GetDBConnection();

const UserModel = Connection.define(
  "users",
  {
    full_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    contact: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "users",
  }
);

export default UserModel;
