import { Request, Response } from "express";
import { BookModel } from "../models/BookModel";
// IMPORT YOUR ENUMS FROM YOUR TYPESCRIPT FILE
import { Status, Format } from "../models/Book"; // Adjust path if needed

// CREATE BOOK
export const createBook = async (req: Request, res: Response) => {
  const book = req.body;

  const pages = Number(book.pages);
  const pagesRead = Number(book.pagesRead);

  book.pages = pages;
  book.pagesRead = pagesRead;

  // STRICT RULES
  book.finished = pagesRead >= pages;

  if (book.finished) {
    book.status = Status.Read; // Auto-correct to Read using Enum
  } else if (book.status === Status.Read && !book.finished) {
    book.status = Status.CurrentlyReading; // Demote if they lied
  }

  const saved = await BookModel.create(book);
  res.json(saved);
};

// GET ALL BOOKS
export const getBooks = async (_: Request, res: Response) => {
  const books = await BookModel.find();
  res.json(books);
};

// UPDATE PROGRESS AND STATUS
export const updateProgress = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { pagesRead, status } = req.body; 

  const book = await BookModel.findById(id);
  if (!book) return res.status(404).send("Not found");

  // 1. Update the raw values
  book.pagesRead = Number(pagesRead);
  book.finished = book.pagesRead >= (book.pages || 0);

  // 2. Apply the user's manually selected status FIRST
  if (status) {
    book.status = status; 
  }

  // 3. SMART CORRECTIONS using Enums
  if (book.status === Status.Read && !book.finished) {
    book.status = Status.CurrentlyReading; 
  } else if (book.finished && (book.status === Status.CurrentlyReading || book.status === Status.WantToRead)) {
    book.status = Status.Read; 
  } else if (book.pagesRead > 0 && book.status === Status.WantToRead) {
    book.status = Status.CurrentlyReading;
  }

  await book.save();
  res.json(book);
};

// DELETE BOOK
export const deleteBook = async (req: Request, res: Response) => {
  await BookModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};