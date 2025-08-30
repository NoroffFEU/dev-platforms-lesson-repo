import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

function reqDuration(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`Duration: ${duration}`);
  });

  next();
}

function mwOne(req: Request, res: Response, next: NextFunction) {
  console.log("One");

  next();
}

function mwTwo(req: Request, res: Response, next: NextFunction) {
  console.log("Two");
  next();
}

// app.use("/api", reqDuration);

app.get("/", mwOne, mwTwo, (req, res) => {
  res.json({ message: "Hello" });
});

// app.get("/api/users", (req, res) => {
//   res.json({ message: "Users" });
// });

// app.get("/api/products", (req, res) => {
//   res.json({ message: "Procucts" });
// });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
