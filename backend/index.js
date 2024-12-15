const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/api/data", (req, res) => {
    res.json([
        { id: 1, name: "Alice", role: "developer" },
        { id: 2, name: "Bob", role: "designer" },
        { id: 3, name: "Charlie", role: "manager" },
    ]);
    });

    


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
