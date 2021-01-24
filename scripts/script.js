// + $("#userInput").val() + "&begin_date=20120101&end_date=20121231&api-key=n8ZpZeGBjpYFymrs0Lcvt46sbEJDkNuY"
//check for Navigation Timing API support

//  ------------------------------ Local Storage -------------------------------===================================
const inpValue = document.getElementById('userInput')
const btnInsert = document.getElementById('btn')
const lsArray = []
const lsOutput = document.getElementById('lsOutput');
const lastItemInLocalStorage = JSON.parse(window.localStorage.getItem("lsArray"))

console.log(lastItemInLocalStorage[lastItemInLocalStorage.length - 1]);

btnInsert.onclick = function () {

    const value = inpValue.value;

    lsArray.push(value);

    if (value) {
        localStorage.setItem("lsArray", JSON.stringify(lsArray));

        // location.reload()

    }
}

for (let index = 0; index < localStorage.length; index++) {

    // const element = array[index];

    const key = localStorage.key(index);

    const value = localStorage.getItem(key);

    lsOutput.innerHTML += `${key}: ${value}<br>`;

}

//  ------------------------------ Global Variables -------------------------------===================================
let searchHistory = [];
//(localStorage.getItem("searchHistory"));
// if (searchHistory === null){
//     searchHistory = [];
// }

let foundArray = [];
let majorStreamServices = ["Amazon", "Netflix", "Hulu"];







function findNetflix(api, input) {
    let netflixLinkEl = $('#netflix-text');
    for (let index = 0; index < api.length; index++) {
        let streamLink = "";
        if (api[index].Watch === "Netflix") {
            streamLink = api[index].WatchUrl
            netflixLinkEl.attr("href", streamLink)
            netflixLinkEl.text('You can find ' + input + ', here on Netflix');
            netflixLinkEl.removeAttr("linkBroke");
            netflixLinkEl.attr("class", "linkWorks");
            break;
        } else {
            streamLink = "";
            netflixLinkEl.attr("href", streamLink)
            netflixLinkEl.text("Not available on Netflix");
            netflixLinkEl.removeAttr("linkWorks");
            netflixLinkEl.attr("class", "linkBroke");
        }
    }
}
function findHulu(api, input) {
    let huluLinkEl = $('#hulu-text');
    for (let index = 0; index < api.length; index++) {
        let streamLink = "";
        if (api[index].Watch === "Hulu") {
            streamLink = api[index].WatchUrl
            huluLinkEl.attr("href", streamLink)
            huluLinkEl.text('You can find ' + input + ', here on Hulu');
            huluLinkEl.removeAttr("linkBroke");
            huluLinkEl.attr("class", "linkWorks");
            break;
        } else {
            streamLink = "";
            huluLinkEl.attr("href", streamLink)
            huluLinkEl.text("Not available on Hulu");
            huluLinkEl.removeAttr("linkWorks");
            huluLinkEl.attr("class", "linkBroke");
        }
    }
}
function findAmazon(api, input) {
    let amazonLinkEl = $('#amazon-text');
    for (let index = 0; index < api.length; index++) {
        let streamLink = "";
        if (api[index].Watch === "Amazon") {
            streamLink = api[index].WatchUrl
            amazonLinkEl.attr("href", streamLink)
            amazonLinkEl.text('You can find ' + input + ', here on Amazon');
            amazonLinkEl.removeAttr("linkBroke");
            amazonLinkEl.attr("class", "linkWorks");
            break;
        } else {
            streamLink = "";
            amazonLinkEl.attr("href", streamLink)
            amazonLinkEl.text("Not available on Amazon");
            amazonLinkEl.removeAttr("linkWorks");
            amazonLinkEl.attr("class", "linkBroke");
        }
    }
}

// previous search history function //
function previousSearch(searchHistory) {
    let ul = document.getElementById("search-history");
    $('#search-history').empty();
    for (let index = 0; index < searchHistory.length; index++) {
        let li = document.createElement("li");
        let t = document.createTextNode(searchHistory[index]);
        li.appendChild(t);
        ul.appendChild(li);
        li.classList.add("search-history-list");
    }
}


