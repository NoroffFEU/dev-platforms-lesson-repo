import express from "express";

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
});

app.get("/products/:id", (req, res) => {
  console.log("req.params", req.params.id);

  const { id } = req.params;

  res.json(`ID is ${id}`);
});

app.get("/products/:productId/reviews/:reviewId", (req, res) => {
  const { productId, reviewId } = req.params;

  res.json(`productId is ${productId}, reviewId is ${reviewId}`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
