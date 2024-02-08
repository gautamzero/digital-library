import mongoose from "mongoose";
import app from "./src/app.js";

const port = process.env.PORT || 5000;

/* MongoDB connection */
try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MONGODB connected")
}
catch (err) {
  console.log(err);
} 


app.listen(port, () => {
  console.log(`Server is running in PORT ${port}`);
});