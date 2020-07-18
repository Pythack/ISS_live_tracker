  // Preloader
  (function($) {
    "use strict";
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });


  // Cursor
  $(document).ready(function(){
  var cursor = $('.cursor');

  $(window).mousemove(function(e) {
         cursor.css({
             top: e.clientY - cursor.height() / 2,
             left: e.clientX - cursor.width() / 2
         });
     });
 });

})(jQuery);

console.clear()

// Get users IP
$.get('https://www.cloudflare.com/cdn-cgi/trace', function(user_data) {
    // console.log(user_data)
})

// Get users locations
$.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(location_data) {
  // console.log(JSON.stringify(location_data, null, 2));
});

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
        console.warn(err.message + " in " + xmlhttp.responseText);
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
        console.warn(err.message + " in " + xmlhttp.responseText);
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
        console.warn(err.message + " in " + xmlhttp.responseText);
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
        console.warn(err.message + " in " + xmlhttp.responseText);
        return;
    }
    callback(prevision);
}

};

xmlhttp.open("GET", url, true);
xmlhttp.send();
}

function astros_get(url, callback) {
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //alert('responseText: ' + xmlhttp.responseText);
    try {
        var response = xmlhttp;
        var astro = JSON.parse(xmlhttp.responseText);
        //var headers = xmlhttp.getAllResponseHeaders().toLowerCase();
        //alert(headers['X-Rate-Limit-Remaining']);
    } catch(err) {
        console.warn(err.message + " in " + xmlhttp.responseText);
        return;
    }
    callback(astro, response);
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
        console.warn(err.message + " in " + xmlhttp.responseText);
        return;
    }
    callback(date);
}

};

xmlhttp.open("GET", url, true);
xmlhttp.send();
}

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    console.log('Detected device type : tablet');
    localStorage.setItem('device_type', 'tablet');
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    console.log('Detected device type : mobile');
    localStorage.setItem('device_type', 'mobile');
    return "mobile";
  }
  console.log('Detected device type : desktop');
  localStorage.setItem('device_type', 'desktop');
  return "desktop";
}

function format() {
  var device_type = getDeviceType();
  if (device_type == "mobile") {
    document.getElementById('info_div').style.top = "15cm";
    document.getElementById('info_div').style.left = "1cm";
    document.getElementById('pred_div').style.top = "20cm";
    document.getElementById('pred_div').style.left = "1cm";
    document.getElementById('title').style.left = "3cm";
  }
  if (device_type == "tablet") {
    alert('This is a tablet!');
  }
}

ip_get('https://api.ipify.org/', function(data) {
var ip = data;
localStorage.setItem('ip', ip);
});
loc_get('https://ipapi.co/' + localStorage.getItem('ip') + '/json', function(data) {
localStorage.setItem('device_latitude', data['latitude']);
localStorage.setItem('device_longitude', data['longitude']);
});
prev_get('https://www.n2yo.com/rest/v1/satellite/visualpasses/25544/' + localStorage.getItem('device_latitude') + '/' + localStorage.getItem('device_longitude') + '/10/10/300/&apiKey=7VFHXQ-LBZVP5-3Y4ZGN-4HWY', function(data) {
  var response = data['passes'];
  var prevision = response['0'];
  localStorage.setItem('next_pass_duration', prevision['duration']);
  var timestamp = prevision['startUTC'];
  timestamp_get('https://showcase.api.linx.twenty57.net/UnixTime/fromunix?timestamp=' + timestamp, function(data) {
    localStorage.setItem('next_pass_start', data);
    document.getElementById('next_pass').innerHTML = "<p id='next_pass'>Next pass : " + data + "</p>";
  });
  document.getElementById('next_pass_duration').innerHTML = "<p id='next_pass_duration'>Next pass duration : " + localStorage.getItem('next_pass_duration') + " seconds</p>";
   localStorage.setItem('next_pass_start_azimuth', prevision['startAz']);
   localStorage.setItem('next_pass_end_azimuth', prevision['endAz']);
   document.getElementById('start_az').innerHTML = "<p id='start_az'>Start azimuth : " + localStorage.getItem('next_pass_start_azimuth') + "°</p>";
   document.getElementById('end_az').innerHTML = "<p id='end_az'>End azimuth : " + localStorage.getItem('next_pass_end_azimuth') + "°</p>";
});

astros_get('http://api.open-notify.org/astros.json', function(data, response) {
  if (response != 200) {
    setTimeout(console.warn("Please desactivate security on this page the reload to access astronauts data. "), 1000);
    document.getElementById('astros_div').style.display = "none";
  } else {
    document.getElementById('astros_num').innerHTML = '<p id="astros_num">Number of astronauts actually in the ISS : ' + data['number'] + '</p>';
    var table = document.getElementById("astros_table");
    var people = data['people'];
    for (p in people) {
    var astro = people[p];
    var astro = astro['name'];
    var row = table.insertRow(-1);
    var cell = row.insertCell(0);
    cell.innerHTML = astro;
  }
  }
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
//document.getElementById('solar_lat_table').innerHTML = "<p id='solar_lat_table'>Solar latitude : " + data['solar_lat'] + "°</p>";
//document.getElementById('solar_lon_table').innerHTML = "<p id='solar_lon_table'>Solar longitude : " + data['solar_lon'] + "°</p>";
});
function actualize() {
iss_get('https://api.wheretheiss.at/v1/satellites/25544', function(data) {
document.getElementById('latitude_table').innerHTML = "<p id='latitude_table'>Latitude : " + data['latitude'] + "°</p>";
document.getElementById('longitude_table').innerHTML = "<p id='longitude_table'>Longitude : " + data['longitude'] + "°</p>";
document.getElementById('altitude_table').innerHTML = "<p id='altitude_table'>Altitude : " + data['altitude'] + " km</p>";
document.getElementById('velocity_table').innerHTML = "<p id='velocity_table'>Velocity : " + data['velocity'] + " km/h</p>";
var visibility = capitalizeFirstLetter(data['visibility']);
document.getElementById('visibility_table').innerHTML = "<p id='visibility_table'>Visibility : " + visibility + "</p>";
//document.getElementById('solar_lat_table').innerHTML = "<p id='solar_lat_table'>Solar latitude : " + data['solar_lat'] + "°</p>";
//document.getElementById('solar_lon_table').innerHTML = "<p id='solar_lon_table'>Solar longitude : " + data['solar_lon'] + "°</p>";
});
}
var t=setInterval(actualize,1500);


// location.host = 'skype.com'
