import { createInterface } from 'readline';
import * as Item from './Item.js';
import * as Player from './Player.js';
import chalk from 'chalk';
import fs from 'fs';

const monsterData = JSON.parse(
	fs.readFileSync('modules/game_data/Monster.json', 'utf-8')
);

const readline = createInterface({
	input: process.stdin,
	output: process.stdout,
});

const randomProperty = function (obj) {
	//Credit: https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
	var keys = Object.keys(obj);
	return keys[(keys.length * Math.random()) << 0];
};

const quit = () => {
	readline.close();
};

let playerProg; //You
let playerOS; //Enemy

const setupNewPlayers = function () {
	//Create new instances of players
	const randRace = randomProperty(monsterData);
	const potentialMonsters = monsterData[randRace];
	const randMonster =
		potentialMonsters[Math.floor(Math.random() * potentialMonsters.length)];

	playerProg = new Player.Protagonist().__race('Player');
	playerOS = new Player.Monster('OS')
		.__race(randRace)
		.__name(randMonster.name)
		.__health(randMonster.health)
		.__attackRating(randMonster.attackRating)
		.__defenseRating(randMonster.defenseRating)
		.__attackMessage(randMonster.attackMessage)
		.__defendMessage(randMonster.defendMessage);

	playerProg.initFight(playerOS);
};

export function startGame() {
	setupNewPlayers();

	let steps = {
		start: {
			message:
				'Welcome to Coder vs. Command Line! \n' +
				'Are you a 31337 H4X0R? yes/no',
			yes: 'playerTurn',
			no: quit,
		},

		end: {
			message: "Do you still think you're leet? yes/no",
			yes: 'start',
			no: quit,
		},

		playerTurn: {
			message:
				'Would you like to hack, debug, use an item or restart? hack/debug/items/restart',
			attack: 'monsterTurn',
			defend: 'monsterTurn',
			flee: 'monsterTurn',
		},

		monsterTurn: {
			message: "Command line's turn! Press enter to continue",
			yes: 'playerTurn',
			no: 'playerTurn',
		},

		useItem: {
			message: 'Which item would you like to use?',
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
		console.log(chalk.blue.bold(playerProg.parseMainStatsToString()));
		console.log(chalk.yellow.bold(playerOS.parseMainStatsToString()));
	}

	function startAction() {
		console.log(chalk.green.bold('Time to hax! Your turn!'));
	}

	//Players action
	function attackDefendOrFlee(input) {
		if (input === 'hack') {
			playerProg.attack(playerOS);
			//Do attack and change stats
		} else if (input === 'debug') {
			playerProg.defend();
			//Defend and change stats
		} else if (input === 'restart') {
			playerProg.flee();
			//Flee and shange stats
		} else if (input === 'items') {
			console.log(playerProg.parseItemsToString());
			//steps[useItem]
			for (let [_, item] of playerProg._items) {
				//ideally, should've restructured to not use _items (as it's a private property)
				steps['useItem'][item.name] = 'monsterTurn';
			}
			return 'useItem';
		} else {
			//Repeat question
		}
		return 'monsterTurn';
	}

	//If Player names the item they wish to use
	function useTheItem(input) {
		playerProg.useItem('HealthPotion');
		steps['useItem'] = {
			//should've restructured as this makes the variable steps have 'mutable state'
			message: 'Which item would you like to use?',
		};
	}

	//Monsters action
	function monsterAction() {
		//Random action of monster
		playerOS.pickRandomChoice(playerProg);
	}

	//What action is done depending on the step
	function logStep() {
		const step = steps[currentStep];

		if (step) {
			readline.question(`${step.message || ''} `, (input) => {
				handleAnswer(input);
			});
		}
	}

	function handleAnswer(answer) {
		let step;

		switch (currentStep) {
			case 'start':
				if (answer === 'yes') {
					startAction();
					currentStep = 'playerTurn';
				} else {
					quit();
				}
				break;

			case 'end':
				if (answer === 'yes') {
					currentStep = 'start';

					setupNewPlayers();
				} else {
					quit();
				}
				break;

			case 'playerTurn':
				const nextStep = attackDefendOrFlee(answer);
				currentStep = nextStep; //"monsterTurn";
				break;

			case 'monsterTurn':
				monsterAction();
				currentStep = 'playerTurn';
				break;

			case 'useItem':
				useTheItem(answer);
				currentStep = 'monsterTurn';
				break;

			default:
				console.log(chalk.green.bold('default'));
				quit();
		}

		//Award the player an item every turn
		playerProg.awardItem(new Item.HealthPotion());

		//Check monsters health >= 0
		if (playerOS.health <= 0) {
			console.log(chalk.magentaBright.bold('Oh no, tech is dead!'));
			currentStep = 'end';
		} else if (playerProg.health <= 0) {
			console.log(
				chalk.magentaBright.bold(
					`You died
Nice try n00b, but you will never beat big tech!`
				)
			);
			currentStep = 'end';
		} else {
			stats();
		}
		logStep();
	}

	let currentStep = 'start';
	console.clear();
	logStep();
}
