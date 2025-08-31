import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

function checkAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Missing auth" });
  }

  if (authHeader !== "Bearer secret123") {
    return res.status(403).json({ error: "Access denied" });
  }

  next();
}

app.get("/public", (req, res) => {
  res.json({ message: "Public" });
});

app.get("/private", checkAuth, (req, res) => {
  res.json({ message: "Private" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
