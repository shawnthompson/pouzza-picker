const spanBand = document.getElementById("randomBand");
const spanLocation = document.getElementById("location");
const buttonNext = document.getElementById("nextBand");

fetch("bands.json")
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		appendData(data);
	})
	.catch(function (err) {
		console.log("error: " + err);
	});

function getRandomArbitrary(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showMyBand(myBand) {
	spanBand.innerHTML = myBand.name;
	spanLocation.innerHTML = myBand.city;
}

function appendData(data) {
	var randomIndex = getRandomArbitrary(0, data.length - 1);
	showMyBand(data[randomIndex]);

	buttonNext.addEventListener("click", () => {
		var randomIndex = getRandomArbitrary(0, data.length - 1);
		showMyBand(data[randomIndex]);
	});

	console.log(myBand.name);
}
