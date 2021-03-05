//No writing to console here -> Should be passed onto input_output.js
const firstNames = ['Savvy', 'Scary', 'Bearded', 'Captain', 'Monstrous', 'Epic'];
const lastNames = ['Jason', 'Steve', 'Ben', 'Tom', '???', 'Gollum'];
const fleeProbability = 0.1;
const defendMultiplier = 2;

export class Player {

    constructor(race = 'Human', name, health = 100, attackRating = 40, defenseRating = 20, attackMessage = '', defendMessage = '') {
        this.health = health;
        this.attackRating = attackRating;
        this.defenseRating = defenseRating; //Ensure non-zero
        this.name = name || firstNames[Math.floor(Math.random() * firstNames.length)] + " " + lastNames[Math.floor(Math.random() * lastNames.length)]; //rand name
        this.alive = true;
        this._enemies = new Map(); //Hash of other enemy Players + Map() performs better in scenarios involving frequent additions and removals of key-value pairs
        this._allies = new Map(); //Hash of other ally Players
        this._items = new Map(); //Hash of items
        this.defaultDefenseRating = this.defenseRating;
        this.attackMessage = attackMessage;
        this.defendMessage = defendMessage;
    }

    Attack(otherPlayer) {

        if (!this._enemies.has(otherPlayer)) {
            throw new Error('Attack: ' + otherPlayer.name + ' is not an enemy of ' + this.name)
        }

        this.defenseRating = this.defaultDefenseRating;
        otherPlayer.health -= Math.random() * this.attackRating / otherPlayer.defenseRating;

        if (otherPlayer.health < 0) {
            this.alive = false;
            this.EndFight();
        }
    }

    Defend() {
        this.defenseRating = this.defaultDefenseRating * defendMultiplier;
    }

    AwardItem (inputItem) { //Player.AwardItem(new Items.somethingPotion(2)) -> Increases quantity of somethingPotion by 2 within Players _items
    
        if (Player._items.has(inputItem.className)) {
            Player._items.get(item.className).quantity += inputItem.quantity;
        }
        else {
            Player._items.set(item.className, inputItem);
        }

    }

    UseItem(itemClassName, otherPlayer = this) { //Player.UseItem('PoisonPotion', EnemyPlayer) -> Attacks EnemyPlayer with PoisonPotion if Player has it
        //if exists execute perform actions, Poison Poiton ()
        if (Player._items.has(itemClassname)) {
            Player._items.get(itemClassname).PerformAction(otherPlayer);
            Player._items.get(item.className).quantity -= 1;
            if (Player._items.get(item.className).quantity < 1) {
                Player._items.delete(item.className);
            }
        }

    }

    Flee() {
        if (Math.random() < fleeProbability) {
            this.EndFight()
        }
    }

    EndFight() {
        //Leaves fight by removing from other players ally and enemy hashes
        for (let [enemy, _] of this._enemies) {
            enemy._enemies.delete(this)
        }
        for (let [ally, _] of this._allies) {
            ally._allies.delete(this)
        }

        //
        
        //Clears your ally and enemy hashes
        this._enemies = new Map(); //Will the garbage collector remove the old hashes in JS by doing this? i.e. Clear from memory
        this._allies = new Map();
    }

    JoinFight(enemyHash, allyHash) {
        //Joins fight by adding to other players ally and enemy hashes
        for (let [enemy, _] of enemyHash) {
            enemy._enemies.set(this)
        }
        for (let [ally, _] of allyHash) {
            ally._allies.set(this)
        }

        //Sets up your ally and enemy hashes
        this._enemies = enemyHash;
        this._allies = allyHash;
    }

    ParseStatsToString() {

    }

    ParseItemsToString() {

    }

    


}

export class Protagonist extends Player{
    constructor(health, attackRating, defenseRating){
        super(health, attackRating, defenseRating)
        this.name = 'Super Michele';
    }
    
}

export class Monster extends Player{
    constructor(health, attackRating, defenseRating){
        super(health, attackRating, defenseRating)
        

    }

    PickRandomChoice(Attack, Defend, UseItem, Flee) { //Ideally is quite clever in that they might defend on low health / use all available items
        //Behaviour tree npm? Alternatively, nest switch cases [may be an antipattern / considered bad practice] or use polymorphism
    }
}
