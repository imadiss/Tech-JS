import express from "express";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);

export default app;