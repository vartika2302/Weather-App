const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    
    res.sendFile(__dirname+"/index.html");
    //res.send("server is running");
});

app.post("/",function(req,res){
    const queryName = req.body.countryName;
    const apiKey = "d53e767436630df2e9d46863d4887e3b";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+queryName+"&units="+unit+"&appid="+apiKey;
    https.get(url,(response)=>{
        //console.log(response);
        console.log(response.statusCode);
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const temperature = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            //console.log(weatherDescription);
            res.write("<p>The weather is currently "+weatherDescription+".</p>");
            res.write("<h1>The temperature in "+queryName+" is "+temperature+" degree celcius.</h1>");
            res.write("<img src="+imgurl+">");
            res.send();
        });
    });
    //console.log("Request received");
});

app.listen(3000,()=>{
    console.log("listening at port no 3000");
});


