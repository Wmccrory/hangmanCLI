var wordBankChoice = [
	"Hello",
	"Secret",
	"Choices",
	"Anakin",
]

var testMe = function() {
	secret = wordBankChoice[Math.floor(Math.random() * wordBankChoice.length)];
}

module.exports= testMe;