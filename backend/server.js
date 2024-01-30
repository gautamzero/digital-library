import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bookRoutes from "./src/routes/books.js";

/* App Config */
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

/* Middlewares */
app.use(express.json());
app.use(cors());

/* API Routes */
app.use("/api/books", bookRoutes);

/* MongoDB connection */
try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MONGODB connected")
}
catch (err) {
  console.log(err);
} 

app.get("/", (req, res) => {
  res.status(200).send("Welcome to digital library");
});

/* Port Listening In */
app.listen(port, () => {
  console.log(`Server is running in PORT ${port}`);
});
