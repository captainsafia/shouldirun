var getWalkingTime = function(origin, destination) {
  var origin = origin;
  var destination = destination;
  var service = new google.maps.DistanceMatrixService();
  var data = {
    origins: [origin],
    destinations: [destination],
    travelMode: google.maps.TravelMode.WALKING,
    unitSystem: google.maps.UnitSystem.IMPERIAL
  };
  var deferred = new $.Deferred();
  service.getDistanceMatrix(data, function(response, status) {
    if (status == google.maps.DistanceMatrixStatus.OK) {
      var results = response.rows[0].elements;
      var element = results[0];
      var duration = element.duration.value;
      walkingTime = duration;
      deferred.resolve();
    } else {
      console.log("DistanceMatrix Error: " + status);
      deferred.reject();
    }
  });
  return deferred.promise();
}

var getArrivalTime = function(time) {
  var pm = time.endsWith("pm");
  var hoursMinutes = time.split(":");
  var hours = pm ? parseInt(hoursMinutes[0]) + 12 : parseInt( hoursMinutes[0]);
  var minutes = parseInt(hoursMinutes[1].substring(0, hoursMinutes[1].length - 2));
  var arrivalTime = new Date();
  arrivalTime.setHours(hours, minutes);
  return arrivalTime;
}

var runningLate = function( arrivalTime) {
  var timeAvailible = arrivalTime.getTimeUntil();
  if (walkingTime > timeAvailible) {
    return true;
  } else {
    return false; 
  }
}