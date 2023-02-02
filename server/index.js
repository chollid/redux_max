const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.listen(5005, () => {
  console.log("Server is running on port 5005");
});

// _____MIDDLEWARE_____
// Gives access to the frontend
app.use(cors());
// Gives access to the body of the request
app.use(express.json());

// _____ROUTES_____

// Create a post
app.post("/posts", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = await pool.query(
      "INSERT INTO posts (title, content, author) VALUES($1, $2, $3) RETURNING *",
      [title, content, author]
    );
    res.json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all posts

app.get("/posts", async (req, res) => {
  try {
    const allPosts = await pool.query("SELECT * FROM posts");
    res.json(allPosts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get a post

// Update a post
