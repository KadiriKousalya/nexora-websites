const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware to parse form data (from frontend)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} from ${req.ip}`);
  next();
});

// Route to handle form submission
app.post("/submit", (req, res) => {
  const { name, email } = req.body;
  console.log("Form Data Received:", { name, email });

  // Later you can save this data into DB (handled by your DB teammate)
  res.json({ message: "Form submitted successfully!", data: { name, email } });
});
app.get("/", (req, res) => {
  res.send("✅ Backend server is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
