import chalk from 'chalk';
import { IPlayer } from './interfaces/IPlayer';


const firstNames: Array<string> = [
	'Savvy',
	'Scary',
	'Bearded',
	'Captain',
	'Monstrous',
	'Epic',
];

const lastNames: Array<string> = [
	'Jason',
	'Steve',
	'Ben',
	'Tom',
	'???',
	'Gollum',
	'Person',
	'Being',
];

const FLEE_PROBABILITY: number = 0.1;
const DEFEND_MULTIPLIER: number = 3;

export class Player {
	public IPlayer
	constructor(IPlayer : IPlayer) {
		this.IPlayer = IPlayer
	}

	parseMainStatsToString() {
		return `[${this.race}] ${this.name}
        Health: ${this.health}, AttackRating: ${this.attackRating}, DefenseRating: ${this.defenseRating}`;
	}
}

export class Protagonist extends Player {
	constructor() {
		super();
		this.name = 'N00b';
		this.attackMessage = 'You attack... \n' + 'Hopefully no errors :)';
		this.defendMessage = 'You turn on windows firewall gaining defense';
	}
}

export class Monster extends Player {
	constructor() {
		super();
	}

	pickRandomChoice(otherPlayer) {
		//Ideally is quite clever in that they might defend on low health / use all available items
		//Behaviour tree npm? Alternatively, nest switch cases [may be an antipattern / considered bad practice]

		let number = Math.random();
		if (number <= 0.7) {
			this.attack(otherPlayer);
		} else {
			this.defend();
		}
	}
}
