const express = require("express");
const app = express();
const cors = require("cors"); // CORS
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("user server is available....");
});

const users = [
  { id: 1, name: "simla", email: "simla@gmail.com" },
  { id: 2, name: "sima", email: "sima@gmail.com" },
  { id: 3, name: "kimla", email: "kimla@gmail.com" },
];

app.get("/users", (req, res) => {
  res.send(users);
});

app.listen(port, () => {
  console.log(`User Server started on Port: ${port}`);
});
