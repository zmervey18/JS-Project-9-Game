import { createInterface } from "readline";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function quit(){
    console.log("Bye then!");
    readline.close();
}

export function startGame() {
  const steps = {
    start: {
      message: "Do you want to play a game? yes/no",
      yes: "firstStep",
      no: quit(),
    },
    end: {
      message: "Do you want to play again? yes/no",
      yes: "start",
      no: quit(),
      },
    },
    firstStep: {
      message: "Do you love me? yes/no",
      yes: "lovely",
      no: quit(),
    },
    lovely: {
      message: "Great, how much? 1-10",
      no: quit(),
    },
    // put more steps here
  };

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