import { Sequelize, Model, DataTypes } from "@sequelize/core";
import { database } from "../constants";
import { initUser } from "./User";

export const sequelize = new Sequelize(
  database.db_name,
  database.db_user,
  database.db_password,
  {
    dialect: "mysql",
    host: database.host,
    port: Number(database.port),
  }
);

initUser(sequelize);
