import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  // console.log(req.headers);
  console.log(req.headers.authorization);
  console.log(req.headers["content-type"]);

  res.json({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
