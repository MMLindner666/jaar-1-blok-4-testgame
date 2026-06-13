import { Actor, Engine, Vector, DisplayMode, randomInRange, Keys, CollisionType } from "excalibur"
import { Resources } from './resources.js'
import { Zombie } from './zombie.js'

export class SpeedyZombie extends Zombie {

    onInitialize(engine) {
        this.hp = 60;
        this.speed = 225;
        this.game = engine;
        this.graphics.use(Resources.SpeedyZombie.toSprite());
        this.scale = new Vector(0.6, 0.6);
        this.events.on("collisionstart", (event) => this.collide(event));
    }

}