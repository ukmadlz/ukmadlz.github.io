// Force HTTPS
if(location.host == 'elsmore.me' && location.protocol != 'https:') {
 location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}
// Materialize JS
$(document).ready(function() {
  $(".button-collapse").sideNav();
  $('.parallax').parallax();
});
