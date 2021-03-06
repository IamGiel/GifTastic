$(document).ready(function() {
  var arrayAnimals = [
    "happy",
    "dazzled",
    "puzzled",
    "surprised",
    "downcast",
    "excited",
    "embarassed",
    "meh"
  ];

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
      a.attr("id", "anotherButton");
      // Providing the initial button text
      a.text(arrayAnimals[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
      $("#images-view").html(""); //aha! this removed the previous data calls that were displayed!
    }
  }

  renderButtons();

  var newAnimalGIFS = function() {
    // when button is clicked, make queries
    $("button").on("click", function() {
      var animal = $(this).attr("data-animal");
      //creating url variable
      queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" +
        animal +
        "&api_key=lNOxXhcQPW9zthoUTkM6MpXFvvlOFwzv&limit=10";

      console.log(queryURL);

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        renderButtons();
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          // // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r") {
            var animalDiv = $("<div class='animal'>");
            var images = $("<img>");
            images.attr("src", results[i].images.original_still.url);
            images.attr("data-animate", results[i].images.original.url);
            images.attr("data-still", results[i].images.original_still.url);
            images.attr("data-state", "still");
            images.addClass("gif");

            animalDiv.append(images);
            $("#images-view").prepend(images);

            $(images).on("click", function() {
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
              if (images === "undefine") {
                alert("undefined");
                $("#images-view").html(""); //aha! this removed the previous data calls that were displayed!
              }
            });
          }
        } //loop
      });
    });
  };

  // This function handles events where a movie button is clicked
  $("#goButton").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    $("#buttons-view").empty();

    var animal = $("#newAnimals")
      .val()
      .trim();

    // Adding movie from the textbox to our array
    arrayAnimals.push(animal);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
    //if user did not type anything and clicked search, prevent adding button
    if (animal === "") {
      alert("Enter something in the field.");
      arrayAnimals.splice(-1)[0];
      //prevent adding displaying data for 'undefined'
    }
    if (animal === undefined) {
      alert("undefined");
      $("#images-view").html(""); //aha! this removed the previous data calls that were displayed!
    }
  });

  // Adding a click event listener to all elements with a class of "btn"
  $(document).on("click", "button", newAnimalGIFS);
  $("#newAnimals").html("");
  $body = $("body");

  $(document).on({
    ajaxStart: function() {
      $body.addClass("loading");
    },
    ajaxStop: function() {
      $body.removeClass("loading");
    }
  });
});
