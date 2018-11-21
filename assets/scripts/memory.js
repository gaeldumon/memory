var randomPermutation = function (array) {
  let iRandom = i + Math.floor(Math.random() * (array.length - i));
  let tmp = array[i];
  array[i] = array[iRandom];
  array[iRandom] = tmp;
  return array;
}

var board = document.getElementById("board");
var divs = board.children;
var alphabet = "abcdefghijklmnopabcdefghijklmnop".split("");
var theme = "";
var matchCount = 0;
var moveCount = 0;
var matchCounter = document.getElementsByClassName("matchCounter")[0];
var moveCounter = document.getElementsByClassName("moveCounter")[0];
var guessCount = 0;
var guess1;
var guess2;
var cheatCount = false;

if (document.getElementById("disney-theme")) {
  theme = "disney";
} else {
  theme = "classic";
}

for (var i = 0; i < alphabet.length; i++) {
  divs[i].firstChild.setAttribute("src", "assets/images/" + theme + "/" + randomPermutation(alphabet)[i] + ".jpg");
  divs[i].firstChild.style.visibility = "hidden";

  divs[i].addEventListener("click", function (event) {
    event.target.firstChild.style.visibility = "visible";
    event.target.firstChild.setAttribute("class", "cardUp");
    guessCount += 1;

    if (guessCount === 1) {
      guess1 = event.target.firstChild;
    } else if (guessCount === 2) {
      guess2 = event.target.firstChild;
      guessCount = 0;
      moveCount += 1;
      moveCounter.textContent = "MOVES : " + moveCount;

      if (guess1.src === guess2.src) {
        guess1.setAttribute("class", "match");
        guess2.setAttribute("class", "match");
        matchCount += 1;
        matchCounter.textContent = "MATCH : " + matchCount;

        /*Creating a match message on the go when there's an actual match*/
        var matchMsg = document.createElement("p");
        matchMsg.setAttribute("class", "matchMsg");
        matchMsg.textContent = "IT'S A MATCH !";
        board.appendChild(matchMsg);

        //Match message disparears in 1.2s
        setInterval(function () {
          matchMsg.style.display = "none";
        }, 1200);

        /*Win state => 16 matchs -> end of the game*/
        if (matchCount === 16) {
          matchCounter.textContent = "Tu gagnes en " + moveCount + " coups !";
        }
        /*Lose state => guess 1 & 2 are no match (different cards aka different src) -> all cards w/o match class are switched off*/
      } else {
        setTimeout(function () {
          for (var j = 0; j <= alphabet.length; j++) {
            if (!divs[j].firstChild.classList.contains("match")) {
              divs[j].firstChild.style.visibility = "hidden";
              divs[j].firstChild.setAttribute("class", "cardDown");
            }
          }
        }, 900);
      }
    }
  }, false);
}