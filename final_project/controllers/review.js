import review from "../models/review.js";

export async function addReview(req, res) {
  try {
    // data to be stored
    console.log(req.user);
    const { user_id } = req.user;
    console.log(user_id);
    const book_id = req.params.id;
    const { review_text } = req.body;
    console.log("review_text ", review_text);
    // console.log(user_id, book_id, review_text);

    // check if the review is found or not to decide to create a new one or update the existing one
    const foundReview = await review.findOne({
      where: { user_id: user_id, book_isbn: book_id },
    });

    if (foundReview) {
      const newReview = await review.update(
        { review_text },
        { where: { user_id: user_id, book_isbn: book_id } }
      );
      return res.json({ message: `Review added/updated successfully!` });
    }

    // execute adding review operation
    const newReview = await review.create({
      user_id: user_id,
      book_isbn: book_id,
      review_text,
    });
    res.json({ message: `Review added/updated successfully!` });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export async function getReview(req, res) {
  try {
    const { id } = req.params;
    console.log("id ", id);
    const bookReview = await review.findAll({
      attributes: ["review_text"],
      where: { book_isbn: id },
    });

    console.log("bookReview", bookReview);

    if (!bookReview.length) {
      return res.json({ message: "No review found for this book!" });
    }

    res.json({ message: "review found for this book", bookReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export async function deleteReview(req, res) {
  try {
    const { user_id } = req.user;
    const { id } = req.params;

    const deletedReview = await review.destroy({
      where: { BookId: id },
    });
    // console.log(deletedReview);

    if (!deletedReview) {
      return res.json({ message: "No review found for that user to delete!" });
    }

    res.json({ message: "review deleted for that user successfully!" });
  } catch (error) {
    res.status(200).json({ message: "Deleted" });
  }
}
