import { createInterface } from "readline";
import * as Items from "./Item.js";
import * as Player from "./Player.js";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export let quit = () => {
  console.log("Nice try n00b, but you will never beat big tech!");
  readline.close();
}

export function startGame() {


  const steps = {
    start: {
      message: "Welcome to Coder vs. Command Line! \n" + "Are you a 31337 H4X0R? yes/no",
      yes: "playerTurn",
      no: quit,
    },

    end: {
      message: "Do you still think you're leet? yes/no",
      yes: "start",
      no: quit,
    },

    playerTurn: {
      message: "H4X0R's turn \n" + "Would you like to hack, debug or restart? hack/debug/restart",
      attack: "monsterTurn",
      defend: "monsterTurn",
      flee: "monsterTurn",
    },

    monsterTurn: {
      message: "Command line's turn! Press any key",
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
  function stats(){
    console.log("H4X0R stats:");
    console.log("CLI stats:");
  } 

  function startAction(){
    console.log("Time to hax! Your turn!");
  }

  //Players action
  function attackDefendOrFlee(input){
    if(input === "hack"){
      console.log("You have haxxed!");
      //Do attack and change stats
    } else if(input === "debug"){
      console.log("You have debugged!");
      //Defend and change stats
    } else if (input === "restart"){
      console.log("You have restarted! Pathetic.");
      //Flee and shange stats
    } else {
      //Repeat question
    }
  }
  
  //Monsters action
  function monsterAction(){
    //Random action of monster
    console.log("Command line has acted!");
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

    stats();
    logStep();
  }

  let currentStep = "start";
  console.clear();
  logStep();
}
  
