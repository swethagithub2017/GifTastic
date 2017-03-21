// While it may not seem imperative for smaller programs, you should get in the habit
// linking to a separate js file and also wrapping your js code in either a 

// $(document).ready(function(){
//  // code goes here
// })

// or an IIFE (immediately invoked function expression)
// ;(function(){
//  // code goes here
// })()

// One of the most important reasons for that is security - because right now your global variables
// can be tampered with through the console by a malicious visitor 😮

var animalList = ["Rabbit", "dog", "dolphin", "parrot", "panda", "fish", "mouse","penguin", "seal"];


function getGify(){
	
	$("#viewGifs").empty();

	var cuteanimals = $(this).attr("data-name");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ cuteanimals +"&api_key=dc6zaTOxFJmzC&limit=10";   

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){

		// this line instantiates another div with an id of viewGifs, but you only need the one that's currently
		// in the html, so you can remove this one.
		// var gifydiv = $("<div id = 'viewGifs'>");

		// you want to keep variables scoped within the smallest possible context to avoid bugs caused by variable collisisons.
		// And if you don't declare variables with `var` then they will be placed on the global context which makes variable
		// collisions that muchb more likely.
		var gifyAnimalArray = response.data;

		// `response.data` is an array and `.rating` of that array will be undefined, so you really want to set this variable on line 46
		// var gifyAnimalRating = response.data.rating;

		for(var i = 0; i < gifyAnimalArray.length; i++){

			var gifyShowMove = gifyAnimalArray[i].images.original.url;
			var gifyShowStill = gifyAnimalArray[i].images.original_still.url;
			var gifyAnimalRating = gifyAnimalArray[i].rating;

			$("#viewGifs").append("<div class='left'><p>Rated: "+gifyAnimalRating+"</p><p><img class='moveImg' id='"+gifyShowMove+"' src="+gifyShowStill+"></p><div>");
		};

		// it's best practice to remove console.logs from your final code 🙃
		// console.log(response);

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

	// great variable name 👌
	var cuteAnimals = $("#animal-input").val().trim();

	
	animalList.push(cuteAnimals);

	
	renderButtons();

	// console.log(list);

	// Good job resetting the state of the input 🙌
	$("#animal-input").val("");

});




$("#viewGifs").on("click", ".moveImg", function(){

	var gifyMoveImgUrl = $(this).attr("id");
	var gifyStillImgUrl = $(this).attr("src");

	$(this).attr("id", gifyStillImgUrl);
	$(this).attr("src", gifyMoveImgUrl);
	// You need to make sure these class names match the selector in the other listener so that you can stop the gif
	$(this).attr("class", "makeGifyStill");

});

$("#viewGifs").on("click", ".makeGifyStill", function(){

	var gifyMoveImgUrl = $(this).attr("src");
	var gifyStillImgUrl = $(this).attr("id");

	$(this).attr("id", gifyMoveImgUrl);
	$(this).attr("src", gifyStillImgUrl);
	$(this).attr("class", "moveImg");

});

// I really like this style of passing in a function name to the click handler instead of an
// anonymous function that you define inline. I would suggest sticking to one style though
// (preferably this one 🙃)
$("#viewButtons").on("click", ".animal", getGify);


renderButtons();
// console.log(animalList);

