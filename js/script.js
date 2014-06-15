var geocoder = new google.maps.Geocoder();
var walkingTime = null;
var autocomplete;

var initializePlacesAutocomplete = function() {
  var data = {types: ['geocode']}
  var element = document.getElementById("to");
  autocomplete = new google.maps.places.Autocomplete(element, data);
}

var extractValues = function() {
  var destination = $("#to").val();
  var arrival = $("#arrive").val();
  return {"destination": destination, "arrival": arrival}
}

$(document).ready(function() {
  initializePlacesAutocomplete();
  $("#arrive").val(new Date().getPrettyTime());
  $(this).keyup(function(event) {
    if (event.keyCode == '13') {
      var values = extractValues();
      var destination = values.destination;
      var arrival = getArrivalTime(values.arrival);
      $.when(getFrom(), getTo(destination)).done(function() {
        $.when(getWalkingTime(from, to)).done(function() {
          console.log("From: " + from + " To: " + to + " Arrival: " + arrival + " Walking Time: " + walkingTime + " Time Availible: " + arrival.getTimeUntil());
          if (runningLate(arrival)) {
            window.location = "result.html?run=true&time=" + Math.abs(walkingTime - arrival.getTimeUntil());
          } else { 
            window.location = "result.html?run=false&time=" + (walkingTime - arrival.getTimeUntil());
          } 
        });
      });
    }
  });
});

