import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";

const book = sequelize.define(
  "book",
  {
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true, // Define ISBN como clave primaria
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "book", // Asegura que Sequelize utilice exactamente este nombre
    freezeTableName: true, // Desactiva la pluralización automática
    timestamps: false, // Si no necesitas createdAt y updatedAt
  }
);

export default book;
