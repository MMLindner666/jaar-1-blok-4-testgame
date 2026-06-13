import { Actor, Engine, Vector, DisplayMode, randomInRange, Keys, CollisionType } from "excalibur"
import { Resources } from './resources.js'
import { Game } from "./game.js"
import { Gun } from './gun.js'
import { Wall } from './wall.js'
import { Zombie } from './zombie.js'

export class Bullet extends Actor {
    
    speed = 600;
    damage = 35;

    constructor(pos, rotation) {
        super({width:Resources.Bullet.width * 0.85, height:Resources.Bullet.height});
        this.pos = pos;
        this.rotation = rotation;
    }

    onInitialize(engine) {
        this.game = engine;
        this.graphics.use(Resources.Bullet.toSprite());
        this.scale = new Vector(0.4, 0.4);
        this.vel = new Vector(-Math.cos(this.rotation) * this.speed, -Math.sin(this.rotation) * this.speed);
        this.events.on("collisionstart", (event) => this.collide(event));
    }

    collide(event) {
        const otherObject = event.other.owner;

        if (otherObject instanceof Wall) {
            this.kill();
        }
    }
}