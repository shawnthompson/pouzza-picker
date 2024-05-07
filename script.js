const spanBand = document.getElementById("randomBand");
const spanLocation = document.getElementById("location");
const buttonNext = document.getElementById("nextBand");
const ulLinks = document.getElementById("links");
console.log(ulLinks);

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

	ulLinks.innerHTML = `
        ${myBand.websiteURL ? `<li><a href="${myBand.websiteURL}"><i class="fas fa-globe" aria-hidden="true"></i></a></li>` : ''}
        ${myBand.facebookURL ? `<li><a href="${myBand.facebookURL}"><i class="fab fa-facebook" aria-hidden="true"></i></a></li>` : ''}
        ${myBand.instagramURL ? `<li><a href="${myBand.instagramURL}"><i class="fab fa-instagram" aria-hidden="true"></i></a></li>` : ''}
        ${myBand.bandcampURL ? `<li><a href="${myBand.bandcampURL}"><i class="fab fa-bandcamp" aria-hidden="true"></i></a></li>` : ''}
    `;
}

function appendData(data) {
	const ulBands = document.getElementById('bandList');
	if (ulBands) {
		ulBands.innerHTML = data.map(band => `<li>${band.name}</li>`).join('');
	}
	
    var randomIndex = getRandomArbitrary(0, data.length - 1);
    showMyBand(data[randomIndex]);

    buttonNext.addEventListener("click", () => {
        var randomIndex = getRandomArbitrary(0, data.length - 1);
        showMyBand(data[randomIndex]);
    });
}