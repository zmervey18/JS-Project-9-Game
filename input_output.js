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
      message: "Monster's turn! Press any key",
      yes: "playerTurn",
      no: "playerTurn",
    },
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
    console.log("Let's play! Your turn!");
  }

  //Players action
  function attackDefendOrFlee(input){
    if(input === "attack"){
      console.log("You have attacked!");
      //Do attack and change stats
    } else if(input === "defend"){
      console.log("You have defended!");
      //Defend and change stats
    } else if (input === "flee"){
      console.log("You have fled!");
      //Flee and shange stats
    } else {
      //Repeat question
    }
  }
  
  //Monsters action
  function monsterAction(){
    //Random action of monster
    console.log("Monster action!");
  }

  //What action is done depending on the step
  function logStep(){
    const step = steps[currentStep];

    if(step){
      readline.question( `${step.message || ""} `, (input) => { handleAnswer(input); });
    }
  }

  function handleAnswer(answer){
    let step;

    switch(currentStep){
      case "start" || "end":
        if (answer === "yes"){
          currentStep = "playerTurn";
        } else {
          quit();
        }
        break;

      case "playerTurn":
        attackDefendOrFlee(answer);
        currentStep = "monsterTurn";
        break;

      case "monsterTurn":
        monsterAction();
        currentStep = "playerTurn";
        break;

      default:
        console.log("default");
        quit();
    }

    // if (typeof step === "function") {
    //   step();
    //   return;
    // }

    // if (typeof step === "string") {
    //   currentStep = step;
    // } else {
    //   currentStep = "end";
    // }
    logStep();
  }




  // function logicStep() {
  //   //
  //   const step = steps[currentStep];

  //   if ( currentStep === "start" ) {
  //     readline.question(`${step.message || ""} `, (input) => { startAction(input); });
  //     currentStep = "playerTurn";

  //   } else if (currentStep === "playerTurn"){
  //     readline.question(`${step.message || ""} `, (input) => { attackDefendOrFlee(input); });
      
  //     //End if monster killed
  //     if(true){
  //       currentStep = "monsterTurn";
  //     }
  //     else{
  //       currentStep = "end";
  //     }

  //   } else if ( currentStep === "monsterTurn"){
  //     readline.question(`${step.message || ""} `, () => { monsterAction(); });
      
  //     //End if player killed
  //     if(true){
  //       currentStep = "playerTurn";
  //     }
  //     else{
  //       currentStep = "end";
  //     }

  //   } else {
  //     console.log("Try again");
  //     currentStep = "start";
  //   }

  // }



  //New old

  let currentStep = "start";
  console.clear();
  logStep();
}
  


// startGame();