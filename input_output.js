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
      message: "Would you like to attack, defend or flee? attack/defend/flee",
      attack: "monsterTurn",
      defend: "monsterTurn",
      flee: "monsterTurn",
    },

    monsterTurn: {
      message: "Monster's turn! \n",
      yes: "playerTurn",
      no: "playerTurn",
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

  //Replace with stats display
  function playerStats(){
    console.log("Player stats:");
  } 
  function monsterStats(){
    console.log("Monster stats:");
  } 

  function startAction(){
    console.log("Let's play! You're turn!");
    logicStep();
  }

  //Players action
  function attackDefendOrFlee(input){
    if(input == "attack"){
      console.log("You have attacked!");
      //Do attack and change stats
      step = steps[currentStep].attack;
    } else if(input == "defend"){
      console.log("You have defended!");
      //Defend and change stats
      step = steps[currentStep].defend;
    } else if (input == "flee"){
      console.log("You have fled!");
      //Flee and shange stats
      step = steps[currentStep].flee;
    } else {
      //Repeat question
    }
  }
  
  //Monsters action
  function monsterAction(){
    //Random action of monster
    console.log("Monster action");
  }

  //What action is done depending on the step
  function logicStep() {
    //
    const step = steps[currentStep];

    if ( currentStep === "start" ) {
      readline.question(`${step.message || ""} `, (input) => { startAction(input); });
      playerStats();
      monsterStats();
      currentStep = "playerTurn";

    } else if (currentStep === "playerTurn"){
      readline.question(`${step.message || ""} `, (input) => { attackDefendOrFlee(input); });
      
      //End if monster killed
      if(true){
        currentStep = "monsterTurn";
      }
      else{
        currentStep = "end";
      }

    } else if ( currentStep === "monsterTurn"){
      readline.question(`${step.message || ""} `, () => { monsterAction(); });
      
      //End if player killed
      if(true){
        currentStep = "playerTurn";
      }
      else{
        currentStep = "end";
      }

    } else {
      console.log("Try again");
      currentStep = "start";
    }

    
  }



  //New old

  let currentStep = "start";
  console.log("\n");
  playerStats();
  monsterStats();
  logicStep();
  

  //Old code

  

  // function logStep() {
  //   const step = steps[currentStep];

  //   if (step) {
  //     readline.question(`${step.message || ""} `, (input) => { handleAnswer(input); });
  //   }
  // }

  // function handleAnswer(answer) {
  //   let step;

  //   if (answer === "yes") {
  //     step = steps[currentStep].yes;
  //   } else if (isNumber(answer)) {
  //     console.log(`${answer} is all I need. <3`);
  //   } else {
  //     step = steps[currentStep].no;
  //   }

  //   if (typeof step === "function") {
  //     step();
  //     return;
  //   }

  //   if (typeof step === "string") {
  //     currentStep = step;
  //   } else {
  //     currentStep = "end";
  //   }
  //   logStep();
  // }

  // function isNumber(num) {
  //   const value = parseInt(num);
  //   return !isNaN(value);
  // }

  console.clear();
  logicStep();
}

// startGame();