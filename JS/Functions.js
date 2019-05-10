$(document).ready(function(){

  function DisplayButton(Arr){
    $(".ButtonDisplay").empty();

    for(var i = 0; i<Arr.length; i++){
      var button = $("<a>").addClass("btn btn-primary btn-lg MoodButton").attr("data", Arr[i]);
      button.text(Arr[i]).css('margin' , '.5rem');
      $(".ButtonDisplay").append(button);
    };
  };
  var MoodArr = ["smile", "happy", "hate", "Kim", "angry"];
  var local = localStorage.getItem("Moods");

  if(local !== null){
    DisplayButton(local.split(','));
  }
  else{
    localStorage.setItem("Moods", MoodArr);
    DisplayButton(MoodArr);
  };
  $(".CreateMood").on("click", function(){
  var input = $(".MoodInput").val();
  var LocalArr = localStorage.getItem("Moods").split(',');
      if(input !== ""){
          LocalArr.push(input);
          DisplayButton(LocalArr);
          localStorage.setItem("Moods", LocalArr);          
      };
  });

  $(".MoodButton").on("click", function() {

    $(".Display0").empty();
    $(".Display1").empty();
    $(".Display2").empty();

    ChangeQuote();

    var ApiKey = "TFi9rHvgaCJV26uk7uT6C6aM1JlSFryF";
    var mood = $(this).attr("data");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + ApiKey +"&q=kanye%20West%20" + mood +"&limit=25&offset=10&rating=G&lang=en";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      
    for(var i = 0; i<10; i++){

        var activeUrl = response.data[i].images.fixed_width.url;
        var stillUrl = response.data[i].images.fixed_width_still.url;

        var Display = $("<img>").addClass("mx-auto GifDisplay");
        var card = $("<p>").addClass("text-center");
        var link = $("<a>").attr("href", activeUrl);
        var Download = $("<button>").attr("dataURL", activeUrl).addClass("btn btn-primary col-8 Download").text("Download");

        link.append(Download);
        Display.attr("src", stillUrl).attr("state", "still");
        Display.attr("alt", "kanye gif").attr("still", stillUrl).attr("active", activeUrl);
        card.append(Display, link);

        if(i < 3){
        $(".Display0").prepend(card);
        }
        else if(i<6 && i >=3){
        $(".Display1").prepend(card);
        }
        else if(i <= 8 && i >=6){
        $(".Display2").prepend(card);
        };

      };

    });
  });

  $(document.body).on("click", ".GifDisplay", function() {
    var state = $(this).attr("state");
    var Image = $(this);

    if(state === "still"){
      Image.attr("state", "active");
      Image.attr("src", Image.attr("active"));
    }
    else{
      Image.attr("state", "still");
      Image.attr("src", Image.attr("still"));
    };
  });

  // $(document.body).on("click", ".Download", function() {

  //   var downloadUrl = $(this).attr("dataURL");

  //   var downloading = chrome.browser.downloads.download({
  //     url : downloadUrl,
  //     filename : 'Kanyefy.gif',
  //     conflictAction : 'uniquify'
  //   });
  //   downloading.then();

  // });

  function ChangeQuote(){
    

    $.ajax({
      url: "https://api.kanye.rest/",
      method: "GET"
    }).then(function(response) {

      $(".Quote").text("'"+response.quote+ "'")

    });
  };

});



