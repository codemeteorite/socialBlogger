

var methodOverride = require('method-override')
const { v4: uuidv4 } = require("uuid")   //Gets these to eliminarte the problem of repeating ids.
const express = require("express")
const app = express();
const path = require("path")
const port = 3000;


app.set("views engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("views", path.join(__dirname, "/views"))
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

];



//Gets all the posts
app.get("/", (req, res) => {
    res.render("allposts.ejs", { posts })
    
})


app.get("/posts/new", (req, res) => {
    res.render("newpost.ejs")
})

// Gets the posts according to their respective Id's
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let foundPost = posts.find(post => id === post.id);

  if (foundPost) {
    res.render("showpost.ejs",{post:foundPost});
  } 
});

app.get("/posts/edit/:id", (req, res) => {
  let { id } = req.params;
  let foundPost = posts.find(post => post.id === id);

  res.render("editpost.ejs", { foundPost });
});


app.post("/posts", (req, res) => {

    let { user, content } = req.body;
    let id = uuidv4();
    posts.push({ id,username: user, content })
    res.redirect('/posts')  //redirects the user back to the posts page after ccreating a  new post.

});



//Patches/Updates the post content.
app.patch("/posts/:id", (req, res) => {
     let {id} = req.params;
     let  newContent = req.body.content;
     let foundPost = posts.find((post)=>id===post.id);
     foundPost.content=newContent;
  
     res.redirect("/posts");
});


app.delete("/posts/delete/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter(post => post.id!==id);
    res.redirect("/posts")
})




app.listen(port, () => {
    console.log(`Waiting for you @ ${port} brother.`)
})