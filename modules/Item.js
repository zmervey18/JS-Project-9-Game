"use strict";
//Item.PerformAction(player) -> Does the specific action for the specific item type + uses delete statement on item after
//Item.Quantity
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.HealthPotion = exports.Item = void 0;
var Item = /** @class */ (function () {
    function Item(name, quantity, useItemMessage) {
        this.quantity = quantity;
        this.name = name;
        this.useItemMessage = useItemMessage;
    }
    return Item;
}());
exports.Item = Item;
//Polymorphism seemed better here vs. doing switch statement
var HealthPotion = /** @class */ (function (_super) {
    __extends(HealthPotion, _super);
    function HealthPotion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Increases players health by 10
     * @param {player} player The player
     */
    HealthPotion.prototype.PerformAction = function (player) {
        /* player.health += 10; */
    };
    return HealthPotion;
}(Item));
exports.HealthPotion = HealthPotion;
/* export class PoisonPotion extends Item {
    constructor() {
        super();
    }
    PerformAction(player) {
        player.health -= 20;
    }
}

export class IncreaseMaxHealthPotion extends Item {
    constructor() {
        super();
    }
    PerformAction(player) {
        player.health += 20;
    }
}

export class DefensePotion extends Item {
    constructor() {
        super();
    }
    PerformAction(player) {
        player.defenseRating *= 1.5;
    }
}

export class AttackPotion extends Item {
    constructor() {
        super();
    }
    PerformAction(player) {
        player.attackRating *= 1.5;
    }
}

export class RevivePotion extends Item {
    constructor() {
        super();
    }
    PerformAction(player) {
        //if (player.health==0){player.health+=100;}

        if (player.alive == false) {
            player.alive = true;
            player.health = 100;
        }
    }
}
 */ 
