function ajax_get(url, callback) {
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //alert('responseText: ' + xmlhttp.responseText);
    try {
        var data = JSON.parse(xmlhttp.responseText);
        //var headers = xmlhttp.getAllResponseHeaders().toLowerCase();
        //alert(headers['X-Rate-Limit-Remaining']);
    } catch(err) {
        alert(err.message + " in " + xmlhttp.responseText);
        return;
    }
    callback(data);
}
};

xmlhttp.open("GET", url, true);
xmlhttp.send();
}

function capitalizeFirstLetter(string) {
return string.charAt(0).toUpperCase() + string.slice(1);
}
ajax_get('https://api.wheretheiss.at/v1/satellites/25544', function(data) {
document.getElementById('latitude_table').innerHTML = "<p id='latitude_table'>Latitude : " + data['latitude'] + "°</p>";
document.getElementById('longitude_table').innerHTML = "<p id='longitude_table'>Longitude : " + data['longitude'] + "°</p>";
document.getElementById('altitude_table').innerHTML = "<p id='altitude_table'>Altitude : " + data['altitude'] + " km</p>";
document.getElementById('velocity_table').innerHTML = "<p id='velocity_table'>Velocity : " + data['velocity'] + " km/h</p>";
var visibility = capitalizeFirstLetter(data['visibility']);
document.getElementById('visibility_table').innerHTML = "<p id='visibility_table'>Visibility : " + visibility + "</p>";
document.getElementById('solar_lat_table').innerHTML = "<p id='solar_lat_table'>Solar latitude : " + data['solar_lat'] + "°</p>";
document.getElementById('solar_lon_table').innerHTML = "<p id='solar_lon_table'>Solar longitude : " + data['solar_lon'] + "°</p>";
});
function actualize() {
ajax_get('https://api.wheretheiss.at/v1/satellites/25544', function(data) {
document.getElementById('latitude_table').innerHTML = "<p id='latitude_table'>Latitude : " + data['latitude'] + "°</p>";
document.getElementById('longitude_table').innerHTML = "<p id='longitude_table'>Longitude : " + data['longitude'] + "°</p>";
document.getElementById('altitude_table').innerHTML = "<p id='altitude_table'>Altitude : " + data['altitude'] + " km</p>";
document.getElementById('velocity_table').innerHTML = "<p id='velocity_table'>Velocity : " + data['velocity'] + " km/h</p>";
var visibility = capitalizeFirstLetter(data['visibility']);
document.getElementById('visibility_table').innerHTML = "<p id='visibility_table'>Visibility : " + visibility + "</p>";
document.getElementById('solar_lat_table').innerHTML = "<p id='solar_lat_table'>Solar latitude : " + data['solar_lat'] + "°</p>";
document.getElementById('solar_lon_table').innerHTML = "<p id='solar_lon_table'>Solar longitude : " + data['solar_lon'] + "°</p>";
});
}
var t=setInterval(actualize,3000);
