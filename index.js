
//variable bank

//node imports
var Word = require("./word.js");
var inquirer = require("inquirer")

//game variables
var wins = 0; //wins
var losses = 0; //losses
var chances = 6; //chances

var toneSet = [
"1",
"You're wrestling with Nosferatu. You're losing blood quickly; but you can FEEL the sunlight beginning to rise from the water's horizon. You are so close to survival...",
"Blood is flowing down your face and stinging your eyes. You've dropped the torch; for at this point you would be just as blind with the light of day...",
"Your torch is smoldering. It saved you from the Monster's attack, but at a cost. If you did not know this ship as only a Captain could, you would be surely lost...",
"You are feeling the pain now. Your only chance is the Captain's quarters. You stumble towards the door...",
"You cover your bleeding arm and swing your torch. Wherever the Ghoul is, you do not see it...",
"You stand on the ship's deck. Your only light is a dimly lit torch that is fading quickly, but you know you just need outwait the Ghoul until the Sun rises..."
];

var nosAction = [
"1",
"You've reached the door. As you fumble with the knob, rotten teeth sink into your neck. You howl with pain and begin flailing at the Ghoul.",
"A rat pounces on your face. You fling it off, and with it ribbons of the flesh from your brow. A deception from the Ghoul, albeit a painful one.",
"Nosferatu shows himself. His outstretched hands reach for your neck. You swat him with the lit end of your torch. An unholy shriek pierces the heavens, but it seems to have warded him off.",
"Out of the corner of your eye you see a moving figure. As you turn to face it you feel its long nails drag across your back. The Ghoul has retreated back into the shadows.",
"You feel a sharp pain, followed by a warm, wet feeling running down your arm. You look down and see red.",
]

var guessedLetters = []

//function bank

//initial setting of word
function wordSetter() {
	Word.WordSetter();
	console.log("\x1b[37m" + toneSet[chances], "\x1b[0m");
	console.log("You have" + "\x1b[31m", chances + " pints of blood " + "\x1b[0m" + "remaining");
	console.log(wordDisplay);
	userGuesser()
}

//userGuessing function
function userGuesser() {
	if (chances === 0) {
		losses++;
		console.log("game over");
		gameStart()
	} else {
		inquirer.prompt(
		{
			type: "input",
			name: "variable",
			message: "\x1b[33m" + "Enter a letter...",
		}).then(data => {
			if (data.variable.length > 1) {
				console.log("\x1b[33m" + "That is not a single letter, try again...");
				userGuesser()
			} else if (!data.variable.match(/[a-z]/i)) {
				console.log("\x1b[33m" + "That is not a letter, try again...");
				userGuesser()
			} else if (guessedLetters.indexOf(data.variable) > -1) {
				console.log("\x1b[33m" + "You have already given the Beast that answer", "\x1b[0m");
				userGuesser()
			} else {
				guessedLetters.push(data.variable);
				console.log("======================");
				checkLetter(data.variable);
				setTimeout(function() {userGuesser()}, 1000);
			}
		})
	}
}


function checkLetter(input) {
	secret = secret.toUpperCase();
	input = input.trim().toUpperCase();

	if (secret.indexOf(input) === -1) {
		chances--;
		console.log("\x1b[33m" + nosAction[chances], "\x1b[0m")
		console.log("\x1b[37m" + toneSet[chances], "\x1b[0m");
		console.log("You have" + "\x1b[31m", chances + " pints of blood " + "\x1b[0m" + "remaining");
		Word.LetterGuesser(input);
	} else {
		console.log("\x1b[33m" + "You shout your answer to the Heavens. You hear no response, but you know you are closer to morning...", "\x1b[0m")
		console.log("\x1b[37m" + toneSet[chances], "\x1b[0m");
		console.log("You have" + "\x1b[31m", chances + " pints of blood " + "\x1b[0m" + "remaining");
		Word.LetterGuesser(input);
	}
}

