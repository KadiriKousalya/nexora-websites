const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} from ${req.ip}`);
  next();
});



const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Bharat@23101997",
  database: "nexora_db"
});


db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database!");
  }
});

app.post("/submit", (req, res) => {
  const { name, email, query, mobile, queryDetails } = req.body;

  const sql = "INSERT INTO contact_form (name, email, query, mobile, query_details) VALUES (?, ?, ?, ?, ?)";
  const values = [name, email, query, mobile, queryDetails];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Error inserting data:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    console.log("📩 Form Data Saved:", { name, email, query, mobile, queryDetails });
    res.json({
      message: "Form submitted and saved successfully!",
      data: { name, email, query, mobile, queryDetails }
    });
  });
});

app.get("/", (req, res) => {
  res.send("✅ Backend server is running!");
});


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});