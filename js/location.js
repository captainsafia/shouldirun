var from, to = null;

/*
* Uses the HTML5 geolocation library to get the current location of the user 
* and then create a LatLng object in the from variable. Returns 
* a deferred object used later in the script.js
*/
var getFrom = function() {
  var deferred = new $.Deferred();
  navigator.geolocation.getCurrentPosition(function(position) {
    var coordinates = position.coords;
    from = new google.maps.LatLng(coordinates.latitude, coordinates.longitude);
    deferred.resolve();
  }, function(error) {
    console.log("Error (" + error.code + ") " + error.message);
  });
  return deferred.promise();
}

/*
* Given a string containing the address of the location, use the Google Maps 
* Geocoding API to fetch the latitude and longitude and create a LatLng object
* into the to variable. Returns a deferred object used later in the script.js
*/
var getTo = function(destination) {
  var data = {"address": destination};
  var deferred = new $.Deferred();
  geocoder.geocode(data, function(response, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var latitude = response[0].geometry.location.lat();
      var longitude = response[0].geometry.location.lng();
      to = new google.maps.LatLng(latitude, longitude);
      deferred.resolve();
    } else {
      alert("There was an error while geocoding the destination address because: " + 
            status);
      deferred.reject();
    }
  });
  return deferred.promise();
}
