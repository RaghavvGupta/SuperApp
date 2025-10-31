const express = require("express");
const dotenv = require("dotenv");
const postRoutes = require("./routes/posts");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/posts", postRoutes);

app.get("/", (req, res) => res.send("API running..."));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
