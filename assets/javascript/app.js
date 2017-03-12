var animalList = ["Rabbit", "dog", "dolphin", "parrot", "panda", "fish", "mouse","penguin", "seal"];


function getGify(){
	
	$("#viewGifs").empty();

	var cuteanimals = $(this).attr("data-name");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ cuteanimals +"&api_key=dc6zaTOxFJmzC&limit=10";   

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){

		var gifydiv = $("<div id = 'viewGifs'>");

		gifyAnimalArray = response.data;

		gifyAnimalRating = response.data.rating;

		for(var i = 0; i < gifyAnimalArray.length; i++){

			var gifyShowMove = gifyAnimalArray[i].images.original.url;
			var gifyShowStill = gifyAnimalArray[i].images.original_still.url;
			gifyAnimalRating = gifyAnimalArray[i].rating;

			$("#viewGifs").append("<div class='left'><p>Rated: "+gifyAnimalRating+"</p><p><img class='moveImg' id='"+gifyShowMove+"' src="+gifyShowStill+"></p><div>");
		};

		console.log(response);

		});

};


function renderButtons(){

	
	$("#viewButtons").empty();

	
	for (var i = 0; i < animalList.length; i++){

		
		var button = $("<button>");

		
		button.addClass("animal");

		
		button.attr("data-name", animalList[i]);

		
		button.text(animalList[i]);

		$("#viewButtons").append(button);

	};

};


$("#addAnimal").on("click", function(event){

	event.preventDefault();

	
	var cuteAnimals = $("#animal-input").val().trim();

	
	animalList.push(cuteAnimals);

	
	renderButtons();

	console.log(list);

	$("#animal-input").val("");

});




$("#viewGifs").on("click", ".moveImg", function(){

	var gifyMoveImgUrl = $(this).attr("id");
	var gifyStillImgUrl = $(this).attr("src");

	$(this).attr("id", gifyStillImgUrl);
	$(this).attr("src", gifyMoveImgUrl);
	$(this).attr("class", "gifyStillImg");

});

$("#viewGifs").on("click", ".makeGifyStill", function(){

	var gifyMoveImgUrl = $(this).attr("src");
	var gifyStillImgUrl = $(this).attr("id");

	$(this).attr("id", gifyMoveImgUrl);
	$(this).attr("src", gifyStillImgUrl);
	$(this).attr("class", "gifymoveImg");

});

$("#viewButtons").on("click", ".animal", getGify);


renderButtons();
console.log(animalList);

