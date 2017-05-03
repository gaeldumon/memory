function appendTheme(theme) {

  ajaxGet("http://localhost/projects/javascript-web-srv/data/images_" + theme + ".txt", function(reponse) {

    let images = reponse.split(";");

    function getSource(nom) {
      let source = "../images/" + theme + "/" + nom + ".jpg";
      return source;
    }

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
    let moves = 0;
    let guess1 = "";
    let guess2 = "";
    let rCaches = [];
    let endGame = 0;
    let movesCount = document.getElementById("movesCount");

    for (var i = 0; i < images.length; i++) {
      getRandomPermutation(images);
      displayImages(images);
    }

    rCaches.forEach(function(cache) {
      cache.childNodes[0].style.visibility = "hidden";
      cache.childNodes[0].setAttribute("class", "faceDown");

      cache.addEventListener("click", function(event) {
        event.target.childNodes[0].style.visibility = "visible";
        event.target.childNodes[0].setAttribute("class", "faceUp");
        count += 1;

        if (count === 1) {
          guess1 = event.target.childNodes[0];
        } else if (count === 2) {
          guess2 = event.target.childNodes[0];
          count = 0;
          moves += 1;
          movesCount.textContent = moves;

          if (guess1.src === guess2.src) {
            guess1.style.visibility = "visible";
            guess1.setAttribute("class", "match");
            guess2.style.visibility = "visible";
            guess2.setAttribute("class", "match");
          } else {
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
  board.innerHTML = "";
  let body = document.getElementsByTagName('body')[0];
  body.style.backgroundImage = 'url(../images/' + theme + 'Back.jpg)';
  appendTheme(theme);
}

let newGameButton = document.getElementById("newGame");
let disneyButton = document.getElementById("disneyTheme");
let classicButton = document.getElementById("classicTheme");
let board = document.getElementById("board");
let startScreenMsg = "<p>Welcome dear player.<br/>To get started please choose a theme on you left.</p>";

board.innerHTML = startScreenMsg;

disneyButton.addEventListener("click", function() {
  gameRefresh("disney");
  moves = 0;
  movesCount.textContent = moves;
});

classicButton.addEventListener("click", function() {
  gameRefresh("classic");
  moves = 0;
  movesCount.textContent = moves;
});

newGameButton.addEventListener("click", function() {
  board.innerHTML = startScreenMsg;
  moves = 0;
  movesCount.textContent = moves;
  let body = document.getElementsByTagName('body')[0];
  body.style.backgroundImage = 'url(../images/nebula.jpg)';
});
