let count = 5;
const APIKEY = "APIKEYFROMUNSPLASH";
let API = `https://api.unsplash.com/photos/random/?client_id=${APIKEY}&count=${count}}`;

const $imgContainer = document.getElementById("image-container");
const $loader = document.getElementById("loader");

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


const imageLoaded = () => {
	imagesLoaded++;

	if (imagesLoaded === totalImages) {
		ready = true;
		$loader.hidden = true;

		count = 30;
		API = `https://api.unsplash.com/photos/random/?client_id=${APIKEY}&count=${count}}`
	}
}

const setAttributes = (element, attributes) => {

	Object.entries(attributes).forEach(attribute => {
		element.setAttribute(attribute[0], attribute[1]);
		});
	}

const displayPhotos = () => {

	imagesLoaded = 0;
	totalImages = photosArray.length;

	photosArray.forEach(photo => {
		const $item = document.createElement("a");
		setAttributes($item, {
			href: photo.links.html,
			target: "_blank"
		});

		const $photo = document.createElement("img");

		setAttributes($photo, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description
		});
		$photo.addEventListener("load", imageLoaded);

		$item.appendChild($photo);
		$imgContainer.appendChild($item);
	});

}

const getPhotos = async () => {
	try {
		const response = await fetch(API);
		photosArray = await response.json();

		displayPhotos();

	} catch (e) {
		console.log(e)
	}
}

window.addEventListener("scroll", () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
});

getPhotos();
