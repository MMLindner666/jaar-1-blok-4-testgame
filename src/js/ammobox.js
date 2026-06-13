import { Actor, Engine, Vector, DisplayMode, randomInRange, Keys, CollisionType } from "excalibur"
import { Resources } from './resources.js'
import { Game } from "./game.js"
import { Wall } from './wall.js'
import { Zombie } from './zombie.js'
import { Gun } from './gun.js'
import { Player } from './player.js'

// export const PlayerCollisionGroup = CollisionGroupManager.create('player')

export class AmmoBox extends Actor {

    ammo = 30;
    levelSize;
    spawnSafety;

    constructor(levelSize, spawnSafety) {
        super({width:Resources.Player.width * 0.9, height:Resources.Player.height * 0.45});
        this.levelSize = levelSize;
        this.spawnSafety = spawnSafety;
        this.pos = new Vector(randomInRange(this.spawnSafety, this.levelSize.x - this.spawnSafety), randomInRange(this.spawnSafety, this.levelSize.y - this.spawnSafety));
        console.log(this.pos);
    }

    onInitialize(engine) {
        this.game = engine;
        this.graphics.use(Resources.AmmoBox.toSprite());
        this.scale = new Vector(0.6, 0.6);
        this.collider.useBoxCollider(80, 56, new Vector(0.5,0.35), new Vector(0,0));
        this.events.on("collisionstart", (event) => this.collide(event));
    }

    collide(event) {
        const otherObject = event.other.owner;
        if (otherObject instanceof Player) {
            otherObject.gun.ammo += this.ammo;
            this.pos = new Vector(randomInRange(this.spawnSafety, this.levelSize.x - this.spawnSafety), randomInRange(this.spawnSafety, this.levelSize.y - this.spawnSafety));
            console.log(this.pos);
        }
    }

}