const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Bharat@23101997",
  database: "nexora_db"
});

db.connect(err => {
  if (err) {
    console.error("MySQL connection failed:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.post("/api/enquiry", (req, res) => {
  const { name, email, phone, course, message } = req.body;

  if (!name || !email || !phone || !course) {
    return res.status(400).json({ message: "All fields are required" });
  }

  console.log("New Enquiry Received:");
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Phone: ${phone}`);
  console.log(`Course: ${course}`);
  console.log(`Message: ${message}`);
  console.log("----------------------------");


  const sql = "INSERT INTO enquiries (name, email, phone, course, message) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, email, phone, course, message], (err, result) => {
    if (err) {
      console.error("Error saving enquiry:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Enquiry submitted successfully!" });
  });
});

app.listen(5000, () => {
  console.log(" Server running on http://localhost:5000");
});
