import { createInterface } from "readline";
const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export let quit = () => {
  console.log("Bye then!");
  readline.close();
}

export function startGame() {
  const steps = {
    start: {
      message: "Welcome to the imaginatively titled Project 9 game! \n" + "Do you want to play a game? yes/no",
      yes: "playerTurn",
      no: quit,
    },
    end: {
      message: "Do you want to play again? yes/no",
      yes: "start",
      no: quit,
    },
    playerTurn: {
      message: "Would you like to attack, defend or flee? yes/no",
      yes: "monsterTurn",
      no: "playerDefend",
    },
    playerDefend: {
      message: "Would you like to defend? yes/no",
      yes: "monsterTurn",
      no: "playerFlee",
    },
    playerFlee: {
      message: "Would you like to flee? yes/no",
      yes: "monsterTurn",
      no: "monsterTurn",
    },

    monsterTurn: {
      message: "Monster's turn! \n" + "You're dead!",
      yes: quit,
      no: quit,
    },

    //Old stuff
    firstStep: {
      message: "Do you love me? yes/no",
      yes: "lovely",
      no: () => {
        console.log("Bye then!");
        readline.close();
      },
    },
    lovely: {
      message: "Great, how much? 1-10",
      no: () => {
        console.log("Bye then!");
        readline.close();
      },
    },
    // put more steps here
  };

  /*
  Outline of game:
  - Intro message
  - Print current player stats: health, etc
  - Print current monster stats: health, etc
  - Player chooses attack, defend or flee:
  - Print updated player/monster stats
      -If player health < 0,  quit
  - Print monster attack, ....
  - Print updated stats
      -If player health < 0, quit
  -Return to player chooses attack  
  */




  //Old code

  let currentStep = "start";

  function logStep() {
    const step = steps[currentStep];

    if (step) {
      readline.question(`${step.message || ""} `, (input) => {
        handleAnswer(input);
      });
    }
  }

  function handleAnswer(answer) {
    let step;

    if (answer === "yes") {
      step = steps[currentStep].yes;
    } else if (isNumber(answer)) {
      console.log(`${answer} is all I need. <3`);
    } else {
      step = steps[currentStep].no;
    }

    if (typeof step === "function") {
      step();
      return;
    }

    if (typeof step === "string") {
      currentStep = step;
    } else {
      currentStep = "end";
    }
    logStep();
  }

  function isNumber(num) {
    const value = parseInt(num);
    return !isNaN(value);
  }

  console.clear();
  logStep();
}

startGame();