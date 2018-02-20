//create new letter object
var Letter = function(name) {
  this.name = name;
  this.guess = false;
}

//toString shortcut for display purposes
Letter.prototype.toString = function() {
	var letterDisplay = this.name;

	if(this.guess) {
		return letterDisplay;
	} else {
		return "_";
	}
}

//check hidden word for matching letter
var LetterCheck = function(input, variable) {
	if (input.toUpperCase() === variable.name.toUpperCase()) {
		variable.guess = true;
	}
}

module.exports = {
Letter,
LetterCheck,
}