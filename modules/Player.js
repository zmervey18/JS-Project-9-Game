//No writing to console here -> Should be passed onto input_output.js
const firstNames = [
	'Savvy',
	'Scary',
	'Bearded',
	'Captain',
	'Monstrous',
	'Epic',
];
const lastNames = ['Jason', 'Steve', 'Ben', 'Tom', '???', 'Gollum'];
const FLEE_PROBABILITY = 0.1;
const DEFEND_MULTIPLIER = 2;

export class Player {
	constructor(
		race = 'Human',
		name,
		health = 100,
		attackRating = 40,
		defenseRating = 20,
		attackMessage = 'attack message',
		defendMessage = 'defend message'
	) {
		this.health = health;
		this.attackRating = attackRating;
		this.defenseRating = defenseRating; //Ensure non-zero
		this.name =
			name ||
			firstNames[Math.floor(Math.random() * firstNames.length)] +
				' ' +
				lastNames[Math.floor(Math.random() * lastNames.length)]; //rand name
		this.race = race;
		this.alive = true;
		this._enemies = new Map(); //Hash of other enemy Players + Map() performs better in scenarios involving frequent additions and removals of key-value pairs
		this._allies = new Map(); //Hash of other ally Players
		this._items = new Map(); //Hash of items
		this.defaultDefenseRating = this.defenseRating;
		this.attackMessage = attackMessage;
		this.defendMessage = defendMessage;
	}

	attack(otherPlayer) {
		if (!this._enemies.has(otherPlayer)) {
			throw new Error(
				`Attack: ${otherPlayer.name} is not an enemy of ${this.name}`
			);
		}

		this.defenseRating = this.defaultDefenseRating;
		otherPlayer.health -=
			(Math.random() * this.attackRating) / otherPlayer.defenseRating;

		if (otherPlayer.health < 0) {
			otherPlayer.alive = false;
			otherPlayer.endFight();
		}
	}

	defend() {
		this.defenseRating = this.defaultDefenseRating * DEFEND_MULTIPLIER;
	}

	awardItem(inputItem) {
		//Player.AwardItem(new Items.somethingPotion("name", 2, "something potion was used!")) -> Increases quantity of somethingPotion by 2 within Players _items

		if (Player._items.has(inputItem.className)) {
			Player._items.get(item.className).quantity += inputItem.quantity;
		} else {
			Player._items.set(item.className, inputItem);
		}
	}

	useItem(itemClassName, otherPlayer = this) {
		//Player.UseItem('PoisonPotion', EnemyPlayer) -> Attacks EnemyPlayer with PoisonPotion if Player has it
		//if exists execute perform actions, Poison Poiton ()
		if (Player._items.has(itemClassname)) {
			Player._items.get(itemClassname).PerformAction(otherPlayer);
			Player._items.get(item.className).quantity -= 1;
			if (Player._items.get(item.className).quantity < 1) {
				Player._items.delete(item.className);
			}
		}
	}

	flee() {
		if (Math.random() < FLEE_PROBABILITY) {
			this.endFight();
		}
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
		for (let [item, _] of this._items) {
			stringArray.push(`${item.name}: ${item.quantity}`);
		}
		return stringArray.join(', ');
	}
}

export class Protagonist extends Player {
	constructor() {
		super('Human', 'Super Michele');
	}
}

export class Monster extends Player {
	constructor(
		race,
		name,
		health,
		attackRating,
		defenseRating,
		attackMessage,
		defendMessage
	) {
		super(
			race,
			name,
			health,
			attackRating,
			defenseRating,
			attackMessage,
			defendMessage
		);
	}

	pickRandomChoice(Attack, Defend, UseItem, Flee) {
		//Ideally is quite clever in that they might defend on low health / use all available items
		//Behaviour tree npm? Alternatively, nest switch cases [may be an antipattern / considered bad practice] or use polymorphism
	}
}
