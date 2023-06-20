const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res) {

    let unit = "metric";
    let query = req.body.cityName;
    let url = "https://api.openweathermap.org/data/2.5/weather?appid=" + process.env.API_KEY + "&q=" + query + "&units=" + unit;


    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            
            let weatherData = JSON.parse(data);
            let temp = weatherData.main.temp;
            let weatherDesc = weatherData.weather[0].description;
            let weatherIcon = weatherData.weather[0].icon;
            res.write("<h1>The current temperature in " + query + " is " + temp + " degrees Celsius.</h1>")
            res.write("<h2>The weather is currently " + weatherDesc +".</h2>")
            res.write("<img src=\"http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png\" />")
            res.send()
        })
    })
})




app.listen (3000, function() {
    console.log("Server is online and listening to port 3000")
})