import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import app from "./src/app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 5000;

/* MongoDB connection */
try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MONGODB connected")
}
catch (err) {
  console.log(err);
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


app.listen(port, () => {
  console.log(`Server is running in PORT ${port}`);
});