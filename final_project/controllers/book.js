import book from "../models/book.js";

export async function getAllBooks(req, res) {
  try {
    console.log("ey");
    const books = await book.findAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export async function addBook(req, res) {
  try {
    const foundBook = await book.findOne({ where: req.body });
    if (foundBook) {
      return res.json({ message: "Book Already Found!!" });
    }

    const newBook = await book.create(req.body);
    res.json({ message: "Book Added Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export async function getBooksByTitle(req, res) {
  try {
    const { title } = req.query;

    if (!title) {
      return res.json({ message: "Please, provide a valid title!" });
    }

    const foundBooks = await book.findAll({ where: { title } });
    if (foundBooks.length) {
      return res.json({ message: "Books are Found!!", foundBooks });
    }

    res.json({ message: "No book found with this title!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export async function getBooksByISBN(req, res) {
  try {
    const { isbn } = req.params;

    if (!isbn) {
      return res.json({ message: "Please, provide a valid isbn!" });
    }

    const foundBooks = await book.findOne({ where: { isbn } });

    res.json(foundBooks);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export async function getBooksByAuthor(req, res) {
  try {
    const { author } = req.query;
    if (!author) {
      return res.json({ message: "Please, provide a valid author name!" });
    }

    const foundBooks = await book.findAll({ where: { author } });
    if (foundBooks.length) {
      return res.json({ message: "Books are Found!!", foundBooks });
    }

    res.json({ message: "No book found with this author name!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}