function getMyMovie(input) {
    // event.preventDefault();

    var queryURL = "https://watch-here.p.rapidapi.com/wheretowatch?title=" + input + "&mediaType=tv%20show";

    // ------------------------------------ Setting up local storage -------------------------------------------------
    if (searchHistory.includes(input)) {
    }
    else {
        searchHistory.push(input);
    }

    window.localStorage.setItem('searchHistory', searchHistory);

    // ---------------------------------------- Where to watch API --------------------------------------------------

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": queryURL,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-rapidapi-key": "69d811a2bemsh7406c1b512a31f1p10322djsn64aee285beed",
            "x-rapidapi-host": "watch-here.p.rapidapi.com"
        },
        "processData": false,
        "data": "{\n    \"mediaType\": \"tv show\",\n    \"title\": \"" + input + "\"\n}"
    };
    // ------------------------------------------------------------- First Ajax Call ------------------------------------------------
    $.ajax(settings).done(function (response) {

        let parsedResponse = JSON.parse(response)

        // Which Streaming Service Available

        findNetflix(parsedResponse, input);
        findHulu(parsedResponse, input);
        findAmazon(parsedResponse, input);
        console.log(parsedResponse);
        let newArray = [];
        for (let index = 0; index < parsedResponse.length; index++) {
            newArray.push(parsedResponse[index].Watch)
        }
        console.log(newArray);
        if (newArray.includes("Amazon") || newArray.includes("Netflix") || newArray.includes("Hulu")) {
            // console.log(response["search-results"]);
            // alert("Its on!!!!!")
            console.log(parsedResponse[0].Watch);
            // console.log(parsedResponse[0]["Watch"]);

        } else {
            // Get the modal
            const modal = document.getElementById('myModal')
            // Get the button that opens the modal
            const btn = document.getElementById('myBtn')
            // Get the <span> element that closes the modal
            const span = document.getElementsByClassName('close')[0]
            modal.style.display = 'block'
            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                modal.style.display = 'none'
            }
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target === modal) {
                    modal.style.display = 'none'
                }
            }
            // alert("That aint no movie")
            // console.log(response);
            // console.log(parsedResponse[0]["Watch"]);
            console.log(parsedResponse[0].Watch);

        }
    })

    // ---------------------------------------- IMDB API --------------------------------------------------

    const settings2 = {
        "async": true,
        "crossDomain": true,
        "url": "https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-movies-by-title&title=" + input,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "69d811a2bemsh7406c1b512a31f1p10322djsn64aee285beed",
            "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com"
        }
    };
    $.ajax(settings2).done(function (response2) {
        let imdbID = "";
        console.log(response2);
        let response2Results = response2.movie_results;
        for (let i = 0; i < response2Results.length; i++) {
            
            if ((response2Results[i].title).toLowerCase() == input.toLowerCase()) {
                imdbID = response2Results[i].imdb_id;
                console.log(imdbID);
            }
        }
        // Movie Picture API
        const settings3 = {
            "async": true,
            "crossDomain": true,
            "url": "https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-movies-images-by-imdb&imdb=" + imdbID,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "69d811a2bemsh7406c1b512a31f1p10322djsn64aee285beed",
                "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com"
            }
        };
        $.ajax(settings3).done(function (response3) {
            console.log(response3);
            let moviePoster = response3.poster;
            $(".thumbnail").attr("src", moviePoster);
            // title / description / rated / release_date / runtime
            const settings4 = {
                "async": true,
                "crossDomain": true,
                "url": "https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-movie-details&imdb=" + imdbID,
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "69d811a2bemsh7406c1b512a31f1p10322djsn64aee285beed",
                    "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com"
                }
            };
            $.ajax(settings4).done(function (response4) {
                console.log(response4);
                $('.title').text(response4.title);
                $('.rated').text("Rated: " + response4.rated);
                $('.release-date').text("Release Date: " + response4.release_date);
                $('.runtime').text("Runtime: " + response4.runtime + " minutes");
                $('.description').text(response4.description);
                //If we want to expand to recommended movies here are recommended titles.
                const settings5 = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-similar-movies&imdb=" + imdbID + "&page=1",
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "69d811a2bemsh7406c1b512a31f1p10322djsn64aee285beed",
                        "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com"
                    }
                };
                $.ajax(settings5).done(function (response5) {
                    console.log(response5);
                    let recommendedMovies = response5.movie_results
                    $('#recommended').empty();
                    for (let index = 0; index < recommendedMovies.length; index++) {

                        $('#recommended').append(`<li class="recommended-list hidden">${recommendedMovies[index].title}</li>`);
                    }

                    // -------------------- Search History --------------------- //
                    previousSearch(searchHistory);

                    // Displays Document
                    $(".hidden").removeClass("hidden")
                    $(".recommended-list").on("click", function (event) {
                        let recommendedInput = $(this).text();
                        console.log(recommendedInput);
                        getMyMovie(recommendedInput);
                    })
                    $(".search-history-list").on("click", function (event) {
                        let searchHistoryInput = $(this).text();
                        console.log(searchHistoryInput);
                        getMyMovie(searchHistoryInput);
                    })
                });
            });
        });
    });
}

$("#btn").on("click", function() {
    let userInput = $("#userInput").val();
    getMyMovie(userInput);
});

if (window.performance) {
    console.info("window.performance works fine on this browser");
  }
  console.info(performance);
  if (performance.type == performance.TYPE_RELOAD) {
    //   event.preventDefault()
    console.info( "This page is reloaded" );
    getMyMovie(lastItemInLocalStorage[lastItemInLocalStorage.length - 1])
  } else {
    console.info( "This page is not reloaded");
  }

 
  $( document ).ajaxError(function() {
    console.log("slkjfalkj")
  });
  

