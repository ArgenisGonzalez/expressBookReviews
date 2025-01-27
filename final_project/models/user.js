import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";

const user = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Asegura que no haya nombres duplicados
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user", // Asegura que Sequelize utilice exactamente este nombre
    freezeTableName: true, // Desactiva la pluralización automática
    timestamps: false, // Si no necesitas createdAt y updatedAt
  }
);

export default user;
