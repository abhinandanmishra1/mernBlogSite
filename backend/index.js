const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME,
    }
  )
  .then((res) => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("some error happened => error: ", err);
  });

// Define schema for blog post
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
});

// Define model for blog post
const Blog = mongoose.model("Blog", blogSchema);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// API routes
app.post("/api/blogs", async (req, res) => {
  const { title, image, description } = req.body;
  console.log(req.body);

  try {
    const blog = new Blog({ title, image, description });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const { title, image, description } = req.body;

  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, image, description },
      { new: true }
    );
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Blog.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
