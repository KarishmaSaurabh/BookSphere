const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book")
const {authenticateToken} = require("./userAuth");

//add book ---admin
router.post("/add-book",authenticateToken, async (req,res) =>{
    try{
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin"){
            return res.status(400).json({ message: "You are not having access to add the book" });
        }
         const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
         });
         await book.save();
         res.status(200).json({message: "Book Added Successfully"})
    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }
})
//update book
router.put("/update-book", authenticateToken, async (req,res) =>{
    try{
        const {book_id } = req.headers;
       await Book.findByIdAndUpdate(book_id,{
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
         });
         return res.status(200).json({message: "Book Updated Successfully"})
    }
    catch(err){
        res.status(500).json({ message: "An Error occurred while updating book" });
    }
})
//delete book
router.delete("/delete-book", authenticateToken, async (req,res) =>{
    try{
        const {book_id } = req.headers;
       await Book.findByIdAndDelete(book_id);
         return res.status(200).json({message: "Book Deleted Successfully"})
    }
    catch(err){
        res.status(500).json({ message: "An Error occurred while deleting the book" });
    }
})
//get all books
router.get("/get-all-books", async (req,res) =>{
    try{
       const books = await Book.find().sort({createdAt:-1});
         return res.status(200).json({status: "Success", data: books})
    }
    catch(err){
        res.status(500).json({ message: "An Error occurred" });
    }
})
//get recently added books limit 4
router.get("/get-recent-books", async (req,res) =>{
    try{
       const books = await Book.find().sort({createdAt:-1}).limit(4);
         return res.status(200).json({status: "Success", data: books})
    }
    catch(err){
        res.status(500).json({ message: "An Error occurred" });
    }
})
//get book by id
router.get("/get-book-by-id/:id", async (req,res) =>{
    try{
        const {id} = req.params;
       const book = await Book.findById(id)
         return res.status(200).json({status: "Success", data: book})
    }
    catch(err){
        res.status(500).json({ message: "An Error occurred" });
    }
})
module.exports = router;