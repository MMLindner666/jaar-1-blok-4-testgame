import { Actor, Engine, Vector, DisplayMode, randomInRange, Keys, CollisionType, Camera } from "excalibur"
import { Resources } from './resources.js'
import { Game } from "./game.js"
import { Wall } from './wall.js'
import { Zombie } from './zombie.js'
import { Bullet } from './bullet.js'

export class Gun extends Actor {

    ammo = 30;
    fireCooldown = 0;
    fireCooldownMax = 20;
    game;
    camera;
    isFiring = false;

    constructor() {
        super();
    }

    onInitialize(engine) {
        this.game = engine;
        this.camera = this.game.currentScene.camera;
        this.graphics.use(Resources.Gun.toSprite());
        this.anchor = new Vector(1, 0.5);
        engine.input.pointers.primary.on('down', (engine) => this.mouseDown(engine));
        engine.input.pointers.primary.on('up', (engine) => this.mouseUp(engine));
    }

    onPreUpdate(engine) {
        this.rotation = Math.atan2(this.parent.pos.y - (this.camera.y - this.game.drawHeight/2 + engine.input.pointers.primary.lastScreenPos.y), this.parent.pos.x - (this.camera.x - this.game.drawWidth/2 + engine.input.pointers.primary.lastScreenPos.x));
        if (this.fireCooldown > 0) {
            this.fireCooldown--;
        } else if (this.isFiring == true) {
            this.fireGun(engine);
        }        
    }

    mouseDown(engine) {
        this.isFiring = true;
    }

    mouseUp(engine) {
        this.isFiring = false;
    }

    fireGun(engine) {
        if (this.ammo > 0) {
            this.scene.add(new Bullet(this.parent.pos, this.rotation));
            this.fireCooldown = this.fireCooldownMax;
            this.ammo--;
        }
    }
}