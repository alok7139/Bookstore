import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
name:String,
price:Number,
category:String,
image:String,
title:String
})

const Book = mongoose.model('book' , bookSchema);
export default Book;