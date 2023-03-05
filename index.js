const express = require("express");
const noteRoutes = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
mongoose.set("strictQuery", false);
app.use(express.json());
const port = process.env.PORT 
mongoose.connect(process.env.DATABASE_URL )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.use("/users", userRouter);
app.use("/notes", noteRoutes);
