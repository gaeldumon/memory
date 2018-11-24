/*Shuffles indexes of an array given as a parameter, returns this array shuffled*/
function shuffleArray(array) {
  for (let i = 0; i < array.length; i++) {
    let iRandom = i + Math.floor(Math.random() * (array.length - i));
    let tmp = array[i];
    array[i] = array[iRandom];
    array[iRandom] = tmp;
  }
  return array;
}

/*Creates text, links it to a class name in the html or css files, appends it to a parent element & makes it disapear in x sec*/
function createFurtiveMessage(cssClass, text, parent, time) {
  var message = document.createElement("p");
  message.setAttribute("class", cssClass);
  message.textContent = text;
  parent.appendChild(message);
  setInterval(function () {
    message.style.display = "none";
  }, time);
}

function hideElements(array, elementList, classToOverride, newClass, delay) {
  setTimeout(function () {
    for (let i = 0; i <= array.length; i++) {
      if (!elementList[i].firstChild.classList.contains(classToOverride)) {
        elementList[i].firstChild.style.visibility = "hidden";
        elementList[i].firstChild.setAttribute("class", newClass);
      }
    }
  }, delay);
}

/*html elements*/
var board = document.getElementById("board");
var body = document.getElementsByTagName("body")[0];
var text_matches = document.getElementsByClassName("matches")[0];
var text_moves = document.getElementsByClassName("moves")[0];
var text_highScore = document.getElementsByClassName("highScore")[0];
var cards_down = board.children;

var cards_names = "abcdefghijklmnopabcdefghijklmnop".split("");
var theme;
var guess1;
var guess2;
var count_matches = 0;
var count_moves = 0;
var count_guesses = 0;

localStorage.setItem('s', count_moves);
text_highScore.textContent = localStorage.getItem('s');

if (document.getElementById("disney-theme")) {
  theme = "disney";
} else {
  theme = "classic";
}

shuffleArray(cards_names);

for (var i = 0; i < cards_names.length; i++) {
  cards_down[i].firstChild.setAttribute("src", "assets/images/" + theme + "/" + cards_names[i] + ".jpg");
  cards_down[i].firstChild.style.visibility = "hidden";

  cards_down[i].addEventListener("click", function (event) {
    event.target.firstChild.style.visibility = "visible";
    event.target.firstChild.setAttribute("class", "cardUp");
    count_guesses += 1;

    if (count_guesses === 1) {
      guess1 = event.target.firstChild;
    } else if (count_guesses === 2) {
      guess2 = event.target.firstChild;
      count_guesses = 0;
      count_moves += 1;
      text_moves.textContent = "MOVES : " + count_moves;

      if (guess1.src === guess2.src) {
        guess1.setAttribute("class", "match");
        guess2.setAttribute("class", "match");
        count_matches = 16;
        text_matches.textContent = "MATCH : " + count_matches;

        createFurtiveMessage("matchMsg", "IT'S A MATCH", board, 1200);

        /*Win state => 16 matchs -> end of the game*/
        if (count_matches === 16) {
          localStorage.setItem('s', count_moves);
          text_highScore.textContent = localStorage.getItem('s');
        }
        /*Lose state => guess 1 & 2 are no match (different cards different src) -> all cards w/o match class are switched off*/
      } else {
        hideElements(cards_names, cards_down, "match", "cardDown", 900);
      }
    }
  }, false);
}