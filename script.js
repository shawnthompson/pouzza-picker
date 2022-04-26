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

function appendData(data) {
	var mainContainer = document.getElementById("myData");
	data.forEach((_datum, i) => {
		var li = document.createElement("li");
		li.innerHTML = data[i];
		mainContainer.appendChild(li);
	});
}
