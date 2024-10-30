const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const cors = require("cors");

const man = require("./man.json");

const app = express();


const port = 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world..");
});

app.get("/man", (req, res) => {
  res.send(man);
});

const uri =
  "mongodb+srv://jyaffa1233:NeHJmRHGGzEmRkj9@cluster0.rltnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const products = client.db("productDB").collection("product");


    app.get("/product",async(req,res) =>{
      const cousor = products.find();
      const results = await cousor.toArray();
      res.send(results);
    })

    app.post("/man/product", async (req, res) => {
      const fucking = req.body;
      console.log("port is hitiing", fucking);
      const result = await products.insertOne(fucking);
      res.send(result)

    });

    app.delete('/product/:id',async(req,res)=>{
      const id = req.params.id;
      console.log('place delete form database',id)
      const query = {_id: new ObjectId(id)};
      const result = await products.deleteOne(query);
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/man/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const fuck = man.find((abc) => abc.id == id) || {};
  // console.log(id, "i need id");
  res.send(fuck);
});

app.listen(port, () => {
  console.log(`port is listen on ${port}`);
});
