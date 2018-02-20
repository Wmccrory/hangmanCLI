var Letter = require("./letter.js");
//

var secret = "Secret";
var secretArray = secret.split("");
var hiddenArray = [];


var WordSetter = function(input) {
	for (i = 0; i < input.length; i++) {
		var letter = new Letter.Letter(secretArray[i]);
		hiddenArray.push(letter);
	}

	var wordDisplay = hiddenArray.join(" ");
	console.log(wordDisplay);
}

var LetterGuesser = function(input) {
	for (i = 0; i < hiddenArray.length; i++) {
		Letter.LetterCheck(input, hiddenArray[i])
	}

	var wordDisplay = hiddenArray.join(" ");
	console.log(wordDisplay);

}

WordSetter(secretArray);
LetterGuesser("c");
LetterGuesser("e");
LetterGuesser("p");
console.log(hiddenArray);
console.log(secretArray);