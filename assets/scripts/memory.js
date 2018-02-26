var board = document.getElementById("board");
var cd = board.children;
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"
];

for (var i = 0; i <= alphabet.length; i++) {
  cd[i].firstChild.setAttribute("src", "assets/images/classic/" + alphabet[i] + ".jpg");
}