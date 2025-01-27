import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";

// models
import book from "./book.js";
import user from "./user.js";

const review = sequelize.define(
  "review",
  {
    review_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: user, // Referencia al modelo user
        key: "id", // Clave primaria del modelo user
      },
      onDelete: "CASCADE", // Elimina reseñas si el usuario es eliminado
    },
    book_isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: book, // Referencia al modelo book
        key: "ISBN", // Clave primaria del modelo book
      },
      onDelete: "CASCADE", // Elimina reseñas si el libro es eliminado
    },
  },
  {
    tableName: "review", // Nombre exacto de la tabla
    freezeTableName: true, // Desactiva la pluralización automática
    timestamps: false, // Desactiva createdAt y updatedAt
  }
);

// Relación Muchos a Muchos
user.belongsToMany(book, { through: review });
book.belongsToMany(user, { through: review });

export default review;
