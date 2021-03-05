import { createInterface } from "readline";
import * as Items from "./Item.js";
import * as Player from "./Player.js";
import chalk from "chalk";



const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export let quit = () => {
  console.log("Nice try n00b, but you will never beat big tech!");
  readline.close();
}

export function startGame() {
  //Create new instances of players
  let playerProg = new Player.Protagonist("Player");
  let playerOS = new Player.Monster("OS");

  playerProg.initFight(playerOS);


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
  function stats() {
    //Replace with playerProg.displayStats() and playerOS.displayStats()
    console.log(playerProg.parseMainStatsToString());
    console.log(playerOS.parseMainStatsToString());
  } 

  function startAction(){
    console.log("Time to hax! Your turn!");
  }

  //Players action
  function attackDefendOrFlee(input){
    if(input === "hack"){
      // console.log(playerProg.attackMessage);
      //console.log("You have haxxed!");
      playerProg.attack(playerOS);
      //Do attack and change stats
    } else if(input === "debug"){
      // console.log("You have debugged!");
      playerProg.defend();
      //Defend and change stats
    } else if (input === "restart"){
      // console.log("You have attempted to restart your computer! Pathetic.");
      playerProg.flee();
      //Flee and shange stats
    } else {
      //Repeat question
    }
  
  }
  
  //Monsters action
  function monsterAction(){
    //Random action of monster
    playerOS.pickRandomChoice( playerProg );
    
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
      case "start":
        if (answer === "yes"){
          currentStep = "playerTurn";
        } else {
          quit();
        }
        break;
        
      case "end":
        if (answer === "yes"){
          currentStep = "start";
          playerProg.health = 100;
          playerOS.health = 100;
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
    
    //Check monsters health >= 0
    if(playerOS.health <= 0 || playerProg.health <= 0){
      currentStep = "end";
    } else {
      stats();
    }
    logStep();
  }

  let currentStep = "start";
  console.clear();
  logStep();
}
