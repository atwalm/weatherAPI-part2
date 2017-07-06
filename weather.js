
function onloadFunc(){
    const resp = JSON.parse(this.response);
      console.log(resp.coord);


  if (resp.name) {
  //   printListItem(resp.results[1].name);
      $("#city-text").html(resp.name + ", " + resp.sys.country);
  }

    if (resp.wind) {
    //  printListItem(resp.results[0].wind);

      var knots = resp.wind.speed * 1.9438445;
      $("#wind-text").html(knots.toFixed(1) + " Knots");
    }

    if (resp.main.temp) {
      var fahr = (resp.main.temp * 9 / 5) - 459.67;
      var cels = (resp.main.temp - 273.15);
      if (cels > 24){
        $("#temp-text").css("color", "red");
      } else if (cels < 18){
        $("#temp-text").css("color", "blue");
      }
      $("#temp-text").html((tempMode === 1 ? fahr.toFixed(0) + " F&deg" : cels.toFixed(0) + " C&deg"));
    }


    if (resp.weather) {
      var imgURL = "http://openweathermap.org/img/w/" + resp.weather[0].icon + ".png";
      console.log(imgURL)
      $("#weatherImg").attr("src", imgURL);
      $("#weather-text").html(resp.weather[0].description);
    }
   else {
      // if no results, print an error message to page
      printListItem("Sorry, no results were found");
    }

}


  // API call onerror callback function
  function onerrorFunc(){
    // print an error message to page
     printListItem("Sorry, an error occurred");
  }

function getWeather(lat, lon) {
//function getWeather(locObj) {
  var apiURI = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=06170c100199dbae1e223cc3dfad960b";
//  let apiURI = `http://api.openweathermap.org/data/2.5/weather?lat=${locObj.lat}&lon=${locObj.lon}&APPID=178c8ef1013d5657ddfcc24ccf0e544c`;


        let request = new XMLHttpRequest();
        request.open("GET", apiURI, true);
        request.onload = onloadFunc;
        request.onerror = onerrorFunc;
        request.send();
}

  function getLocation() {
  if ("geolocation" in navigator) {


    navigator.geolocation.getCurrentPosition(function(position) {

     getWeather(position.coords.latitude, position.coords.longitude);

    /*  const newPos = {lat:position.coords.latitude, lon: position.coords.longitude};
   getWeather(newPos);*/

    })

  } else {
    alert("geolocation not available" + e);
    clearInterval(updateinter);
  }
}
var i = 0;
var updateinter = setInterval(function(){
  console.log("iteration# " + i++);
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
    getWeather(position.coords.latitude, position.coords.longitude);
    /*  const newPos = {lat:position.coords.latitude, lon: position.coords.longitude};
      getWeather(newPos);*/
    })
  } else {
    alert("geolocation not available" + e);
  }
}, 300000);

var onClickLondon = function(){
  getLocation();

  //getLocation(glocation.london);
}
