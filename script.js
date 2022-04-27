fetch('bands.json')
.then(function (response) {
	return response.json();
})
.then(function (data) {
	appendData(data);
})
.catch(function (err) {
	console.log('error: ' + err);
});

function getRandomArbitrary(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min +1)) + min;
}

function appendData(data) {
	var randomIndex = getRandomArbitrary(0, data.length - 1);
	var spanBand = document.getElementById("randomBand");
	spanBand.innerHTML = data[randomIndex];
	
	// document.getElementById('nextBand').onclick = function () {
	// 	spanBand.innerHTML = data[randomIndex];
	// };

	document.getElementById('nextBand').addEventListener('click', () => {
		spanBand.innerHTML = data[randomIndex + 1];
	  });

	console.log(data[randomIndex]);
}
