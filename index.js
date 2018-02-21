
//variable bank

//node imports
var Word = require("./word.js");
var inquirer = require("inquirer")

//game variables
var wins = 0; //wins
var losses = 0; //losses
var chances = 6; //chances
var winstate = false; //win state checked every time a correct letter is guessed
var guessedLetters = [] //array holding all guessed letters to prevent repeated guesses

//flavor text that gives a sense of how 'close' you are to losing
var toneSet = [
"Nosferatu has you now. You fade into unconciousness, your last memory of unfathomable pain...",
"You're wrestling with Nosferatu. You're losing blood quickly; but you can FEEL the sunlight beginning to rise from the water's horizon. You are so close to survival...",
"Blood is flowing down your face and stinging your eyes. You've dropped the torch; for at this point you would be just as blind with the light of day...",
"Your torch is smoldering. It saved you from the Monster's attack, but at a cost. If you did not know this ship as only a Captain could, you would be surely lost...",
"You are feeling the pain now. Your only chance is the Captain's quarters. You stumble towards the door...",
"You cover your bleeding arm and swing your torch. Wherever the Ghoul is, you do not see it...",
"You stand on the ship's deck. Your only light is a dimly lit torch that is fading quickly, but you know you just need outwait the Ghoul until the Sun rises..."
];

//flavor text when you 'lose' some blood i.e. wrong letter
var nosAction = [
"The door, and the sun, seem but a distant memory.",
"You've reached the door. As you fumble with the knob, rotten teeth sink into your neck. You howl with pain and begin flailing at the Ghoul.",
"A rat pounces on your face. You fling it off, and with it ribbons of the flesh from your brow. A deception from the Ghoul, albeit a painful one.",
"Nosferatu shows himself. His outstretched hands reach for your neck. You swat him with the lit end of your torch. An unholy shriek pierces the heavens, and it seems to have warded him off.",
"Out of the corner of your eye you see a moving figure. As you turn to face it you feel its long nails drag across your back. The Ghoul has retreated back into the shadows.",
"You feel a sharp pain, followed by a warm, wet feeling running down your arm. You look down and see red.",
]

