const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


var day = "";
var temp ="";
var city="";
var desc ="";
var highTemp = "";
var lowTemp ="";
app.get("/",(req,res)=>{
  res.render("list",{listTitle: day,temp: temp,city: city ,desc:desc,highTemp:highTemp,lowTemp:lowTemp});
})


app.post("/",(req,res)=>{
  var today = new Date();
  var currentday = today.getDay();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }; 
  var day = today.toLocaleDateString("en-US",options);
      const city = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=cd11dd5720d8a1ffe92e54c43ad6431b&units=imperial";
  https.get(url,(response)=>{
      response.on("data",(data)=>{
        const weatherData = JSON.parse(data);
        var temp = weatherData.main.temp
        var desc = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"
        const highTemp = weatherData.main.temp_min
        const lowTemp = weatherData.main.temp_max
        // res.write("<h1>"+day+"</h1>")
        // res.write("<h1>The temperatur of "+city+" is:" + temp + " degree celcious </h1>");
        // res.write("the description:"+desc);
        // res.write("<img src="+imageURL+">");
        // res.send();
        res.render("list",{listTitle: day, temp:temp , city:city ,desc: desc,highTemp:highTemp,lowTemp:lowTemp});
      })
  })

})





app.listen(3000,()=>{
    console.log("Server is running");
})