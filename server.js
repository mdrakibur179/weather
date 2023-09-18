const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const city = req.body.city;
    const appId = "20898d3bb53f706e7dc34248b36bf7e3";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid=" + appId;

    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imgUrl = "https://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png"
            res.write("<h1>Current Temperature in "+ city +" is: " + temp + "</h1>");
            res.write("<p>Current Weather is: " + weatherDesc + "</p>");
            res.write("<img src="+ imgUrl +">");
            res.send();
        });
    });
});



app.listen(3000, () => {
    console.log("The server is running on localhost:3000");
});