var Letter = function(name) {
  this.name = name;
  this.guess = false;
}

Letter.prototype.toString = function() {
	var letterDisplay = this.name;

	if(this.guess) {
		return letterDisplay;
	} else {
		return "_";
	}
}

var LetterCheck = function(input, variable) {
	if (input.toUpperCase() === variable.name.toUpperCase()) {
		variable.guess = true;
	}
}

module.exports = {
Letter,
LetterCheck,
}