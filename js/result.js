var getParams = function() {
  var parameters = {}
  var queries = window.location.search.substring(1);
  var variables = queries.split("&");
  for (var i = 0; i < variables.length; i++) {
    var variable = variables[i];
    var query = variable.split("=");
    parameters[query[0]] = query[1];
  }
  return parameters;
}

var setBackground = function() {
  var parameters = getParams();
  if (parameters["run"] == "true") {
    $("body").css("background-color", "#e74c3c");
  } else {
    $("body").css("background-color", "#2ecc71");
  }
}

var preparePhrases = function() {
  var parameters = getParams();
  var phrases = {};
  if (parameters["run"] == "true") {
    phrases["run"] = "GET RUNNING!";
    var minutes = Math.ceil(parseInt(parameters["time"]) / 60);
    phrases["time-availible"] = "Or you'll be " + minutes + " minutes late!";
  } else {
    phrases["run"] = "Take your time!";
    phrases["time-availible"] = "Woohoo for you!";
  }
  return phrases;
}

var fillPhrases = function() {
  var phrases = preparePhrases();
  for (var phrase in phrases) {
    var id = "." + phrase;
    $(id).html(phrases[phrase]);
  } 
}

var initializeMap = function() {
  var canvas = document.getElementById("map_canvas");
  $.when(getFrom()).done(function() {
    var canvas = document.getElementById("map_canvas");
    var options = {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: from,
      zoom: 16
    }
    var map = new google.maps.Map(canvas, options);
  });
}

$(document).ready(function() {
  setBackground();
  fillPhrases();
  initializeMap();
});
