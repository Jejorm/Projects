// Get Quotes from API
"use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let allQuotes = []

const showLoadingSpinner = () => {

	loader.hidden = false;
	quoteContainer.hidden = true;
}

const removeLoadingSpinner = () => {

	loader.hidden = true;
	quoteContainer.hidden = false;
}

const newQuote = async () => {

	showLoadingSpinner();

	const randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];

	authorText.textContent = randomQuote.author ?? "Unknown";

	quoteText.textContent = randomQuote.text;

	if (randomQuote.text.length > 100) {
		quoteText.classList.add("long-quote")
	} else {
		quoteText.classList.remove("long-quote")
	}

	removeLoadingSpinner();
}

const getQuote = async () => {

	showLoadingSpinner();

	const APIURL = "https://type.fit/api/quotes"

	try {
		const response = await fetch(APIURL);
		allQuotes = await response.json();

		console.log(allQuotes.length);

		newQuote()

	} catch (error) {
		console.error(error);
	}
}

const tweetQuote = () => {
	const twitterUrl = `https://twitter.com/intent/tweet?text="${quoteText.textContent}" - ${authorText.textContent}`;
	window.open(twitterUrl, "_black");
}

getQuote();

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