//losing splash image
function loseAscii () {
	console.log("====================================================================================================");
	console.log("====================================================================================================");
	console.log(".-so:....-/.--..---------+/---------+--/o++---+-/--.-............./-dNdMMdso////:-/sso/:+....:-`````");
	console.log("-so----.-+..------------/o---------s:--++:/..::::-................s-:mmmMNys++///::sso/:o.....+`````");
	console.log("yo-.--..+-....-..------:o---------+-/-:+:+..././..................o..+mddMdys+///::oso+--.....-:``  ");
	console.log("+....../-.....---------s---------+:-:-+s::..-:-:..................+-..omhNMdss///:-+sso:-....../``  ");
	console.log("....../:...--.--------o:--------/:---y+o+./o+:--.......``........`:....smhdmyss//:::shs+:...```.:   ");
	console.log(".....::........------//--------:/--./o:o++yhhs/o/-.....```````````:.```-hdmhmyo+//::oysoo/:.````:.  ");
	console.log("....-/........-...--:+--------:o:-.:o:/+/dyyhh//:+-...````````````:.````+ddhddso+/:-+soo--::`````/  ");
	console.log("...-/.........-----:o-------.:s.--:h/.+/hmmddy+/o/...`````````````:.`````/dhhdhs+//:/sos--:/```  .- ");
	console.log("..-+..........---/+s/--------o:...syydNNNNMMNysmdy+-`````````  `  -.``````+dhhdho+/::oss:./.``    :`");
	console.log("..+-......---..-osyyo-------o....hNmNMMMMNMMNmmMmmdhs-```````     --``````.ymyohso+/:oss+--```    `:");
	console.log("./-.....-----..+shhd+--...-s-...oNMMMMMMMMMNNNMmhdhhhyy-          --``````.hmddhyss+:/sso--.``     -");
	console.log("/-...---..-...+/+yso-....-oo-..+mNMMMMMMMMMMMNMNmdddhhs`          -:`````.`:ydmNmhso//syyo/.```     ");
	console.log(":...--.------++-s/-/....-o-.:.:mydMMNMMMMMMMMNMNdddddhy/``        .: ````.`..hmmmmhs+/syyooo/``     ");
	console.log(".....-------/+-y/:::...-o-..:/dd:MMMNMMMMMMMMNNNmmmmdmds.``` `````-/  `````..-sdmNmys/+yss:/:/``    ");
	console.log("..-.-------/+-+::./...-y:...-ydd/MMMNMNMMMMMMMNMNmNNNMMms``` `````:/ `````.....sdmmmy++ysy:://``    ");
	console.log("----------/o-/:/.-/..-o-/...ssy+/MNmNs/MMMMMMNNNNNMMMMMNd: ` `````:+``````......hmmmdy+yyy/-:.```   ");
	console.log("---------/o-///--/-.-o..:-.+o.+:oNNmm.dMMMMMMMNMNNMMMMMMNm/```````:+```.........-dmmNdyyhys--.```   ");
	console.log("--------:o-//+--./.:o....:+y-/.-dNMNo+MMMMMMMMNMNNMMMNod+hhyho:``.:o```........../mNNNhshhyo/-````  ");
	console.log("-------:o::/+----::o...-.:y//:.omhdy.mMMMMMMMMNMMNMMMNh.:oydyoo:``:o``............hNMNNyhhyo++/:.`  ");
	console.log("------:o::/+----//o------y-:o./ho++ooNMMMMMMMMMMMNMMMMM:`./o-s:...:o`.............smNMNNhddy++:--::-");
	console.log("-----:o::++-----so------y--+-:so::/:mdMMMMMMMMMMMMMMMMMh-:--:..``.:o............../mNNMNdddhs+--/.``");
	console.log("----:o:-+/-----+o------y+.+--sss:../MMMMMMNMMMMMMMMMMMMN-````.....:o..............-mdNNMmyyyo//.:/  ");
	console.log("---:o:-+/:----+s.-----o+./-.+os.//-dMMMMMMNMMMMMMMMMMMMNo``......./o...............hdNNNmdyss::/+`  ");
	console.log("---o/-++o++:-ooo..---+o.::-.yy+---/MMMMMMMNMMMMMMMMMMMMNh.`...`.../o...............somMNNmhss/::`  `");
	console.log("--o/-+/ymmmmhs//-.--/s.-/..oymy---hMMMMMMMMMMNMMMMMMMMMNm:..```.../o`..............+yhNNmmdhyysssyyy");
	console.log("-+/-///-/yNNNmh/:-.:h--+..-y-ymh-/MMMMMMMMMMMMMMMMMMMMMMmo``````.`/+`...--://+osyhdmmmmmmmmdhhhyysss");
	console.log("+/-///----ymNNNms/:h/.+-..o:..sNddMMMMMMMMMMNMMMMMMMMMMMNd``.:::/+yhyhdmmmmmNNmmddhysoo+oo+///+///::");
	console.log("/-/+/----o/+ohNMMmh+:/:..:+....+NMMMMMMMMMMymMMMMMMMMMMMMN:/ddmmmdddhhhsooooooooo+///:::/+++++//::-.");
	console.log("-:+/----o/--s-:yNMMdso--:s......s/ymMMMMMNN-yMMMMMMMMMMMNo.`:oys++////s:::::++oo+////////+////:::--.");
	console.log("oo+---:s:--+-::/hNMMNmo:o:.....+:.+dMMMMmms`hMMMMMMMMms/````.+ys++/::/s:::::+ooo+++++/:::+////:::-..");
	console.log("yysommho--/:--:+s+:dMMNdy-....-o.+-NMMMMmm..mMMMMMMh````-ohdNNys++/:::s/:::/+oo+++/+/:::-///:::::-..");
	console.log("hhhhdmNNd+y:-o/s--o::yMMNdo-..o--+/MMMMMNy`.NMMMMMNs````.hNNmdhs+o////o+++++ooooooossssyyhhhddmddddd");
	console.log("dhhhddhmNNdss+s:-//::/ymMMNh+:o.+-sMMMMMN/..MMMMMMN-``````:-`-hsosssyhdmmmNMMMMMMMMMMMMMMMMNNNmmddmd");
	console.log("NdddmdhhhdNMmys.:/.---y-:yNNNd+-+.dMMMMMM-.-MMMMMMh``.-/+osydmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNN");
	console.log("====================================================================================================");
	console.log("====================================================================================================");
	console.log("\x1b[33m" + "The Beast, Nosferatu, feasts tonight..." + "\x1b[0m");
};

