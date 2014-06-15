Date.prototype.getPrettyTime = function() {
	var hour = this.getHours();
	var minutes = (this.getMinutes().toString().length == 1) ? "0" +  this.getMinutes() : this.getMinutes();
	var meridiem = (hour > 11) ? "pm" : "am";
	return ((hour > 11) ? (hour - 12) : ((hour == 12) ? 12 : hour)) + ":" + minutes + meridiem;
}

Date.prototype.getTimeUntil = function() {
	return (this.getTime() - new Date().getTime()) / 1000;
}

String.prototype.endsWith = function(suffix) {
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
}