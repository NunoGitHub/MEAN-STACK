//express app
const express = require("express");
const bodyParser = require("body-parser");

const Post = require("./models/post");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    "mongodb+srv://nunoaapp22:odoFi1jD3Ivxoyyv@cluster0.pcpevb4.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("connection failded error = " + error);
  });

//valid express for parsing json data
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

//middleware
/*app.use((req, res, next) =>{

  console.log(`first middleware ${req.url}`);
  next();

});*/

// "*" -> doesnt mather the which domain the app is sending the request is running on is allowed to access our resources.
// "es.setHeader("Access-Control-Allow-Headers");" restrict to domains sending a request with a certain set of headers besides the default headers
//  "Origin, X-Requested-With, Content-Type, Accept" -> means the incoming request may have this extra headers, if has another non default headers will be blocked.
//"Access-Control-Allow-Methods" -> we controll which http request we allow
//OPTION  -> see if the post request is valid

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTION"
  );
  next();
});
//odoFi1jD3Ivxoyyv
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  //automatically creates the write query to insert a new entry with that data and autommatycally genarated id in the database
  post.save().then((data) =>{
    console.log("data sended "+ data);
    res.status(201).json({
      message: "Post added successfully",
      id: data._id,//to update id
    });
  }).catch((error)=>{
    console.log(error);
    res.status(404).json({
      message: error,
    })
  });

});

app.get("/api/posts", (req, res, next) => {
  //get all entries
  Post.find()
    .then((documents) => {
      console.log(documents);
      res.status(200).json({
        message: "Posts fetched succesfully",
        posts: documents,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  }).catch((error)=>{
    console.log(error);
  });
});

//use app in server
module.exports = app;
