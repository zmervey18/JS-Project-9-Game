//Item.PerformAction(player) -> Does the specific action for the specific item type + uses delete statement on item after
//Item.Quantity


export class Item {

    constructor(name = 'item name', quantity = 1, useItemMessage = 'item was used') {
        this.quantity = quantity;
        this.name = name;
        this.useItemMessage = useItemMessage;
    }
    
}

//Polymorphism seemed better here vs. doing switch statement

class HealthPotion extends Item {
    constructor() {
        super();
    }

    /**
     * Increases players health by 10
     * @param {player} player The player
     */
    PerformAction(player) {
        player.health += 10;
    }
    
}

class PoisonPotion extends Item {
    constructor() {
        super()
    }
    PerformAction(player) {
        player.health -= 20;
    }
}

class IncreaseMaxHealthPotion extends Item {
    constructor() {
        super()
    }
    PerformAction(player) {
        player.health += 20;
    }
}

class DefensePotion extends Item {
    constructor() {
        super()
    }
    PerformAction(player) {
        player.defenseRating *= 1.5;
    }
}

class AttackPotion extends Item {
    constructor() {
        super()
    }
    PerformAction(player) {
        player.attackRating *= 1.5;
    }
}

class RevivePotion extends Item {
    constructor() {
        super()
    }
    PerformAction(player) {
        //if (player.health==0){player.health+=100;}

        if (player.alive == false) {
            player.alive = true
            player.health=100;
        }
        
    }
}