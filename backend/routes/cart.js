const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");

//add book to cart
router.put('/add-to-cart',authenticateToken, async(req,res) => {
    try{
        const {book_id, id} =req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(book_id);
        if(isBookInCart){
           return res.status(200).json({ message: "Book is already in cart" });
        }
        await User.findByIdAndUpdate(id,{ $push: {cart: book_id}})
        return res.status(200).json({ message: "Book added to cart" });
    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put('/remove-from-cart/:book_id',authenticateToken, async(req,res) => {
    try{
        const {book_id} = req.params;
        const {id} =req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(book_id);
        if(isBookInCart){
            await User.findByIdAndUpdate(id,{ $pull: {cart: book_id}})
        }
        return res.status(200).json({ message: "Book removed from cart" });
    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/get-user-cart',authenticateToken, async(req,res) => {
    try{
        const {id} =req.headers;
        const userData = await User.findById(id).populate("cart");
        const userCart = userData.cart.reverse();
        return res.json({ status: "Success",data: userCart });
    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;