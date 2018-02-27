var board = document.getElementById("board");
var divs = board.children;
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"
];

if (!document.getElementById("disney-theme")) {
  for (var i = 0; i <= alphabet.length; i++) {
    divs[i].firstChild.setAttribute("src", "assets/images/classic/" + alphabet[i] + ".jpg");
  }
} else {
  for (var i = 0; i <= alphabet.length; i++) {
    divs[i].firstChild.setAttribute("src", "assets/images/disney/" + alphabet[i] + ".jpg");
  }
}