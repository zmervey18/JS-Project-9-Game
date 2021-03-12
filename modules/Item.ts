//Item.PerformAction(player) -> Does the specific action for the specific item type + uses delete statement on item after
//Item.Quantity

import { IPlayer } from './interfaces/IPlayer';

export abstract class Item {
	public quantity: Number;
	public readonly name: String;
	public readonly useItemMessage: String;

	constructor(name: String, quantity: Number, useItemMessage: String) {
		this.quantity = quantity;
		this.name = name;
        this.useItemMessage = useItemMessage;
	}

    abstract PerformAction(player: IPlayer): void;
}

//Polymorphism seemed better here vs. doing switch statement

export class HealthPotion extends Item {
	PerformAction(player: IPlayer) {
		/* player.health += 10; */
	}
}

/* export class PoisonPotion extends Item {
	PerformAction(player: String) {
		player.health -= 20;
	}
}

export class IncreaseMaxHealthPotion extends Item {
	PerformAction(player: String) {
		player.health += 20;
	}
}

export class DefensePotion extends Item {
	PerformAction(player: String) {
		player.defenseRating *= 1.5;
	}
}

export class AttackPotion extends Item {
	PerformAction(player: String) {
		player.attackRating *= 1.5;
	}
}

export class RevivePotion extends Item {
	PerformAction(player) {
		//if (player.health==0){player.health+=100;}

		if (player.alive == false) {
			player.alive = true;
			player.health = 100;
		}
	}
}
 */