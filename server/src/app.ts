import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { addToWaitList } from "./services";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/waitlist", addToWaitList);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("An Unexpected Error Occurred");
});

// MongoDB connection
const uri = process.env.MONGODB_URI || "";
mongoose.connect(uri).then((db) => {
  console.log("Connected to MongoDB");
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
