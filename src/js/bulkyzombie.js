import { Actor, Engine, Vector, DisplayMode, randomInRange, Keys, CollisionType } from "excalibur"
import { Resources } from './resources.js'
import { Zombie } from './zombie.js'

export class BulkyZombie extends Zombie {

    constructor(pos, player) {
        super(pos, player, {width:Resources.BulkyZombie.width * 0.85, height:Resources.BulkyZombie.height * 0.85, 
                collisionType: CollisionType.Active/*, collisionGroup: EnemyCollisionGroup*/});
    }

    onInitialize(engine) {
        this.hp = 150;
        this.speed = 60;
        this.game = engine;
        this.graphics.use(Resources.BulkyZombie.toSprite());
        this.scale = new Vector(0.6, 0.6);
        this.events.on("collisionstart", (event) => this.collide(event));
    }

}