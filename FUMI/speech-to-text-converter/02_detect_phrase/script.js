var result = document.getElementById('result');
let isPressed = false;
const poemA = `Color of the flower Has already faded away, While in idle thoughts My life passes vainly by, As I watch the long rains fall.`;
const poemB = `The Great And Locomotive Antaro
A Poem by antaro
Whose antaro is that? I think I know.Its owner is quite sad though.It really is a tale of woe,I watch him frown. I cry hello.
He gives his antaro a shake,And sobs until the tears make.The only other sound's the break,Of distant waves and birds awake.
The antaro is great, locomotive and deep,But he has promises to keep,Until then he shall not sleep.He lies in bed with ducts that weep.
He rises from his bitter bed,With thoughts of sadness in his head,He idolises being dead.Facing the day with never ending dread.`;

const poemAarray = wordSplit(poemA);
const poemBarray = wordSplit(poemB);
const lowerA = poemAarray.map(element => { return element.toLowerCase() });
const lowerB = poemBarray.map(element => { return element.toLowerCase() });
// checkZone(lowerA, "chocolate")
// checWord("chocolate",poemAarray)

window.onkeydown = function (event) {
	if (event.which == 32) isPressed = true;
	// console.log(isPressed);
}
window.onkeyup = function (event) {
	if (event.which == 32) isPressed = false;
	// console.log(isPressed);
}

function startConverting() {

	if ('webkitSpeechRecognition' in window) {
		var speechRecognizer = new webkitSpeechRecognition();
		speechRecognizer.continuous = true;
		speechRecognizer.interimResults = true;
		speechRecognizer.lang = 'en-US';
		speechRecognizer.start();

		var finalTranscripts = '';

		speechRecognizer.onresult = function (event) {
			// console.log(isPressed);
			if (isPressed) {
				var interimTranscripts = '';
				for (var i = event.resultIndex; i < event.results.length; i++) {
					var transcript = event.results[i][0].transcript;
					transcript.replace("\n", "<br>");
					transcript = transcript.toLowerCase();
					if (event.results[i].isFinal) {
						finalTranscripts += transcript;
					} else {
						interimTranscripts += transcript;
						const values = wordSplit(interimTranscripts);

						// console.log(values.includes("hello"));
						console.log(values.some(i =>  lowerA.includes(i)));

						
						// const multipleExist = values.every(value => {
							
						// 	return lowerA.includes(value);
						// });
					
					}
				}
				result.innerHTML = finalTranscripts + '<span style="color: #999">' + interimTranscripts + '</span>';
			}

		};
		speechRecognizer.onerror = function (event) {

		};
	} else {
		result.innerHTML = 'Your browser is not supported. Please download Google chrome or Update your Google chrome!!';
	}
}
function wordSplit(string) {
	return string.split(" ");
}
function checkZone(array, word) {
	const centerIdx = array.indexOf(word);
	const result = [array[centerIdx], array[centerIdx + 1], array[centerIdx + 2]];
	return result;
	// input.forEach(element => {
	// 	word
	// });
	// return normalised
}