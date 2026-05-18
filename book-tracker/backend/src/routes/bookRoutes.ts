import express from "express";
import {
  createBook,
  getBooks,
  updateProgress,
  deleteBook,
} from "../controllers/bookController";

const router = express.Router();

router.post("/", createBook);
router.get("/", getBooks);
router.put("/:id", updateProgress);
router.delete("/:id", deleteBook);

export default router;