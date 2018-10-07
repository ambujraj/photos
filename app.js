const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.get("/", function(req, res){
   res.render("landing");
});
app.get("/results", function(req, res){
    var search = req.query.query;
    var ab = search.split(" ");
    search = ab.join("+");
    var url = 'https://pixabay.com/api/?key=9494342-0f51f6ed3422203dd259dafaa&q='+search+'&image_type=photo&order=latest&per_page=35';
    request(url, function(error, response, body){
     if(!error && response.statusCode == 200){
       var parsed = JSON.parse(body);
       res.render("result", {query: parsed});
     }
    });
});
app.get("*", function(req, res){
    res.redirect("/");
});
app.listen(process.env.PORT || 3000, function(){
   console.log("Server Started");
});
