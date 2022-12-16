var result = document.getElementById('result');
let isPressed = false;
console.log("inside");
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
			console.log(isPressed);
			if (isPressed) {
				var interimTranscripts = '';
				for (var i = event.resultIndex; i < event.results.length; i++) {
					var transcript = event.results[i][0].transcript;
					transcript.replace("\n", "<br>");
					if (event.results[i].isFinal) {
						finalTranscripts += transcript;
					} else {
						interimTranscripts += transcript;
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