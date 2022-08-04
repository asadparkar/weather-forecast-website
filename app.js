const express = require('express');
const bodyParser = require('body-parser')
const https = require('https');
// IMPORTED THIRD PARTY MOMENT TO CONVERT UNIX TIMESTAMP
const moment = require('moment');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set("view engine","ejs"); //USING THE EJS TEMPLATE

//DEFINING SOME GLOBALLY SCOPED VARIABLES
defaulturl = "https://api.openweathermap.org/data/2.5/onecall?lat=28.6517178&lon=77.2219388&units=metric&exclude=hourly,minutely&appid=3115bec6b72386cd6eb2cb9ccef50041";
https.get(defaulturl,(response)=>{
    response.on("data",(data)=>{
        const defaultdata = JSON.parse(data);
        //WE GLOBALLY DEFINE THESE VARIABLES SO THEY CAN BE RENDERED IN THE GET REQUEST
        globalThis.temp = Math.round(defaultdata.current.temp);
        globalThis.icon = "http://openweathermap.org/img/wn/"+defaultdata.current.weather[0].icon+"@2x.png";
        globalThis.description = defaultdata.current.weather[0].description;
        globalThis.humidity = defaultdata.current.humidity;
        globalThis.windspeed = defaultdata.current.wind_speed;
    })
})
 var CityName = "Delhi";
//  var temp = "30";
//  var icon = "http://openweathermap.org/img/wn/10d@2x.png";
//  var description = "Sunny"
//  var humidity = "66";
//  var windspeed = "3.6";

var current = new Date();
var defaulttime = current.toLocaleTimeString();
var citytime = defaulttime;

 var icons = {
    icon1:"http://openweathermap.org/img/wn/10d@2x.png",
    icon2:"http://openweathermap.org/img/wn/10d@2x.png",
    icon3:"http://openweathermap.org/img/wn/10d@2x.png",
    icon4:"http://openweathermap.org/img/wn/10d@2x.png",
    icon5:"http://openweathermap.org/img/wn/10d@2x.png",
    icon6:"http://openweathermap.org/img/wn/10d@2x.png",
    icon7:"http://openweathermap.org/img/wn/10d@2x.png"
}
var descriptions = {
    desc1:"sunny",
    desc2:"sunny",
    desc3:"sunny",
    desc4:"sunny",
    desc5:"sunny",
    desc6:"sunny",
    desc7:"sunny"
}
var daynames = {
    dname1:"Aug 1",
    dname2:"Aug 1",
    dname3:"Aug 1",
    dname4:"Aug 1",
    dname5:"Aug 1",
    dname6:"Aug 1",
    dname7:"Aug 1",
}

var temps = {
    temp1:"30",
    temp2:"30",
    temp3:"30",
    temp4:"30",
    temp5:"30",
    temp6:"30",
    temp7:"30"
}
const idate = new Date();
var iday = idate.getDate();
var idayname = idate.toLocaleString('default',{month:'short'});
const todaydate = idayname+" "+iday;

// HOME ROUTE GET REQUEST
app.get('/',(req,res)=>{
    res.render('index',{
        nameofcity:CityName,
        temperature:temp,
        iconlink:icon,
        weatherDescription:description,
        humidityvalue:humidity,
        windspeedvalue:windspeed,
        timeofcity:citytime,

        iconlink1:icons.icon1,
        iconlink2:icons.icon2,
        iconlink3:icons.icon3,
        iconlink4:icons.icon4,
        iconlink5:icons.icon5,
        iconlink6:icons.icon6,
        iconlink7:icons.icon7,

        weatherDescription1:descriptions.desc1,
        weatherDescription2:descriptions.desc2,
        weatherDescription3:descriptions.desc3,
        weatherDescription4:descriptions.desc4,
        weatherDescription5:descriptions.desc5,
        weatherDescription6:descriptions.desc6,
        weatherDescription7:descriptions.desc7,

        dayname1:daynames.dname1,
        dayname2:daynames.dname2,
        dayname3:daynames.dname3,
        dayname4:daynames.dname4,
        dayname5:daynames.dname5,
        dayname6:daynames.dname6,
        dayname7:daynames.dname7,

        tempvalue1:temps.temp1,
        tempvalue2:temps.temp2,
        tempvalue3:temps.temp3,
        tempvalue4:temps.temp4,
        tempvalue5:temps.temp5,
        tempvalue6:temps.temp6,
        tempvalue7:temps.temp7,

        todaysdate:todaydate
    });
})

