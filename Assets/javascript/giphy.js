$(window).on("load", function() {
  var topic = [
    "dog",
    "cat",
    "pig",
    "horse",
    "cow",
    "owl",
    "dolphin",
    "puffin",
    "raccoon",
    "goat"
  ];

  function createButtons() {
    for (var i = 0; i < topic.length; i++) {
      var animalButton = $("<button>");
      animalButton.addClass("animals");
      animalButton.attr("id", topic[i]);
      animalButton.text(topic[i]);
      $("#buttons").append(animalButton);
    }
  }
  createButtons();

  $("#search-button").on("click", function() {
    var input = $("#search")
      .val()
      .trim();
    topic.push(input);

    var addButton = $("<button>");
    addButton.addClass("animals");
    addButton.attr("id", input);
    addButton.text(input);
    $("#buttons").append(addButton);
  });

  $("button").on("click", function() {
    // console.log(topic);
    var query = $(this).attr("id");
    console.log(query);

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=xsEwLDdFvo1ZWxQUBj8EHhof0uGGysES&q=" +
      query +
      "&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          // Creating and storing a div tag
          var animalDiv = $("<div class='animal-giphy'>");
          // Creating a paragraph tag with the result item's rating
          var rating = $("<p id='rating'>").text(
            "Rating: " + results[i].rating
          );
          // Creating and storing an image tag
          var animalImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          animalImage.attr("src", results[i].images.fixed_height_still.url);
          animalImage.attr(
            "data-still",
            results[i].images.fixed_height_still.url
          );
          animalImage.attr("data-animate", results[i].images.fixed_height.url);
          animalImage.attr("data-state", "still");
          animalImage.attr("class", "gif");
          animalImage.attr("onclick", playGif());
          animalDiv.append(animalImage);
          animalDiv.append(rating);

          $("#giphy").append(animalDiv);
        }
      });
    $("#giphy").empty();
  });

  function playGif() {
    $(".gif").on("click", function(event) {
      event.preventDefault();
      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  }
});
