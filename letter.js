//letter constructor for hangman CLI//

var Letter = function() {
	//Input letter to create object
	this.letterInput = function(input) {
		newLetter = {
		name: input.toUpperCase(),
		guessed: false,
		};
	}

	//Display letter or _ depending on if user has guessed correct letter
	this.toString = function(input) {
		if (input.guessed) {
			return input.name;
		} else {
			return "_";
		}
	}

	//Check to see if user input matches any letters
	this.letterChecker = function(input, variable) {
		if (input.toUpperCase() === variable.name) {
			variable.guessed = true;
		}
	}
}

module.exports = Letter;

