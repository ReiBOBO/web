const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})
app.post("/", function (req, res) {

    const query = req.body.cityName;
    const key = "d09a71b10175fdca9faa210e2c3e0f6c"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + key + "&units=" + unit;
    https.get(url, function (response) {
        response.on("data", function (data) {
            //parse some data to JSON
            const weatherData = JSON.parse(data)
            const weatherDescription = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const weathericon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + weathericon + "@2x.png"
            /*It also works in the other way, if we have a JS object
                const object = {
                    name:"Angela",
                    favouriteFood:"Ramen"
                }
                var string_of_object = JSON.stringify(object); //turn object to a string
            *
            */
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<img src=" + imgURL + ">")
            res.write("<h1>The temperature in "+ query+" is " + temp + " degree Celcius.</h1>");
            res.send();
        })
    });

})


app.listen(3000, function () {
    console.log("Server is running on port 3000")
})