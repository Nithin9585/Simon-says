let level = 0;
let gameseq = [];
let userseq = [];
let start = false;
let clickable = false;

const clr = ["yellow", "red", "green", "blue"];

let h4 = document.querySelector("h4");

document.addEventListener("keypress", function () {
  if (start === false) {
    start = true;
    levelup();
  }
});

function levelup() {
  level++;
  h4.innerText = `level ${level}`;
  let randNum = Math.floor(Math.random() * 4);
  let arrclr = clr[randNum];

  gameseq.push(arrclr);
  playSequence();
}

function playSequence() {
  let i = 0;
  clickable = false;
  let interval = setInterval(function () {
    btnFlash(document.getElementById(gameseq[i]));
    i++;
    if (i >= gameseq.length) {
      clearInterval(interval);
      clickable = true;
      userseq = [];
    }
  }, 1000);
}

function btnFlash(btn) {
  if (btn) {
    btn.classList.toggle("flash");
    setTimeout(function () {
      btn.classList.toggle("flash");
    }, 450);
  } else {
    console.error("Button is undefined in btnFlash!");
  }
}

function btnpress(event) {
  if (!clickable) return;
  
  let btn = event.target;
  let userColor = btn.getAttribute("id");
  userseq.push(userColor);

  if (userseq.length === gameseq.length && userseq.every((userItem, i) => userItem === gameseq[i])) {
    console.log("User sequence matches! Level up!");
    setTimeout(levelup, 1000);
  } else if (userseq[userseq.length - 1] !== gameseq[userseq.length - 1]) {
    console.error("Mismatch! Game over!");
    start = false;
    level = 0;
    gameseq = [];
    userseq = [];
    h4.innerText = "Game Over! Press any key to restart.";
  }
}

const allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
  btn.addEventListener("click", btnpress);
}
