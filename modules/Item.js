//Item.PerformAction(player) -> Does the specific action for the specific item type + uses delete statement on item after
//Item.Quantity

//ItemTypes could be HealthPotion, PoisonPotion, IncreaseMaxHealthPotion, DefensePotion, AttackPotion, AOEpotion(affects multiple enemies), RevivePotion


class Item {

    constructor(quantity = 1) {
        this.quantity = quantity;

        //Until we think of more properties for this, why not.
    }
    
}

//Polymorphism seemed better here vs. doing switch statement

class HealthPotion extends Item {
    constructor() {
        super()
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
        player.health -=20;
        
    }
}

class IncreaseMaxHealthPotion extends Item {
    constructor() {
        super()
    }
    PerformAction(player) {
        player.health +=20;
        
    }
}

class DefensePotion extends Item {
    constructor() {
        super()
    }
    PerformAction(player) {
        player.defenseRating *=1.5;
        
    }
}

class AttackPotion extends Item {
    constructor() {
        super()
    }
    PerformAction(player) {
        player.attackRating *=1.5;
        
    }
}

class RevivePotion extends Item {
    constructor() {
        super()
    }
    PerformAction(player) {
        //if (player.health==0){player.health+=100;}

        if(Player.alive==false){
            player.health=100;
        }
        
    }
}

export const Items = { //for intellisense (autocompletion) on all items -> Player.AwardItem(new Items.somethingPotion(2))
    'HealthPotion': HealthPotion,
    'PoisonPotion': PoisonPotion,
    'IncreaseMaxHealthPotion': IncreaseMaxHealthPotion,
    'DefensePotion':DefensePotion,
    'AttackPotion':AttackPotion,
    'RevivePotion':RevivePotion
};