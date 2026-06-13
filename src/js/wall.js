import { Actor, Engine, Vector, DisplayMode, randomInRange, Keys, CollisionType } from "excalibur"
import { Resources } from './resources.js'
import { Game } from "./game.js"

export class Wall extends Actor {

    constructor(posID) {
        super({width:Resources.Wall.width, height:Resources.Wall.height, collisionType: CollisionType.Fixed});
        this.pos = new Vector((40 + 80*posID.x)*0.6, (40 + 80*posID.y)*0.6);
    }

    onInitialize(engine) {
        this.game = engine;
        this.graphics.use(Resources.Wall.toSprite());
        this.scale = new Vector(0.6, 0.6);
    }
}