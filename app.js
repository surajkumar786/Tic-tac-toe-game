// Access the buttons
let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newgame = document.querySelector("#newgame");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let startGameBtn = document.querySelector("#startGame");
let gameSection = document.querySelector("#gameSection");

// Access turn for player-x and player-o
let turn0 = true; // playerx and player0

// All the winning patterns will be saved in a 2D array
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Reset button and new game button function
const resetgame = () => {
    turn0 = true;
    enablebuttons();
    msgcontainer.classList.add("hide");
}

// This one is for click
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            box.style.color = "blue";
            turn0 = false;
        } else {
            box.innerText = "X";
            box.style.color = "red";
            turn0 = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

// Function to disable all the buttons after a player wins
const disablebuttons = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

// Function to enable all buttons if click reset or newgame
const enablebuttons = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

// This function is used to show the winner after the game finishes
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disablebuttons();
};

// This function is to check the winner if the array of pattern matches
const checkWinner = () => {
    let winnerfound = false;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                winnerfound = true;
                break;
            }
        }
    }

    if (!winnerfound) {
        // Check for a draw
        let isDraw = true;
        for (let box of boxes) {
            if (box.innerText === "") {
                isDraw = false;
                break;
            }
        }
        if (isDraw) {
            msg.innerText = "It's a Draw!";
            msgcontainer.classList.remove("hide");
            disablebuttons();
        }
    }
};

// Event listener for newgame and reset button
newgame.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);

// Event listener for the start game button
startGameBtn.addEventListener("click", () => {
    gameSection.classList.remove("hide");
    startGameBtn.parentElement.classList.add("hide");
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
});
