import { Router } from "express";
import * as bookControllers from "../controllers/book.js";

const router = Router();

router.get("/books", bookControllers.getAllBooks);
router.get("/books/byTitle", bookControllers.getBooksByTitle);
router.get("/books/byAuthor", bookControllers.getBooksByAuthor);
router.get("/books/:isbn", bookControllers.getBooksByISBN);
router.post("/books", bookControllers.addBook);

export default router;
