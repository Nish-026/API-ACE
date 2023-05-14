function explore() {
  window.location.href = "explore.html";
}


const hamburger = document.querySelector(".hamburger");
const navmenu = document.querySelector(".container-fluid");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navmenu.classList.toggle("active");
});

function typingEffect() {
  const contactTexts = shuffleArray(["Build", "Debug", "Monitor", "Publish"]);
  const typedtext = document.getElementsByClassName("typedtext")[0];
  let removing = false;
  let idx = (char = 0);

  setInterval(() => {
    // We define the interval of the typing speed

    // If we do not reach the limit, we insert characters in the html
    if (char < contactTexts[idx].length)
      typedtext.innerHTML += contactTexts[idx][char];

    // 15*150ms = time before starting to remove characters
    if (char == contactTexts[idx].length + 15) removing = true;

    // Removing characters, the last one always
    if (removing)
      typedtext.innerHTML = typedtext.innerHTML.substring(
        0,
        typedtext.innerHTML.length - 1
      );

    char++; // Next character

    // When there is nothing else to remove
    if (typedtext.innerHTML.length === 0) {
      // If we get to the end of the texts we start over
      if (idx === contactTexts.length - 1) idx = 0;
      else idx++;

      char = 0; // Start the next text by the first character
      removing = false; // No more removing characters
    }
  }, 150); // Typing speed, 150 ms
}
typingEffect();
function shuffleArray(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let navbar = document.getElementById("Navbar");
let menu = document.getElementById("menu");
window.onscroll = function () {
  if (window.pageYOffset >= menu.offsetTop) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};

function border_none() {
  let button = document.getElementById("b");
  console.log("hi");
  button.style.borderColor = "color | transparent | inherit | initial";
}


// --------------------------- setting the name in navbar using google oauth / github oauth ------------------------------------------//


// Get the current URL
const currentUrl = window.location.href;

// Create a URL object from the current URL
const url = new URL(currentUrl);

// Get the search parameters from the URL
const searchParams = url.searchParams;

// Get specific query parameters
const token = searchParams.get('token');
const id = searchParams.get('userID');
const userName = searchParams.get("username");

localStorage.setItem("token",token);
localStorage.setItem("userID",id);
localStorage.setItem("username", userName);



