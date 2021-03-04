//Potentially put below data in JSON in future
const firstNames = ['Savvy', 'Scary', 'Bearded', 'Captain', 'Monstrous', 'Epic'];
const lastNames = ['Jason', 'Steve', 'Ben', 'Tom', '???', 'Gollum']
const fleeProbability = 0.1;
const defendMultiplier = 2;
//

export class Player {
    

    constructor(health = 100, attackRating = 40, defenseRating = 20) {
        this.health = health;
        this.attackRating = attackRating;
        this.defenseRating = defenseRating;
        this.name = firstNames[Math.floor(Math.random() * firstNames.length)] + " " + lastNames[Math.floor(Math.random() * lastNames.length)]; //rand name
        this.alive = true;
        this._enemies = []; //Array of other enemy Players
        this._allies = []; //Array of other ally Players
        this._defaultDefenseRating = this.defenseRating;
        this._itemArray = [];
    }

    Attack(otherPlayer) {

        if (!this._enemies.includes(otherPlayer)) {
            throw new Error('Attack: ' + otherPlayer.name + ' is not an enemy of ' + this.name)
        }

        this.defenseRating = this._defaultDefenseRating;
        otherPlayer.health -= Math.random() * this.attackRating / this.defenseRating;

        if (otherPlayer.health < 0) {
            this.alive = false
        }
    }

    Defend() {
        this.defenseRating = this._defaultDefenseRating * defendMultiplier;
    }

    Flee() {
        if (Math.random() < fleeProbability) { //Removes from other peoples _enemies and _allies arrays

            for (enemy of)

            this._enemies = [];
            this._allies = [];
        }
    }
}

export class Protagonist extends Player{
    constructor(health, attackRating, defenseRating){
        super(health, attackRating, defenseRating)
        this.name = 'ProtagonistName';
    }
    
}

export class Monster extends Player{
    constructor(health, attackRating, defenseRating){
        super(health, attackRating, defenseRating)
        

    }

    PickRandomChoice(Attack, Defend, UseItem, Flee) { //Ideally is quite clever in that they might defend on low health / use all available items
        
    }
}