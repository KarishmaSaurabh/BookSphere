const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//add book to favourite
router.put("/add-book-to-favourites", authenticateToken, async (req, res) => {
  try {
    const { book_id, id } = req.headers;
    const userData = await User.findById(id);
    const isBookInFavourites = userData.favourites.includes(book_id);
    if (isBookInFavourites) {
      return res.status(200).json({ message: "Book is already in favourites" });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: book_id } });
    return res.status(200).json({ message: "Book added to favourites" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put(
  "/remove-book-from-favourites",
  authenticateToken,
  async (req, res) => {
    try {
      const { book_id, id } = req.headers;
      const userData = await User.findById(id);
      const isBookInFavourites = userData.favourites.includes(book_id);
      if (isBookInFavourites) {
        await User.findByIdAndUpdate(id, { $pull: { favourites: book_id } });
      }
      return res.status(200).json({ message: "Book removed from favourites" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
//get favourite books of particular user
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");
    const allFavouriteBooks = userData.favourites;
    return res.json({ status: "Success", data: allFavouriteBooks });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
