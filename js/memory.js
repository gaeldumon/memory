function appendTheme(theme) {

  ajaxGet("http://localhost/projects/javascript-web-srv/data/images_" + theme + ".txt", function(reponse) {
    // Transform the ajax response in string array which contains pictures names
    let images = reponse.split(";");

    // Takes a picture's name and return its source directory
    function getSource(nom) {
      let source = "../images/" + theme + "/" + nom + ".jpg";
      return source;
    }

    // [Generic function] - Randomly permutate string elements of an array and return the shuffled array
    function getRandomPermutation(array) {
      let iRandom = i + Math.floor(Math.random() * (array.length - i));
      let tmp = array[i];
      array[i] = array[iRandom];
      array[iRandom] = tmp;
      return array;
    }

    function displayImages(array) {
      let imgElt = document.createElement("img");
      let cacheElt = document.createElement("div");
      imgElt.src = getSource(array[i]);
      cacheElt.appendChild(imgElt);
      rCaches.push(cacheElt);
      document.getElementById("board").appendChild(cacheElt);
    }

    let count = 0;
    let guess1 = "";
    let guess2 = "";
    let moves = 0;
    let gameEndCount = 0;
    // Will contain every div elements which childs are img elements
    let rCaches = [];
    let movesCount = document.getElementById("movesCount");

    // Go through the "images" array, shuffle it, and display it one by one
    for (var i = 0; i < images.length; i++) {
      getRandomPermutation(images);
      displayImages(images);
    }

    // Go through every div elements which hide the img elements
    rCaches.forEach(function(cache) {
      // By default, hides the img elements and marks them as so
      cache.childNodes[0].style.visibility = "hidden";
      cache.childNodes[0].setAttribute("class", "faceDown");

      // If one of the div elements is clicked, child img element is shown and marked as so
      cache.addEventListener("click", function(event) {
        event.target.childNodes[0].style.visibility = "visible";
        event.target.childNodes[0].setAttribute("class", "faceUp");
        count += 1;

        // On first click
        if (count === 1) {
          guess1 = event.target.childNodes[0];
          // On second click (determining action)
        } else if (count === 2) {
          guess2 = event.target.childNodes[0];
          count = 0;
          moves += 1;
          movesCount.textContent = "Moves : " + moves;

          // If each guess matches together (same source) then they're marked as match (WIN STATE)
          if (guess1.src === guess2.src) {
            guess1.style.visibility = "visible";
            guess1.setAttribute("class", "match");
            guess2.style.visibility = "visible";
            guess2.setAttribute("class", "match");
            gameEndCount += 1;
            // Indicates in how many moves the player complete the board once all img elements are matched
            if (gameEndCount === 16) {
              movesCount.textContent = "You made it in " + moves + " moves !";
            }
          } else {
            // After 1 second the img elements are hidden behind their div elements again EXCEPT if they're marked as matched
            setTimeout(function() {
              for (var i = 0; i < rCaches.length; i++) {
                if (!rCaches[i].childNodes[0].classList.contains("match")) {
                  rCaches[i].childNodes[0].style.visibility = "hidden";
                  rCaches[i].childNodes[0].setAttribute("class", "faceDown");
                }
              }
            }, 1000);
          }
        }
      });
    });
  });
}

function gameRefresh(theme) {
  let body = document.getElementsByTagName('body')[0];
  board.innerHTML = "";
  body.style.backgroundImage = 'url(../images/' + theme + 'Back.jpg)';
  body.style.backgroundSize = "cover";
  appendTheme(theme);
}

// Color changes on buttons to indicate where the player is (start screen, theme 1 ou theme 2)
function colorIndicator(boutonA, boutonB, boutonC) {
  boutonA.style.backgroundColor = "mediumPurple";
  boutonB.style.backgroundColor = "mediumspringgreen";
  boutonC.style.backgroundColor = "mediumspringgreen";
}

// DEFAULT ON LOAD - INITIAL STATE
function initialState() {
  let body = document.getElementsByTagName("body")[0];
  body.style.backgroundImage = "url(../images/nebula.jpg)";
  body.style.backgroundSize = "cover";
  body.style.backgroundImage = "url(../images/nebula.jpg)";
  body.style.backgroundSize = "cover";
  board.innerHTML = startScreenMsg;
  moves = 0;
  movesCount.textContent = "";
  colorIndicator(newGameButton, disneyButton, classicButton);
}

let newGameButton = document.getElementById("newGame");
let disneyButton = document.getElementById("disneyTheme");
let classicButton = document.getElementById("classicTheme");
let board = document.getElementById("board");
let startScreenMsg = "<p>Welcome dear player.<br/>To get started please choose a theme in the MENU.<br/>To restart a game, click on the theme button again.</p>";

// DEFAULT ON LOAD - INITIAL STATE CALL
initialState();

// MENU EVENTS
disneyButton.addEventListener("click", function(event) {
  gameRefresh("disney");
  moves = 0;
  movesCount.textContent = "Moves : " + moves;
  colorIndicator(event.target, classicButton, newGameButton);
});

classicButton.addEventListener("click", function(event) {
  gameRefresh("classic");
  moves = 0;
  movesCount.textContent = "Moves : " + moves;
  colorIndicator(event.target, disneyButton, newGameButton);
});

newGameButton.addEventListener("click", function(event) {
  initialState();
  colorIndicator(event.target, disneyButton, classicButton);
});
