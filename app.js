// Simple calculator functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

// Simple Express server
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Calculator endpoints
app.post("/add", (req, res) => {
  const { a, b } = req.body;
  const result = add(Number(a), Number(b));
  res.json({ result });
});

app.post("/subtract", (req, res) => {
  const { a, b } = req.body;
  const result = subtract(Number(a), Number(b));
  res.json({ result });
});

app.post("/multiply", (req, res) => {
  const { a, b } = req.body;
  const result = multiply(Number(a), Number(b));
  res.json({ result });
});

app.post("/divide", (req, res) => {
  try {
    const { a, b } = req.body;
    const result = divide(Number(a), Number(b));
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Only start server if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export functions for testing
module.exports = { add, subtract, multiply, divide, app };
