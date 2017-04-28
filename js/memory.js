var images = [
  "bear",
  "cat",
  "dbz",
  "hack",
  "iceland",
  "kix",
  "pines",
  "root",
  "tarantino",
  "thps",
  "tron",
  "neptune",
  "wargames",
  "will",
  "buffy",
  "bus",
  "bear",
  "cat",
  "dbz",
  "hack",
  "iceland",
  "kix",
  "pines",
  "root",
  "tarantino",
  "thps",
  "tron",
  "neptune",
  "wargames",
  "will",
  "buffy",
  "bus"
];

// Recupere la source de l'image et donc permetra de l'afficher
function getSource(nom) {
  var source = "../images/classic/" + nom + ".jpg";
  return source;
}

function getRandomPermutation(array) {
  // Declare un nouvel index random :
  var iRandom = i + Math.floor(Math.random() * (array.length - i));
  var tmp = array[i];
  array[i] = array[iRandom];
  array[iRandom] = tmp;
  return array;
}

function displayImages(array) {
  var imgElt = document.createElement("img");
  var cacheElt = document.createElement("div");
  imgElt.src = getSource(array[i]);
  cacheElt.appendChild(imgElt);
  // Met les 'caches' div dans l'array rCache pour pouvoir les parcourir et target leurs child (image)
  rCache.push(cacheElt);
  document.getElementById("board").appendChild(cacheElt);
}

var count = 0;
var moves = 0;
var guess1 = "";
var guess2 = "";
var rCache = [];

//var randomImages = images.slice();

for (var i = 0; i < images.length; i++) {
  getRandomPermutation(images);
  displayImages(images);
}

// Parcours l'array des 'caches'
rCache.forEach(function(cache) {
  // Par defaut les images sont cachées et possedent la classe 'faceDown'
  cache.childNodes[0].style.visibility = "hidden";
  cache.childNodes[0].setAttribute("class", "faceDown");

  // A chaque clic sur un element l'image s'affiche et gagne la classe 'faceUp' :
  cache.addEventListener("click", function(event) {
    event.target.childNodes[0].style.visibility = "visible";
    event.target.childNodes[0].setAttribute("class", "faceUp");
    // Compte le nombre de coups (2 max)
    count++;

    // 1st coup
    if (count === 1) {
      guess1 = event.target.childNodes[0];
      // 2nd coup decisif : determine l'etat gagnant (match) ou perdant (boucle sur les div + faceDown)
    } else if (count === 2) {
      guess2 = event.target.childNodes[0];
      // "Round" fini, reset compteur
      count = 0;
      // Comptage des coups (position a revoir?)
      moves++;

      // Si il y a un match, chaque image gagne une classe 'match'
      if (guess1.src === guess2.src) {
        guess1.style.visibility = "visible";
        guess1.setAttribute("class", "match");
        guess2.style.visibility = "visible";
        guess2.setAttribute("class", "match");
      } else {
        // Retourne toutes les cartes au bout de 1s par defaut sauf les images avec une classe 'match' (ne fait rien)
        setTimeout(function() {
          for (var i = 0; i < rCache.length; i++) {
            if (rCache[i].childNodes[0].classList.contains("match")) {
              null;
            } else {
              rCache[i].childNodes[0].style.visibility = "hidden";
              rCache[i].childNodes[0].setAttribute("class", "faceDown");
            }
          }
        }, 1000);
      }
    }
  });
});
