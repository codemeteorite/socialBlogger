var methodOverride = require('method-override')
const { v4: uuidv4 } = require("uuid")
const express = require("express")
const app = express();
const path = require("path")
const port = process.env.PORT || 3000;  

app.set("view engine", "ejs")           
app.set("views", path.join(__dirname, "/views"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"))

let posts = [
  {
    id: uuidv4(),
    username: "Yahiya",
    content: "just Got Done Creating REST Apis"
  },
  {
    id: uuidv4(),
    username: "Fatima",
    content: "Coffee and late-night coding is the best combo"
  },
  {
    id: uuidv4(),
    username: "Ronaldo",
    content: "SIUUUUUUUUUUUUUU"
  },
  {
    id: uuidv4(),
    username: "Sara",
    content: "CSS is simple until it suddenly stops being simple"
  }
]


app.get("/", (req, res) => {
  res.redirect("/posts")
})

// GET all posts
app.get("/posts", (req, res) => {
  res.render("allposts.ejs", { posts })
})

// New post form
app.get("/posts/new", (req, res) => {
  res.render("newpost.ejs")
})

// Single post
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let foundPost = posts.find(post => id === post.id);

  if (foundPost) {
    res.render("showpost.ejs",{post:foundPost});
  }
})

// Edit form
app.get("/posts/edit/:id", (req, res) => {
  let { id } = req.params;
  let foundPost = posts.find(post => post.id === id);

  res.render("editpost.ejs", { foundPost });
})

// Create new post
app.post("/posts", (req, res) => {
  let { user, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username: user, content })
  res.redirect('/posts')
})

// Update post
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let foundPost = posts.find(post => id === post.id);

  if(foundPost){
    foundPost.content = newContent;
  }

  res.redirect("/posts");
})

// Delete post
app.delete("/posts/:id", (req,res) => {     
  let { id } = req.params;
  posts = posts.filter(post => post.id !== id)
  res.redirect("/posts")
})

app.listen(port, () => {
  console.log(`Waiting for you @ ${port} brother.`)
})