//winning splash image
function winAscii () {
	console.log("====================================================================================================");
	console.log("====================================================================================================");
	console.log("yyyysssssssssssssssssssssssssssssssooo++//:::--:-....-----:::::::://+ooooooooo++++++ooooooo++ooooooo");
	console.log("yyyyyyyyyyyyyyyyyyyyyyyssssssssssssssoooo+++++////--..----:::::/+ooo+++///////+++++++++++o+++++++++o");
	console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyysssssssssssssssssoooo++/:+::///:///+o+///////////////////+++++++++++ooo");
	console.log("yyyyyyssssssssyyyyyyyyyyyyyyyyyyysssssssssssssssssssssso/+++/+////::::///////////////////+++++++++oo");
	console.log("syyysssssssssssssyyyyyyyyyyyyyyyyyyyyyyyyysssssssooooooo+/+++/::::s////++////////////////+++++++++oo");
	console.log("ssssssssssssssssssyyyyyyyyyyyyyyyyyyyyyyyyyysssssso+/++o///::-----+:::::////o////////:::///+++++++++");
	console.log("sssssssssssssssssyyyyyyyyyyyyyyyyyyyyyyyyyyyyyysssoo++++/::-------/:::::::::/yy+::::::::::/+++++oooo");
	console.log("oosssssssssssssssyyyyyyyyyyyyyyyyyyyyyyyyyyyyysssssoyshyssy/:-::::/--::::::::/shs::::::::///++++oooo");
	console.log("ooosssssssssssssssssyysssyyyyyyyyyyyyyyyssyyyyysssssyhmmdyo+//://///:/-::::::::+so:---:/+++++++ooooo");
	console.log("ssssssssssssssssssssssssssssossssssssssssyyyyyyyysso+ohmyo++++++oo+ooo/---------::----::::/+++oooooo");
	console.log("ssssssssssssssssssssssso+//://+/+++++ssyyyyyyyyyysso+ssmyoso+//+ydddhs/---------------:::::-.-//////");
	console.log("sssssssssssssssssssosssssso::::---:--/+osssyyysssso:/ssmh////--://hdy/:--------------.-::::///:----:");
	console.log("+ossssssyysssss+//+/+osossso//+//-:///+/+oosssosoo+:/o/dd:/+++::::ymy+:-----::::----::/++++++oo++/++");
	console.log("++oooo+oossoo++//++/////++++++ooo++oooo+////+++++:::o+/dd/:/::/::/sdh//:--:/++++/++//+oossssssssooos");
	console.log("++///+///++/////:/:/:::::////+++/////+/++////::://::s:/hm+://+++:+/dd++o/++ooossoooosssssysyysssssss");
	console.log("ooooooo++++//////////////::::::////::::///:::::::::s+-/ym+:::::::+:dds+s+++ooooossssyyyyyyyyyyyyyyyy");
	console.log("ssssshyyyyyssysoo+++++o+///////////++++///++++++//+s+//sho///++o+o+yds/+s+/::///++++osyyyssyyyyyyyyy");
	console.log("osssssssssyyyhhhhhhhyhdyyssssoys+++osoo++++++oo++yy+syhhys/+oooososyhy+oysoo++o+:---:/osyyssyyyyyyyy");
	console.log("sssssosssoooo+oo++++oooooossyhhhyyshhhyys+++++//sys//osydyoo+++oooooss+ososssoosooooooosyssyyyyyyyyy");
	console.log("sooo++oo++ooooosooo++++oo+++ohdh/sosyhmdddhhhsyyhhhhydhhddhhhhhhdyhsyssoysssssssssssssssyssyysssssss");
	console.log("oossooooooooooooooo+/+++++++symdosshyhddddhhddmmddhyssssydysssyyhhhhmdyhhyossossssssssssssoossoooooo");
	console.log("oooooooooooosssssssssoooooooyshdooyhyydNNNdhhhdddNmdmmmdddyhhhyyydydmmdhhhhhysooooooooooooooossososs");
	console.log("ooooooooooooooooo+oooooooooohsoo+oydhydmNNmNmmmdddddmmmmmmdmddddhdmNmdhhhdhyhhyssssssoosssssssssssss");
	console.log("oooooooooooooo+///++oooo+++ohsooooohmhdhdmmdmNmmmmdddmmmNNddmmmmmNNNmNNmmmmdddhysssssosoossosssossss");
	console.log("sssssssossssso++/++oooossoosysssssssydddmmdhdmNNNNMNNNNNNMNmddddmNNmmNNNNNMNNmmmmdhyssssssssssssssss");
	console.log("sssssssssssssssssssssssssssyyssssooosssyhhdmNNNNNMMNNNNNNNNmmddhdmmdmmmdmmmmdhhhhdNmssssssssssssssss");
	console.log("hyyyyyyyyyyyyyyyyyyyyyssyyyhhyyysyyyyyyyyyyhNMNNNNNNNNmmmmmddhhhddmdddddddddhmhyhhmhyyyyyyyyyyyyyyyy");
	console.log("ddddddddddhhhhhhyyyddhhhyyhhyhhhhhdyyhyyhhhdmNMMNNNNNNNNNNNNNNNmmmmmhmdddmdyhhhdddmhyyyyyyyyhhhhhhhh");
	console.log("dddddddddhdhhyhhhhhyyyyyhhhyyyyhhhyyyyyhyyyhdmMMNNMMMMNMNmdddhhhddddhhhhhhdhyddddhdhsyhyyyyyyyyyyyyh");
	console.log("hhhhhhhhhhhhdddhhyyyhhdhhhhhdddhyyso+odmmmmmmmmmNNNNNNmhhddhhdhdmdhddhyyhhhdhhhyyosssssyyyyysyyhhhyy");
	console.log("hhhhhhhhhdhhhyyhhhhyyyyhhdddddddhhyhmmMMNmmNNmmhyhmmNNNysysoossyyyyyysoosysyyyysssyyyhdmddhddmNNNNNN");
	console.log("ddhhhhhhhhyyyyyyyyyyyhhdddhhhyyyhyyyhhhdhhhhhhyyyyyhhhhhhssssysyyyyyysssyyyyyysyyyhdddhdmmmmmmNNNNNN");
	console.log("hhyyyyyyysyyysysyyyhysssssssssysssoosssssyyssossssssysysssyyyyyyhdhyyyyssyyyyyyyyyyyyyyyyhhhddmmmmNN");
	console.log("dhhhhhhhyyyyyhhhhhyyyyyyyyyssssssssssooooooossssssyyhddhhhdddhdmddmdddddhhhhhhhhhhyyyyyyyhhyyyhhdddd");
	console.log("mmdddddhhhyyyssyysssssssssssoossssyyyyssssssossssssossssooosssssooossssssssssssssssyyysssssysssysyyh");
	console.log("hhhhhyyyyyyyyssssssyyyhyyyyyyhhhdddmdddddhhdhyhdhysssoosssoooooooosssooossssssssssssyyyyyyyysssyyyyy");
	console.log("====================================================================================================");
	console.log("====================================================================================================");
	console.log("\x1b[33m" + "The sun rises and the Beast Nosferatu retreats. You are very hurt, but you have bought time to hunt the fiend down before nightfall..." + "\x1b[0m");
}

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
		loseAscii()
		gameReset()
	} else if (winstate === true) {
		wins++;
		winAscii()
		gameReset()
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
				userGuesser()
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
		winYet();
	}
}

//function checking if win condition met
function winYet () {
	for (i = 0; i < hiddenArray.length; i++) {
		if (hiddenArray[i].guess === true) {
			winstate = true;
		} else {
			return winstate = false;
		}
	}
}

//resetting game
function gameReset() {
	chances = 6;
	guessedLetters = [];
	winstate = false;
	gameStart()
}

//initializing game
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
		console.log("============..WELCOME....TO........................................................=================");
		console.log("============........................................NOSFERATU'S GHOST SHIP.........=================");
		console.log("====================================================================================================");
	} else {
	console.log("You've logged " + wins + " wins so far.." +
				"\nAnd also " + losses + " losses..")
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

//command starting the entire game process
gameStart()

//testing area