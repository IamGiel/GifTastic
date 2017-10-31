$(document).ready(function() {
    
	var arrayAnimals = ["dog","lion","dolphine","falcon"];

	//dynamically create button onClick
	// Function for displaying movie data
     function renderButtons() {

        // Deleting the gifs prior to adding new gifs
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < arrayAnimals.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("btn btn-primary");
          // Adding a data-attribute and arrayAnimals[i]
          a.attr("data-animal", arrayAnimals[i]);
          // Providing the initial button text
          a.text(arrayAnimals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
		}
 	}

 	renderButtons();

    var newAnimalGIFS = function(){
	// when button is clicked, make queries
		$("button").on("click", function() {

			var animal = $(this).attr("data-animal");
					//creating url variable
			queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=lNOxXhcQPW9zthoUTkM6MpXFvvlOFwzv&limit=10";
			
			console.log(queryURL);

			$.ajax({
	          url: queryURL,
	          method: "GET"
	        }).done(function(response) {
	        	console.log(response);
	        	renderButtons();
	        	var results = response.data;
	  
		        for (var i = 0; i < results.length; i++) {
					// Only taking action if the photo has an appropriate rating
			        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

				        	//store data to image tag with attr
					  		
					    	var animalDiv = $("<div class='animal'>"); 
					    	//query rating
					    	var rating = results[i].rating;
					    	//create element p with a text 
					    	var pOne = $("<p>").text("Rating: " + rating);
					    	//attach rating to element p
					    	animalDiv.append(pOne);
					    	//create an img tag
					    	var images = $("<img>");

					    	images.attr("src", results[i].images.original_still.url);
					    	images.attr("data-animate", results[i].images.original.url);
					    	images.attr("data-still", results[i].images.original_still.url);
					    	images.attr("data-state", "still");
					    	images.addClass("gif");


					    	
					    	
					    	console.log(images);
					    	
					    	animalDiv.append(images);
					    	$("#images-view").prepend(images);
							
							$(images).on("click", function(){
								// alert("clicked");
								// // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
								 images = $(this).attr("data-state");
								// If the clicked image's state is still, update its src attribute to what its data-animate value is.
								// Then, set the image's data-state to animate
								// Else set src to the data-still value
								if (images === "still") {
									$(this).attr("src", $(this).attr("data-animate"));
									$(this).attr("data-state", "animate");
									} else {
									$(this).attr("src", $(this).attr("data-still"));
									$(this).attr("data-state", "still");
								}
							});
						}
					}
				});
			});					    	
		}  

		
	     		
	


	 // This function handles events where a movie button is clicked
	  	$("#newButtons").on("click", function(event) {
	        event.preventDefault();
	        // This line grabs the input from the textbox
	        $("#buttons-view").empty();
	       
	        var animal = $("#newAnimals").val().trim();

	        // Adding movie from the textbox to our array
	        arrayAnimals.push(animal);

	        // Calling renderButtons which handles the processing of our movie array
	        renderButtons();
      	});

			// Adding a click event listener to all elements with a class of "btn"
		$(document).on("click", ".btn", newAnimalGIFS);

		$body = $("body");

		$(document).on({
			ajaxStart: function() { $body.addClass("loading"); },
			ajaxStop: function() { $body.removeClass("loading"); }    
		});		

});	

















