import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
  status: String,
  price: Number,
  pagesRead: Number,
  format: String,
  suggestedBy: String,
  finished: Boolean,
});

export const BookModel = mongoose.model("Book", BookSchema);