import chalk from 'chalk';

const firstNames = [
	'Savvy',
	'Scary',
	'Bearded',
	'Captain',
	'Monstrous',
	'Epic',
];
const lastNames = [
	'Jason',
	'Steve',
	'Ben',
	'Tom',
	'???',
	'Gollum',
	'Person',
	'Being',
];
const FLEE_PROBABILITY = 0.1;
const DEFEND_MULTIPLIER = 3;

export class Player {
	//Constructor parameters in builder pattern format https://dzone.com/articles/builder-pattern-in-javascript
	/**@param {String} race*/
	__race(race) {
		this.race = race;
		return this;
	}
	/**@param {String} name*/
	__name(name) {
		this.name = name ? name : this.name;
		return this;
	}
	/**@param {Number} health*/
	__health(health) {
		this.health = health;
		return this;
	}
	/**@param {Number} attackRating*/
	__attackRating(attackRating) {
		this.attackRating = attackRating;
		return this;
	}
	/**@param {Number} defenseRating*/
	__defenseRating(defenseRating) {
		this.defenseRating = defenseRating;
		return this;
	}
	/**@param {String} attackMessage*/
	__attackMessage(attackMessage) {
		this.attackMessage = attackMessage;
		return this;
	}
	/**@param {String} defendMessage*/
	__defendMessage(defendMessage) {
		this.defendMessage = defendMessage;
		return this;
	}
	//
	constructor() {
		this.race = '';
		this.name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
			lastNames[Math.floor(Math.random() * lastNames.length)]
		}`; //rand name
		this.health = 100;
		this.attackRating = 40;
		this.defenseRating = 20; //Ensure non-zero
		this.alive = true;
		this._enemies = new Map(); //Hash of other enemy Players + Map() performs better in scenarios involving frequent additions and removals of key-value pairs
		this._allies = new Map(); //Hash of other ally Players
		this._items = new Map(); //Hash of items
		this._defaultDefenseRating = this.defenseRating;
		this.attackMessage = 'attack message';
		this.defendMessage = 'defend message';
	}

	attack(otherPlayer) {
		if (!this._enemies.has(otherPlayer)) {
			throw new Error(
				`attack: ${otherPlayer.name} is not an enemy of ${this.name}`
			);
		}
		this.defenseRating = this._defaultDefenseRating;
		otherPlayer.health -= Math.floor(
			(10 * Math.random() * this.attackRating) / otherPlayer.defenseRating
		);

		console.log(chalk.red.bold(this.attackMessage));

		if (otherPlayer.health <= 0) {
			otherPlayer.alive = false;
			otherPlayer.endFight();
		}
	}

	defend() {
		this.defenseRating = this._defaultDefenseRating * DEFEND_MULTIPLIER;
		console.log(chalk.redBright.bold(this.defendMessage));
	}

	awardItem(inputItem) {
		//Player.AwardItem(new Items.somethingPotion("name", 2, "something potion was used!")) -> Increases quantity of somethingPotion by 2 within Players _items

		if (this._items.has(inputItem.constructor.name)) {
			this._items.get(inputItem.constructor.name).quantity +=
				inputItem.quantity;
		} else {
			this._items.set(inputItem.constructor.name, inputItem);
		}
	}

	useItem(itemClassName, otherPlayer = this) {
		//Player.UseItem('PoisonPotion', EnemyPlayer) -> Attacks EnemyPlayer with PoisonPotion if Player has it

		if (this._items.has(itemClassName)) {
			this._items.get(itemClassName).PerformAction(otherPlayer);
			this._items.get(itemClassName).quantity -= 1;
			if (this._items.get(itemClassName).quantity < 1) {
				this._items.delete(itemClassName);
			}
		} else {
			console.log('You have no such item!');
		}
	}

	flee() {
		if (Math.random() < FLEE_PROBABILITY) {
			//this.endFight();
		}

		console.log(
			chalk.magenta(
				`Player tactically runs away from coding problems by restarting their computer!
				Windows update will not let user shut down! Back to the terminal!`
			)
		);
	}

	endFight() {
		//Leaves fight by removing from other players ally and enemy hashes
		for (let [enemy, _] of this._enemies) {
			enemy._enemies.delete(this);
		}
		for (let [ally, _] of this._allies) {
			ally._allies.delete(this);
		}

		//Clears your ally and enemy hashes
		this._enemies = new Map(); //Garbage collects old map
		this._allies = new Map();
	}

	initFight(otherPerson) {
		//Old way of allowing for multiple enemies / allies
		/* for (let enemy of enemyArray) {
            enemy._enemies.set(this)
        }
        for (let ally of allyArray) {
            ally._allies.set(this)
        } */

		//Sets up your ally and enemy hashes
		/* this._enemies = enemyHash;
		this._allies = allyHash; */

		otherPerson._enemies.set(this);
		this._enemies.set(otherPerson);
	}

	parseMainStatsToString() {
		return `[${this.race}] ${this.name}
        Health: ${this.health}, AttackRating: ${this.attackRating}, DefenseRating: ${this.defenseRating}`;
	}

	parseItemsToString() {
		let stringArray = [];
		for (let [_, item] of this._items) {
			stringArray.push(`${item.name}: ${item.quantity}`);
		}
		return stringArray.join(', ');
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
