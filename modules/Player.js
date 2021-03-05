import chalk from "chalk";


const firstNames = ['Savvy','Scary','Bearded','Captain','Monstrous','Epic'];
const lastNames = ['Jason', 'Steve', 'Ben', 'Tom', '???', 'Gollum'];
const FLEE_PROBABILITY = 0.1;
const DEFEND_MULTIPLIER = 2;

export class Player {
	constructor(
		race,
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
		//otherPlayer.health = 100; //Math.floor((10 * Math.random() * this.attackRating) / otherPlayer.defenseRating);

        console.log(chalk.red.bold(this.attackMessage));

		if (otherPlayer.health <= 0) {
			otherPlayer.alive = false;
			otherPlayer.endFight();
		}
	}

	defend() {
		this.defenseRating = this.defaultDefenseRating * DEFEND_MULTIPLIER;
        console.log(chalk.redBright.bold(this.defendMessage));
	}
    
	awardItem(inputItem) {
		//Player.AwardItem(new Items.somethingPotion("name", 2, "something potion was used!")) -> Increases quantity of somethingPotion by 2 within Players _items

		if (this._items.has(inputItem.className)) {
			this._items.get(inputItem.className).quantity += inputItem.quantity;
		} else {
			this._items.set(inputItem.className, inputItem);
		}
	}

	useItem(itemClassName, otherPlayer = this) {
		//Player.UseItem('PoisonPotion', EnemyPlayer) -> Attacks EnemyPlayer with PoisonPotion if Player has it
		//if exists execute perform actions, Poison Poiton ()
		if (this._items.has(itemClassname)) {
			this._items.get(itemClassname).PerformAction(otherPlayer);
			this._items.get(item.className).quantity -= 1;
			if (this._items.get(item.className).quantity < 1) {
				this._items.delete(item.className);
            }
		} else {
            console.log("You have no such item!");
        }
	}

	flee() {
		if (Math.random() < FLEE_PROBABILITY) {
			//this.endFight();
		}

        console.log( chalk.magenta( "Player tactically runs away from coding problems by restarting their computer!" ) );
        console.log( chalk.red( "Windows update will not let user shut down! Back to the terminal!" ) );

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
		for (let [itemClassName, item] of this._items) {
			stringArray.push(`${item.name}: ${item.quantity}`);
		}
		return stringArray.join(', ');
	}
}

export class Protagonist extends Player {
	constructor(race,
		name,
		health,
		attackRating,
		defenseRating,
		attackMessage,
		defendMessage) {
        super(race,
		name,
		health,
		attackRating,
		defenseRating,
		attackMessage,
		defendMessage);
        this.name = "N00b";
        this.attackMessage = "I think this should work... \n" + "Nope, still broken...";
        this.defendMessage = "Oh no, the code set my house on fire!";
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
        this.name = "Android Bill Gates";
        this.attackMessage = "Would you like a Windows update? Have one anyway!";
        this.defendMessage = "Android Bill Gates defends with antitrust lawyers!";
	}

	pickRandomChoice( otherPlayer ) {
		//Ideally is quite clever in that they might defend on low health / use all available items
		//Behaviour tree npm? Alternatively, nest switch cases [may be an antipattern / considered bad practice] or use polymorphism

        let number = Math.random();
        if(number <= 0.9){
            this.attack( otherPlayer );
            otherPlayer.health -= 25;
            this.attackRating += 50;
        }
        else{
            this.defend();
            this.defenseRating += 50;
        }


	}
}
