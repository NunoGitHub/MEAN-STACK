//express app
const express = require("express");

const app = express();

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
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "12334",
      title: "First server-side post",
      content: "This is comming from the server",
    },
    {
      id: "0986",
      title: "Second server-side post",
      content: "This is comming from the server",
    },
  ];

  res.status(200).json({
    message: "Posts fetched succesfully",
    posts: posts,
  });
});

//use app in server

module.exports = app;
