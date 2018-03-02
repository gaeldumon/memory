var board = document.getElementById("board");
var divs = board.children;
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"
];
var imgs = "";
var moves = 0;

if (document.getElementById("disney-theme")) imgs = "disney";
else imgs = "classic";

for (let i = 0; i <= alphabet.length; i++) {
  divs[i].firstChild.setAttribute("src", "assets/images/" + imgs + "/" + alphabet[i] + ".jpg");
  divs[i].firstChild.style.visibility = "hidden";

  divs[i].addEventListener("click", function (e) {
    e.target.firstChild.style.visibility = "visible";
    e.target.firstChild.setAttribute("class", "cardUp");
  })
}