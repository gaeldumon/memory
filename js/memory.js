var images = [
  "bear",
  "cat",
  "dbz",
  "hack",
  "iceland",
  "kix",
  "mtv",
  "pines",
  "root",
  "tarantino",
  "thps",
  "tron",
  "neptune",
  "wargames",
  "will",
  "bear",
  "cat",
  "dbz",
  "hack",
  "iceland",
  "kix",
  "mtv",
  "pines",
  "root",
  "tarantino",
  "thps",
  "tron",
  "neptune",
  "wargames",
  "will"
];

// Recupere la source de l'image et donc permet de l'afficher
function getSource(nom) {
  var source = "../images/classic/" + nom + ".jpg";
  return source;
}

// Copie l'array 'images'
var randomImages = images.slice();

var count = 0;
var tryOut = 0;
var guess1 = "";
var guess2 = "";
// Array qui contiendra les 'caches' img (= div)
var rCache = [];

// Permutation des images :
for (var i = 0; i < randomImages.length; i++) {
  // Declare un nouvel index random :
  var iRandom = i + Math.floor(Math.random() * (randomImages.length - i));
  var tmp = randomImages[i];
  randomImages[i] = randomImages[iRandom];
  randomImages[iRandom] = tmp;

  var imgElt = document.createElement("img");
  var cacheElt = document.createElement("div");
  imgElt.src = getSource(randomImages[i]);
  cacheElt.appendChild(imgElt);
  rCache.push(cacheElt);
  document.getElementById("board").appendChild(cacheElt);
}

// Parcours l'array des 'caches'
rCache.forEach(function(cache) {
  // De base les images sont cachées et possedent la classe 'faceDown'
  cache.childNodes[0].style.visibility = "hidden";
  cache.childNodes[0].setAttribute("class", "faceDown");

  // A chaque clic sur un element l'image s'affiche et gagne la classe 'faceUp'
  cache.addEventListener("click", function(event) {
    event.target.childNodes[0].style.visibility = "visible";
    event.target.childNodes[0].setAttribute("class", "faceUp");
    // Compte le nombre de coups (2 max)
    count++;

    // 1er coup
    if (count === 1) {
      guess1 = event.target.childNodes[0];
      // 2eme coup, tout ce se passe a ce niveau, il est decisif
    } else if (count === 2) {
      guess2 = event.target.childNodes[0];
      count = 0;
      tryOut++;

      // Si il y a un match, chaque image gagne une classe 'match'
      if (guess1.src === guess2.src) {
        guess1.style.visibility = "visible";
        guess1.setAttribute("class", "match");
        guess2.style.visibility = "visible";
        guess2.setAttribute("class", "match");
      } else {
        // Retourne toutes les cartes au bout de 2.5s par defaut SAUF les images avec une classe 'match'
        setTimeout(function() {
          for (var i = 0; i < rCache.length; i++) {
            if (rCache[i].childNodes[0].classList.contains("match")) {
              null;
            } else {
              rCache[i].childNodes[0].style.visibility = "hidden";
              rCache[i].childNodes[0].setAttribute("class", "faceDown");
            }
          }
          count = 0;
        }, 1000);
      }
    }
  });
});
