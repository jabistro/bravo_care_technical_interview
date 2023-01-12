const express = require("express");
const { Client } = require("pg");
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
  const { rows } = await client.query(
    "SELECT question_one_shifts.shift_id, question_one_shifts.facility_id, facilities.facility_name, question_one_shifts.shift_date, question_one_shifts.start_time, question_one_shifts.end_time FROM question_one_shifts INNER JOIN facilities ON question_one_shifts.facility_id=facilities.facility_id"
  );
  res.send(rows);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
