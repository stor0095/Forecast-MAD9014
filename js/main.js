//MyWidget Script
/**************************
Add a link for a CSS file that styles .mywidget
Add a script tag that points to CDN version of jQuery 1.*
Add a script tag that loads your script file from http://m.edumedia.ca/
**************************/

//////////// Giving credit to the sources that helped me. This project couldn't be done without the help of: StackOverFlow, our Canvas Course Modules, W3Schools, and most importantly, cooridinating with fellow peers from our program///////////////////


var scriptsLoaded = 0;
document.addEventListener("DOMContentLoaded", function() {
    var css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("href", "css/main.css");
    //loads the CSS file and applies it to the page
    css.addEventListener("load", loadCount);
    document.querySelector("head").appendChild(css);
    var jq = document.createElement("script");
    jq.addEventListener("load", loadCount);
    jq.setAttribute("src",
        "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"
    );
    
    document.querySelector("head").appendChild(jq);
});

function buildWidget(cls) {
    //now do the ajax call then build your page
    $.ajax({
        type: 'GET',
        url: "https://api.forecast.io/forecast/abfc29b667dc96b4cc124355690483c7/45.348391,-75.757045?units=ca",
        dataType: "jsonp",
        success: function(data) {
            console.log("Success: API Loaded");
            captionWidget(data.currently);
            hourWidget(data.hourly);
        },
        fail: function() {
            console.log("Error, you messed up.");
        }
    })
}

//Builds current weather above the table

function captionWidget(current) {
    //Show current weather
    var today = new Date();
    var container = $(".weather-forecast");
    $("<p>").text("Weather Conditions for today, " + today.getDate() + "/" +
        (parseInt(today.getMonth()) + 1)).appendTo(container);
    $("<p>").text("Current Temperature: " + current.temperature.toFixed(0) + "°C " + (current.summary)).appendTo(
        container);
}

// Builds the hourly conditons - Could not get the icons working

function hourWidget(hourly) {
    var containerMain = $("<table>");
    var tableHeader = $("<th>").append("<table><thead>" + "<th>Time</th>" +
        "<th>Humidity</th>" + "<th>Cloud Cover</th>" +
        "<th>Temperature</th>" + "<th>Wind</th>" + "<th>Conditon</th>" +
        "</thead><tbody></tbody><table>");
    tableHeader.appendTo(containerMain);
    var today = new Date();
    for (var i = 0; i < hourly.data.length; i++) {
        var hourlyData = hourly.data[i];
        var time = new Date(hourlyData.time * 1000);
        if (time.getDate() === today.getDate()) {
            time = time.getHours() + ":00";
            var hourSect = $("<tr>");
            $("<td>").text(time).appendTo(hourSect);
            $("<td>").text(hourlyData.humidity.toString().split(".")[1] +
                "%").appendTo(hourSect);
            $("<td>").text(hourlyData.cloudCover == 1 ? "100%" : hourlyData
                .cloudCover.toString().split(".")[1] + "%").appendTo(
                hourSect);
            $("<td>").text(hourlyData.temperature.toFixed(0) + " °C").appendTo(
                hourSect);
            $("<td>").text(hourlyData.windSpeed.toFixed(0) + " Km/h").appendTo(
                hourSect);
            $("<td>").text(hourlyData.summary).appendTo(hourSect);
            hourSect.appendTo(containerMain)
        }
    }
    containerMain.appendTo($(".weather-forecast"))
}

function loadCount() {
    scriptsLoaded++;
    if (scriptsLoaded === 2) {
        //call the function in My widget script to load the JSON and build the widget
        buildWidget(".mywidget");
        console.log("both scripts loaded");
    }
}