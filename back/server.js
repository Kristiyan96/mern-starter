import mongodb from "mongodb";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

async function main() {
  const client = new MongoClient(process.env.DB_URI);

  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  } finally {
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  }
}

main().catch(console.error);

app.get('/', (req, res) => {
    res.send(process.env.SECRET_KEY);
})