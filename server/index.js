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

app.get("/posts/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const getSinglePost = await pool.query(
      "SELECT * FROM posts WHERE id = $1",
      [req.params.id]
    );
    console.log("request.params.id:");
    res.json(getSinglePost.rows);
  } catch (error) {
    console.error(error.message);
  }
});
// Update a post

app.put("/posts/:id", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const { id } = req.params;
    const updatePost = await pool.query(
      "UPDATE posts SET title = $1, content = $2, author = $3 WHERE id = $4 RETURNING *",
      [title, content, author, id]
    );
    console.log("updatePost.rows[0]:", updatePost.rows[0]);
    res.json(updatePost.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// delete a post

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await pool.query("DELETE FROM posts WHERE id = $1", [
      id,
    ]);
    console.log("deletePost:", deletePost);
    res.json("Post was deleted!");
  } catch (error) {
    console.error(error.message);
  }
});
