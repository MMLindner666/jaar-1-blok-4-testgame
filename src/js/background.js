import { Actor, Engine, Vector, DisplayMode, randomInRange, Keys, CollisionType, Sprite } from "excalibur"
import { Resources } from './resources.js'
import { Game } from "./game.js"
import { Gun } from './gun.js'
import { Wall } from './wall.js'
import { Zombie } from './zombie.js'

export class Background extends Actor {

    levelWidth;
    levelHeight;

    constructor(levelWidth, levelHeight) {
        super();
        this.levelWidth = levelWidth;
        this.levelHeight = levelHeight; 
    }

    onInitialize(engine) {
        this.game = engine;
        this.scale = new Vector(0.6, 0.6);
        // this.graphics.use(Resources.Background.toSprite()); 
        let sprite = new Sprite({
            image: Resources.Background,
            sourceView: { x: 0, y: 0, width: this.levelWidth / 0.6, height: this.levelHeight / 0.6 }
        })
        this.anchor = Vector.Zero
        this.graphics.use(sprite)       
        this.z = -5;
    }
}