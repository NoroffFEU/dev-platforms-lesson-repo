import express from "express";
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

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
