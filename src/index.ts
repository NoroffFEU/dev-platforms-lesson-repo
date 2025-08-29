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

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((product) => product.id === id);
  console.log(product);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

app.get("/products", (req, res) => {
  const id = Number(req.query.id);

  const product = products.find((product) => product.id === id);
  console.log(product);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
