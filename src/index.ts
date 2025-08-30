import express, { NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next: NextFunction) => {
  console.log("Middleware here");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware two");
  next();
});

app.get("/", (req, res) => {
  console.log("I am the route handler");

  res.json({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
