const express = require("express");
const app = express();
const https = require("https");


app.get("/", function(req, res) {

    let url = "https://api.openweathermap.org/data/2.5/weather?appid=ccfce67c7ce08c6d483e1c68cd681db0&q=Izmir&units=metric";

    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            let weatherData = JSON.parse(data);
            let temp = weatherData.main.temp;
            let weatherDesc = weatherData.weather[0].description;
            console.log(weatherDesc);
        })
    })

    res.send("Server is up and running.")
})




app.listen (3000, function() {
    console.log("Server is online and listening to port 3000")
})