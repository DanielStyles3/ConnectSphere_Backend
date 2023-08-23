const express = require("express");
const app = express();
// const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts") 

dotenv.config();

// Update mongoose.connect to use async/await
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Use userRouter for user routes
app.use("/api/users", userRouter);
// Use authRouter for user routes
app.use("/api/auth", authRouter)
//Use postRouter for post routes
app.use("/api/posts",postRouter)
// Use the cors middleware
// app.use(cors());


// app.get("/", (req, res) => {
//     res.send("welcome to homepage");
//   });

//   app.get("/users", (req, res) => {
//     res.send("welcome to user page");
//   });
  

app.listen(8000, () => {
  console.log("Backend Server is running");
});
