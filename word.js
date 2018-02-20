//pull letter mechanics from letter.js
var Letter = require("./letter.js");

//pull secret word (var secret) from wordBank.js
var WordBank = require("./wordBank.js");
// wordInitialize = new WordBank;

//function bank////////////////

//set initial word//
var WordSetter = function(input) {
	wordInitialize = new WordBank;
	hiddenArray = [];

	for (i = 0; i < secret.length; i++) {
		var letter = new Letter.Letter(secret[i]);
		hiddenArray.push(letter);
	}

	wordDisplay = hiddenArray.join(" ");
}

//User Input guess mechanics
var LetterGuesser = function(input) {
	for (i = 0; i < hiddenArray.length; i++) {
		Letter.LetterCheck(input, hiddenArray[i])
	}

	var wordDisplay = hiddenArray.join(" ");
	console.log(wordDisplay);

}

//exporting module
module.exports = {
WordSetter,
LetterGuesser,
}