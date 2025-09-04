import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1672531200000, name: "John Doe", email: "john@example.com" },
  { id: 1672531260000, name: "Jane Smith", email: "jane@example.com" },
];

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

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", checkAuth, (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Bad data" });
  }

  const id = Date.now();

  const user: User = { id, name, email };
  users.push(user);

  res.status(201).json(user);
});

app.put("/users/:id", checkAuth, (req, res) => {
  const userId = Number(req.params.id);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Id must be a number" });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Bad data" });
  }

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users[userIndex] = { id: userId, name, email };

  res.json(users[userIndex]);
});

app.patch("/users/:id", checkAuth, (req, res) => {
  const userId = Number(req.params.id);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Id must be a number" });
  }

  const updates = req.body;

  if (!updates.name && !updates.email) {
    return res
      .status(400)
      .json({ error: "At least one of name or email should exist" });
  }

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  users[userIndex] = { ...users[userIndex], ...updates };

  res.json(users[userIndex]);
});

app.delete("/users/:id", checkAuth, (req, res) => {
  const userId = Number(req.params.id);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Id must be a number" });
  }

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(userIndex, 1);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
