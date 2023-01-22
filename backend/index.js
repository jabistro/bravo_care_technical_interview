const express = require("express");
const { Client } = require("pg");
const { allShiftsData, q4query, q5query, q6query } = require("./utils/queries");
const app = express();
const port = 3001;

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

const client = new Client({
  host: "localhost",
  user: "jabistro",
  port: 5432,
  database: "bravo_care",
});

client.connect();

app.get("/", async (req, res) => {
  const { rows } = await client.query(allShiftsData);
  res.send(rows);
});

app.get("/q4", async (req, res) => {
  const { rows } = await client.query(q4query);
  res.send(rows);
});

app.get("/q5", async (req, res) => {
  const { rows } = await client.query(q5query);
  res.send(rows);
});

app.get("/q6", async (req, res) => {
  const { rows } = await client.query(q6query);
  res.send(rows);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
