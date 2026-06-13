import { Actor, Engine, Vector, DisplayMode, randomInRange, Keys, CollisionType } from "excalibur"
import { Resources } from './resources.js'
import { Game } from "./game.js"
import { Wall } from './wall.js'
import { Zombie } from './zombie.js'
import { Gun } from './gun.js'

export class HpBar extends Actor {

    healthID;
    player;
    spaceBetween = 60;

    constructor(healthID, player) {
        super();
        this.healthID = healthID;
        this.player = player;
    }

    onInitialize(engine) {
        this.game = engine;
        this.scale = new Vector(0.3, 0.3);
        this.pos = new Vector(this.game.drawWidth/2 - 4.5*this.spaceBetween + this.spaceBetween*this.healthID, this.game.drawHeight * 0.95);
        this.z = 5;
    }

    onPreUpdate(engine) {
        this.game = engine;
        if (this.player.hp >= (this.healthID + 1)*10) {
            this.graphics.use(Resources.HpFull.toSprite());
        } else {
            this.graphics.use(Resources.HpEmpty.toSprite());
        }
    }
}