function gameStart() {
	//entrance message
	if (wins === 0 && losses === 0) {
		console.log("====================================================================================================");
		console.log("====================================================================================================");
		console.log("MMMMMMMMMMMMMMMMNs+/::---...............----.-..--------....------:://+ososyhNMMMMMMMMMMMMMMMMMMMMMM");
		console.log("MMMMMMMMMMMMMMMNs+///---......................`..--.-....-....------::/++oosyydNMMMMMMMMMMMMMMMMMMMM");
		console.log("MMMMMMMMMMMMMMNyo+//:----.....``.......`......`...`..............---:://+ooosyyhmMMMMMMMMMMMMMMMMMMM");
		console.log("MMMMMMMMMMMMMMhsoo/::::---....````````.`..``.```````.....-.--.------:://+ooossyyydMMMMMMMMMMMMMMMMMM");
		console.log("MMMMMMMMMMMMMdssoo+/::------...```````--..``..``````..---:::::-----::///+ossssssyyhMMMMMMMMMMMMMMMMM");
		console.log("MMMMMMMMMMMMNyysso+/////+/////:---.``.-:..``--....--:/+ooooo++//:-::/+//+syyyyyyyyydMMMMMMMMMMMMMMMM");
		console.log("MMMMMMMMMMMMhsyoss//++osysyssso++/:--:/:.```.::-::+osyhhyysyso+//:::+/++osyyyyyyyyyymMMMMMMMMMMMMMMM");
		console.log("MMMMMMMMMMMNyysyho+oosyyyyyhmmmmdhysso+:.``.-:o+oshhmNmmmdddhysso+/:/+++osysyhhyyyyyhNMMMMMMMMMMMMMM");
		console.log("MMMMMMMMMMMmyyyss++syyyhmNNMMNNNmmmdhy+-...-:/yyhdmmmdmNNNNNNmdhsso//+oo+sssshhhhyyyhNMMMMMMMMMMMMMM");
		console.log("MMMMMMMMMMMdyyyosohdddmNNmddddmmmmNmho/-..::/+sdmmdhhdddhhdddNNNdys+++o+:osoyyyyhyyyhmMMMMMMMMMMMMMM");
		console.log("MMMMMMMMMMMhyyyoshdmmNNmdddhhhhhmddmdo:.`.-:+ssdmhhhhhyo+oyhhdmNNmyso+oo-+syyyyyyyyyhdNMMMMMMMMMMMMM");
		console.log("MMMMMMMMMMNyyyysshmNNmmhs++//ooyhdyhd+-````.:oshsoyhys+..:-ssshmddhso/oo/:/sssyyyyyyhdNMMMMMMMMMMMMM");
		console.log("MMMMMMMMMMmyyyso+smmmdyo+-+.-/o/osssy:.```.--++y+:+osyo:-::ysoshdhyoo+++s/:ssssysssshdNNMMMMMMMMMMMM");
		console.log("MMMMMMMMMMdssso++sddhhsos+//+so+o/+s/-```..-:///oo+ssssoossysshddhsso+/:+o/osssyssooydNNNNNNNNNNNNNN");
		console.log("MMMMMMMMMNysoo//ossyssyysyssoosssso:--.`..-:///:-/+sysso+ooosyyyys+++/::://+oyyyysoosdNNNNNNmmNNNNNN");
		console.log("MMMMMMMMMNso+/::/oo+/+oyyyyyyysso/---.```.-://+/-.``.-///:---------......-:/+syyysoshdNmmmy/:/smNNNN");
		console.log("MNmmNNMMMmo+/:--::---:/+o+++++/:..--.````..-//++:-.`````.-::-...``.......-::+ooysssydhs+/:..-odmmmNN");
		console.log("Ms//+ossyy++/----..``...-----.```.--.``````-:/oo/-.````````........-..---:::/oosssyys/:-..-+hmmhhdmm");
		console.log("Mms//:/:/+++/:::-.```````````````.--..````.:/oo+::-.`     ```````..-----::::+syyysyh+---:+ymmdhyyyhm");
		console.log("MNdhso+/:/+o+//::-..````````  ``.-//::::::/+syho:::-``     ``````..-----::/+ohddhyhh+/++sdNmddhhhhhd");
		console.log("MmhdmNds++oss+///:-.`````  ``.-:/oyysoo+osshmNNdyo++:..````````..---:::::/+sydmdhhhysssymNhsssyhhyhm");
		console.log("MNhyhdmNdy+yhs++//::-...``.-/oosymNNNNmhhhdNmmmmmhyhy+//:-.``..--://////++oydmddddho/+dNmmhsoosyhhmd");
		console.log("MMdysoshd+/yddyso+++/::::::+yhhhddmmmNNmmmmmddhsoyhdh+++++/:--://++oooo++osydmddddyo+sNNdsysooshdmdd");
		console.log("MMNhyyhds/+ydmdhyyyso++++osso++yhsoyhhhdddhhso/:://+/::::/+/:://+ossyoo+osydmmddddoosdNmyoo+/oyhmddd");
		console.log("MMMmyyhdyoooddmhddddhhhhhys//:-:///::::://----::://:::::--:++/+oosyyy+/++shmmmdddy:odmy+oooo/+ydmddd");
		console.log("MMMNyooyhys+sdmyyydmmmmdys/://///:/::::-::::://+//++////::-:+++osssss+/++shmmddmmo/+hhs:/o+/+ydmdddd");
		console.log("MMMMmyssyyyoshddysyhdhhso+//+++o++++/::----.-///+oooooo++/::/+o+++++o//ooohmdddmds+++////ssydmmddddd");
		console.log("MMMMMmsoosysshhdyssyyhyo+//+ooys+:-:--...```.-..-:/syhhys++++++++///+//sssmmhdmmdo//+ossymNNNmdddddd");
		console.log("MMMMMMmhyyssshhhhysysyys++/+oyd+-/::+/-:+:../o/-+/:/ohmdhyo+///+//:/+/+ssymmydmmd++ossohNNNmdddddddd");
		console.log("MMMMMMMmhdhyshhydhysssys+++/sdd:./--o:./s:..:o:.+-.:oymNmhs+/-:/:--//++ssymhydmNNhssyydNNmdmmmmmmmmm");
		console.log("MMMMMMMMmhmmmNNhhdysooss++++ymy//o.:o.-omh/.:s/:hyoshdNMMdhs/--:/::o+++ssyyyydmNNmmmNNNmmmmmmmmmmmmm");
		console.log("MMMMMMMMMMMMMMMdyddyoosso++syhmyyd++h//hMMh:/dmdNNNNNNNNNyyo+-.:///ooooyoossydNmmmmmNmmmmmmmmmmmmmmm");
		console.log("MMMMMMMMMMMMMMMNhhdysssoo+/++odMMMmmNs/hMMh:/mNNNNNNmmdhsoo/:..:+//oooso//syydNmmmmmmmmmmNmNNNNNNNNN");
		console.log("MMMMMMMMMMMMMMMMdyhhysssoo//+o+mNMMNMmoyMNh+hNNNNmmmmmms+o/:-../+//sosy+/+shdNNNNNNNNNNNNNNNNNNNNNNN");
		console.log("MMMMMMMMMMMMMMMMNhyyyo++oo++/+osmMNNNNmmNmddmmmdddydddhso/:--.-++//sosy++shmNMNNNNNNNNNNNNNNNNNNNNNN");
		console.log("MMMMMMMMMMMMMMMMMmyyyo+/+o+///+oshdmmddmdsosddhsyssyhhso/:::../+o/+soyyoyymNNMNNNNNNNNNNNNNNNNNNMMMN");
		console.log("MMMMMMMMMMMMMMMMMMdyys+/+o+//++osyyyyyhmdo/+ddyssyyyyso//:::.-++o/osoyyyymNNMMNNNNNNNNNNNNMMNMMMMMMM");
		console.log("MMMMMMMMMMMMMMMMMMMdhsso+oo+/+//+oyhhhhhy+:+sooossss+//////:-/+s++syydhhmNMMMMNNNNNMMMMMMMMMMMMMMMMM");
		console.log("====================================================================================================");
		console.log("==============WELCOME... TO...............==========================================================");
		console.log("===============================================.....NOSFERATU'S GHOST SHIP.........=================");
		console.log("====================================================================================================");
	} else {
	console.log("You've logged " + wins + " wins so far.." +
				"\nBut also " + losses + " losses..")
	}
	//
	inquirer.prompt(
	{
		type: "list",
		name: "gameStatus",
		message: "\x1b[33m" + "Would you like to barter for your life?",
		choices: ["Yes Nosferatu. I will accept your challenge.", "No, for I am a coward."],
	}).then(data => {
		if (data.gameStatus === "No, for I am a coward.") {
			console.log("...");
			setTimeout(function() {
				console.log("then FUCK OFF!")
			}, 2000);
		} else {
			console.log("\x1b[33m" + "Then let us... Begin... Captain..." + "\x1b[0m");
			setTimeout(function() {
				wordSetter()
			}, 2000);
		}
	})
}	

gameStart()