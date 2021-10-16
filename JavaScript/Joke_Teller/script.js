const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

function toggleButton() {
	button.disabled = !button.disabled;
}

function tellMe(joke) {
	console.log(joke);
	
	// API from http://www.voicerss.org/
	VoiceRSS.speech({
		key: 'KEYAPI',
		src: joke,
		hl: 'en-us',
		v: 'Linda',
		r: 0, 
		c: 'mp3',
		f: '44khz_16bit_stereo',
		ssml: false
	});
}

async function getJokes() {
	const apiUrl = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,political,sexist,explicit"
	let joke = "";

	try {
		const response = await fetch(apiUrl);
		const data = await response.json();


		if (data.setup) {
			 joke = `${data.setup} ... ${data.delivery}`
		} else {
			joke = data.joke;
		}

		tellMe(joke)
		toggleButton();

	} catch (e) {
		console.log("Whoops", e);
	}
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton)
