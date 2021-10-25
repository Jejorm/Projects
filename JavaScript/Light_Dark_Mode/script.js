const toggleSwitch = document.querySelector("input[type='checkbox']");

const imageNames = ["proud_coder", "feeling_proud", "conceptual_idea"]

const currentTheme = localStorage.getItem("theme")


const getElement = element => document.getElementById(element);


const setImages = (imageElement, imageName, theme) => {

	getElement(imageElement).src = `./img/undraw_${imageName}_${theme}.svg`
}


const toggleBackground = ({
	navBackground,
	textBoxBackground,
	toggleIconContent,
	toggleIconPrev,
	toggleIconPost
}) => {

	getElement("nav").style.backgroundColor = `rgb(${navBackground} / 50%)`;
	getElement("text-box").style.backgroundColor = `rgb(${textBoxBackground} / 50%)`;

	getElement("toggle-icon").children[0].textContent = `${toggleIconContent} Mode`;
	getElement("toggle-icon").children[1].classList.replace(toggleIconPrev, toggleIconPost)
}


const toggleDarkLightMode = theme => {

	if (theme === "dark") {

		toggleBackground({
			navBackground: "0 0 0",
			textBoxBackground: "255 255 255",
			toggleIconContent: "Dark",
			toggleIconPrev: "fa-sun",
			toggleIconPost: "fa-moon"
		})

	} else {

		toggleBackground({
			navBackground: "255 255 255",
			textBoxBackground: "0 0 0",
			toggleIconContent: "Light",
			toggleIconPrev: "fa-moon",
			toggleIconPost: "fa-sun"
		})
	}

	imageNames.map((imageName, i) => setImages(
		`image${i+1}`,
		imageName,
		theme
	))
}


const setConfiguration = (theme=null) => {

		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);

		toggleDarkLightMode(theme)
}


const switchTheme = e => {

		e.target.checked ? setConfiguration("dark") : setConfiguration("light");
}


if (currentTheme) {
		document.documentElement.setAttribute("data-theme", currentTheme);

		if (currentTheme === "dark") {
			toggleSwitch.checked = true;
			toggleDarkLightMode("dark")
	}
}

toggleSwitch.addEventListener("change", switchTheme);
