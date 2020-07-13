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


// location.host = 'skype.com'