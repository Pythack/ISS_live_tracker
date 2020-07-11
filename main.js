function iss_get(url, callback) {
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //alert('responseText: ' + xmlhttp.responseText);
    try {
        var data_iss = JSON.parse(xmlhttp.responseText);
        //var headers = xmlhttp.getAllResponseHeaders().toLowerCase();
        //alert(headers['X-Rate-Limit-Remaining']);
    } catch(err) {
        alert(err.message + " in " + xmlhttp.responseText);
        return;
    }
    callback(data_iss);
}
};

xmlhttp.open("GET", url, true);
xmlhttp.send();
}

function ip_get(url, callback) {
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //alert('responseText: ' + xmlhttp.responseText);
    try {
        var ip = xmlhttp.responseText;
        //var headers = xmlhttp.getAllResponseHeaders().toLowerCase();
        //alert(headers['X-Rate-Limit-Remaining']);
    } catch(err) {
        alert(err.message + " in " + xmlhttp.responseText);
        return;
    }
    callback(ip);
}
};

xmlhttp.open("GET", url, true);
xmlhttp.send();
}

function loc_get(url, callback) {
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //alert('responseText: ' + xmlhttp.responseText);
    try {
        var loc = JSON.parse(xmlhttp.responseText);
        //var headers = xmlhttp.getAllResponseHeaders().toLowerCase();
        //alert(headers['X-Rate-Limit-Remaining']);
    } catch(err) {
        alert(err.message + " in " + xmlhttp.responseText);
        return;
    }
    callback(loc);
}
};

xmlhttp.open("GET", url, true);
xmlhttp.send();
}

function prev_get(url, callback) {
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //alert('responseText: ' + xmlhttp.responseText);
    try {
        var prevision = JSON.parse(xmlhttp.responseText);
        //var headers = xmlhttp.getAllResponseHeaders().toLowerCase();
        //alert(headers['X-Rate-Limit-Remaining']);
    } catch(err) {
        alert(err.message + " in " + xmlhttp.responseText);
        return;
    }
    callback(prevision);
}

};

xmlhttp.open("GET", url, true);
xmlhttp.send();
}

function timestamp_get(url, callback) {
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //alert('responseText: ' + xmlhttp.responseText);
    try {
        var date = xmlhttp.responseText;
        //var headers = xmlhttp.getAllResponseHeaders().toLowerCase();
        //alert(headers['X-Rate-Limit-Remaining']);
    } catch(err) {
        alert(err.message + " in " + xmlhttp.responseText);
        return;
    }
    callback(date);
}

};

xmlhttp.open("GET", url, true);
xmlhttp.send();
}

ip_get('https://api.ipify.org/', function(data) {
var ip = data;
loc_get('https://ipapi.co/' + ip + '/json', function(data) {
var latitude = data['latitude'];
var longitude = data['longitude'];
//document.getElementById('y_lat').innerHTML = "<p id='y_lat'>Your latitude : " + data['latitude'] + "°</p>";
//document.getElementById('y_lon').innerHTML = "<p id='y_lat'>Your longitude : " + data['longitude'] + "°</p>";
prev_get('https://www.n2yo.com/rest/v1/satellite/visualpasses/25544/' + data['latitude'] + '/' + data['longitude'] + '/10/0/10/&apiKey=7VFHXQ-LBZVP5-3Y4ZGN-4HWY', function(data) {
  var response = data['passes'];
  var prevision = response['0'];
  var duration = prevision['duration'];
  var timestamp = prevision['startUTC'];
  timestamp_get('https://showcase.api.linx.twenty57.net/UnixTime/fromunix?timestamp=' + timestamp, function(data) {
    document.getElementById('next_pass').innerHTML = "<p id='next_pass'>Next pass : " + data + "</p>";
  });
  document.getElementById('next_pass_duration').innerHTML = "<p id='next_pass_duration'>Next pass duration : " + duration + " seconds</p>";
});
});
});


function capitalizeFirstLetter(string) {
return string.charAt(0).toUpperCase() + string.slice(1);
}
iss_get('https://api.wheretheiss.at/v1/satellites/25544', function(data) {
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
iss_get('https://api.wheretheiss.at/v1/satellites/25544', function(data) {
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
var t=setInterval(actualize,1500);
