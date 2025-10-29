const express = require("express");
const cors = require("cors");
const cards = require("./cards.json");
const app = express();
const port = 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World, It's My first project..........");
});

app.get("/data", (req, res) => {
  res.send("More Data");
});

app.get("/cards", (req, res) => {
  res.send(cards);
});

app.get("/cards/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log("Cards Id", id);
  const card = cards.find((card) => card.id === id || {});
  res.send(card);
});

app.listen(port, () => {
  console.log(`Listen Port ${port}`);
});
