import { Actor, Engine, Vector, DisplayMode, randomInRange, Keys, CollisionType } from "excalibur"
import { Resources } from './resources.js'
import { Game } from "./game.js"
import { Wall } from './wall.js'
import { Zombie } from './zombie.js'
import { SpeedyZombie } from './speedyzombie.js'
import { BulkyZombie } from './bulkyzombie.js'
import { Gun } from './gun.js'
import { AmmoBox } from './ammobox.js'

// export const PlayerCollisionGroup = CollisionGroupManager.create('player')

export class Player extends Actor {

    hp = 100;
    gun;
    invincibilityTimer = 0;
    invincibilityTimerMax = 30;
    zombiesKilled = 0;
    game;

    constructor(pos) {
        super({width:Resources.Player.width * 0.85, height:Resources.Player.height * 0.85, 
                collisionType: CollisionType.Active/*, collisionGroup: PlayerCollisionGroup*/});
        this.pos = pos;
    }

    onInitialize(engine) {
        this.game = engine;
        this.graphics.use(Resources.Player.toSprite());
        this.scale = new Vector(0.6, 0.6);
        this.events.on("collisionstart", (event) => this.collide(event));
        this.gun = new Gun();
        this.addChild(this.gun);
    }

    onPreUpdate(engine) {
        let xSpeed = 0;
        let ySpeed = 0;
        let speed = 300;
        let hp = 100;

        this.pastPos = this.pos;

        if (engine.input.keyboard.isHeld(Keys.Left) || engine.input.keyboard.isHeld(Keys.A)) {
            xSpeed -= speed;
        }
        if (engine.input.keyboard.isHeld(Keys.Right) || engine.input.keyboard.isHeld(Keys.D)) {
            xSpeed += speed;
        }
        if (engine.input.keyboard.isHeld(Keys.Up) || engine.input.keyboard.isHeld(Keys.W)) {
            ySpeed -= speed;
        }
        if (engine.input.keyboard.isHeld(Keys.Down) || engine.input.keyboard.isHeld(Keys.S)) {
            ySpeed += speed;
        }

        this.vel = new Vector(xSpeed, ySpeed);

        this.invincibilityTimer--;
    }

    collide(event) {
        const otherObject = event.other.owner;
        if (otherObject instanceof Zombie) {
            if (this.invincibilityTimer < 0) {
                this.damage(otherObject.damage);
                this.invincibilityTimer = this.invincibilityTimerMax
            }
            
        }
    }

    damage(damageDealt) {
        this.hp -= damageDealt;
        if (this.hp <= 0) {
            let highScore = localStorage.getItem("highScore");
            localStorage.setItem("lastScore", JSON.stringify(this.zombiesKilled*100));
            if (highScore < this.zombiesKilled*100) {
                localStorage.setItem("highScore", JSON.stringify(this.zombiesKilled*100));
            }
            this.game.goToScene('gameOverScreen');
        }
    }
}