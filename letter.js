//letter constructor for hangman CLI//

var Letter = function() {
	//Input letter to create object
	this.letterInput = function(input) {
		newLetter = {
		name: input.toUpperCase(),
		guessed: false,
		};

		Letter.prototype.toString = function(input) {
			console.log("TestTEst");
			console.log(newLetter.name);
			var testMe = newLetter.name;
			if (input.guessed) {
				console.log(testMe);
			} else {
				console.log("_");
			}
		}

		console.log(newLetter);
	}

	//Display letter or _ depending on if user has guessed correct letter
	// this.toString = function(input) {
	// 	if (input.guessed) {
	// 		console.log(input.name);
	// 	} else {
	// 		console.log("_");
	// 	}
	// }

	//Check to see if user input matches any letters
	this.letterChecker = function(input, variable) {
		if (input.toUpperCase() === variable.name) {
			variable.guessed = true;
			console.log(variable);
		} else {
			console.log(variable);
		}
	}
}

// var letter = new Letter();
// letter.letterInput("a");
// letter.toString(newLetter);
// letter.letterChecker("a", newLetter);
// letter.toString(newLetter);

module.exports = Letter;