// POST REQUEST FROM SEARCH BOX
app.post('/',(req,res)=>{
    var CityName = req.body.cityName;
    const Cityurl = "https://api.openweathermap.org/geo/1.0/direct?q="+CityName+"&limit=5&appid=3115bec6b72386cd6eb2cb9ccef50041";
    https.get(Cityurl,(response)=>{
        response.on("data",(data)=>{
            const geocode = JSON.parse(data);
            const lat = geocode[0].lat;
            const lon = geocode[0].lon;

            const url = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=metric&exclude=hourly,minutely&appid=3115bec6b72386cd6eb2cb9ccef50041"
            https.get(url,(response)=>{
                response.on("data",(data)=>{
                    const weatherData = JSON.parse(data);
                    const temp = Math.round(weatherData.current.temp);
                    const icon = "http://openweathermap.org/img/wn/"+weatherData.current.weather[0].icon+"@2x.png";
                    const description = weatherData.current.weather[0].description;
                    const humidity = weatherData.current.humidity;
                    const windspeed = weatherData.current.wind_speed;
                    const datevalue = weatherData.current.dt;
                    // 7-DAY FORECAST VARIABLES
                    const icons = {
                        icon1:"http://openweathermap.org/img/wn/"+weatherData.daily[0].weather[0].icon+"@2x.png",
                        icon2:"http://openweathermap.org/img/wn/"+weatherData.daily[1].weather[0].icon+"@2x.png",
                        icon3:"http://openweathermap.org/img/wn/"+weatherData.daily[2].weather[0].icon+"@2x.png",
                        icon4:"http://openweathermap.org/img/wn/"+weatherData.daily[3].weather[0].icon+"@2x.png",
                        icon5:"http://openweathermap.org/img/wn/"+weatherData.daily[4].weather[0].icon+"@2x.png",
                        icon6:"http://openweathermap.org/img/wn/"+weatherData.daily[5].weather[0].icon+"@2x.png",
                        icon7:"http://openweathermap.org/img/wn/"+weatherData.daily[6].weather[0].icon+"@2x.png"
                    }

                    const descriptions = {
                        desc1:weatherData.daily[0].weather[0].description,
                        desc2:weatherData.daily[1].weather[0].description,
                        desc3:weatherData.daily[2].weather[0].description,
                        desc4:weatherData.daily[3].weather[0].description,
                        desc5:weatherData.daily[4].weather[0].description,
                        desc6:weatherData.daily[5].weather[0].description,
                        desc7:weatherData.daily[6].weather[0].description
                    }
                    //START OF THE 7 DAY DYNAMIC DATE CHANING
                    const daynames = {
                        dname1:"Aug 1",
                        dname2:"Aug 1",
                        dname3:"Aug 1",
                        dname4:"Aug 1",
                        dname5:"Aug 1",
                        dname6:"Aug 1",
                        dname7:"Aug 1",
                    }
                    const date = new Date();
                    var day = date.getDate();
                    var dayname = date.toLocaleString('default',{month:'short'});
                    var daytype = date.toLocaleString('default',{weekday:'short'});


                    date.setDate(date.getDate() + 1);
                    day = date.getDate();
                    dayname = date.toLocaleString('default',{month:'short'});
                    daytype = date.toLocaleString('default',{weekday:'short'});
                    daynames.dname1= daytype+", "+dayname+" "+day;

                    date.setDate(date.getDate() + 1);
                    day = date.getDate();
                    dayname = date.toLocaleString('default',{month:'short'});
                    daytype = date.toLocaleString('default',{weekday:'short'});
                    daynames.dname2= daytype+", "+dayname+" "+day;

                    date.setDate(date.getDate() + 1);
                    day = date.getDate();
                    dayname = date.toLocaleString('default',{month:'short'});
                    daytype = date.toLocaleString('default',{weekday:'short'});
                    daynames.dname3= daytype+", "+dayname+" "+day;

                    date.setDate(date.getDate() + 1);
                    day = date.getDate();
                    dayname = date.toLocaleString('default',{month:'short'});
                    daytype = date.toLocaleString('default',{weekday:'short'});
                    daynames.dname4= daytype+", "+dayname+" "+day;

                    date.setDate(date.getDate() + 1);
                    day = date.getDate();
                    dayname = date.toLocaleString('default',{month:'short'});
                    daytype = date.toLocaleString('default',{weekday:'short'});
                    daynames.dname5= daytype+", "+dayname+" "+day;

                    date.setDate(date.getDate() + 1);
                    day = date.getDate();
                    dayname = date.toLocaleString('default',{month:'short'});
                    daytype = date.toLocaleString('default',{weekday:'short'});
                    daynames.dname6= daytype+", "+dayname+" "+day;

                    date.setDate(date.getDate() + 1);
                    day = date.getDate();
                    dayname = date.toLocaleString('default',{month:'short'});
                    daytype = date.toLocaleString('default',{weekday:'short'});
                    daynames.dname7= daytype+", "+dayname+" "+day;
                    //END OF 7 DAY DYNAMIC DATE CHANNGING

                    const temps ={
                        temp1:Math.round(weatherData.daily[0].temp.day),
                        temp2:Math.round(weatherData.daily[1].temp.day),
                        temp3:Math.round(weatherData.daily[2].temp.day),
                        temp4:Math.round(weatherData.daily[3].temp.day),
                        temp5:Math.round(weatherData.daily[4].temp.day),
                        temp6:Math.round(weatherData.daily[5].temp.day),
                        temp7:Math.round(weatherData.daily[6].temp.day)
                    }                    
                    const timeurl = "https://api.ipgeolocation.io/timezone?apiKey=3c17aa74644b4fb38555a007d29c5a9f&lat="+lat+"&long="+lon;
                    https.get(timeurl,(response)=>{
                        response.on("data",(data)=>{
                            const timedata = JSON.parse(data);
                            const citytime = timedata.time_12;
                            res.render('index',{
                                nameofcity:CityName,
                                temperature:temp,
                                iconlink:icon,
                                weatherDescription:description,
                                humidityvalue:humidity,
                                windspeedvalue:windspeed,
                                timeofcity:citytime,
                        
                                iconlink1:icons.icon1,
                                iconlink2:icons.icon2,
                                iconlink3:icons.icon3,
                                iconlink4:icons.icon4,
                                iconlink5:icons.icon5,
                                iconlink6:icons.icon6,
                                iconlink7:icons.icon7,
                        
                                weatherDescription1:descriptions.desc1,
                                weatherDescription2:descriptions.desc2,
                                weatherDescription3:descriptions.desc3,
                                weatherDescription4:descriptions.desc4,
                                weatherDescription5:descriptions.desc5,
                                weatherDescription6:descriptions.desc6,
                                weatherDescription7:descriptions.desc7,

                                dayname1:daynames.dname1,
                                dayname2:daynames.dname2,
                                dayname3:daynames.dname3,
                                dayname4:daynames.dname4,
                                dayname5:daynames.dname5,
                                dayname6:daynames.dname6,
                                dayname7:daynames.dname7,

                                tempvalue1:temps.temp1,
                                tempvalue2:temps.temp2,
                                tempvalue3:temps.temp3,
                                tempvalue4:temps.temp4,
                                tempvalue5:temps.temp5,
                                tempvalue6:temps.temp6,
                                tempvalue7:temps.temp7,

                                todaysdate:todaydate

                        
                            });
                        })
                    })
                    
                })
            })
        })

    })

})

let port = process.env.PORT;
if (port == null || port==""){
    port = 3000;
}

app.listen(port,()=>{
    console.log("Server has started sucessfully");
})