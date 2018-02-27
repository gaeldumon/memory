var board = document.getElementById("board");
var divs = board.children;
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"
];
var imgs = "";

if (document.getElementById("disney-theme")) {
  imgs = "disney";
} else {
  imgs = "classic";
}

for (let i = 0; i <= alphabet.length; i++)
  divs[i].firstChild.setAttribute("src", "assets/images/" + imgs + "/" + alphabet[i] + ".jpg");