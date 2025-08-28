import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Headphones", price: 150 },
  { id: 3, name: "Keyboard", price: 80 },
];

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.get("/products", (req, res) => {
  res.json(products);
  res.json;
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
