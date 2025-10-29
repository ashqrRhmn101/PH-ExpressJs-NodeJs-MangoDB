const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// DJpK7JY6fetSmOsA
const uri =
  "mongodb+srv://ara:DJpK7JY6fetSmOsA@cluster0.yaijel2.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("Simple crud running...");
});

async function run() {
  try {
    await client.connect();

    const usersDB = client.db("usersDB");
    const userCollection = usersDB.collection("users");

    app.get("/users", async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // ........... Id get..
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("need user id", id);
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    // add database related apis here
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      console.log("Hitting the user info", newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    app.patch("/users/:id", async (req, res) => {
      const id = req.params.id;
      const updateUser = req.body;
      console.log("to update", id, updateUser);
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          name: updateUser.name,
          email: updateUser.email,
        },
      };
      const option = {};
      const result = await userCollection.updateOne(query, update, option);
      res.send(result);
    });

    // Delate User...............
    app.delete("/users/:id", async (req, res) => {
      // console.log(req.params.id)
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
      console.log("delete a user database");
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Crud Port, ${port}`);
});
