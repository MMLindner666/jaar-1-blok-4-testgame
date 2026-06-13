import { Actor, Engine, Vector, DisplayMode, randomInRange, Keys, CollisionType } from "excalibur"
import { Resources } from './resources.js'
import { Game } from "./game.js"
import { Player } from "./player.js"
import { Bullet } from "./bullet.js"

// export const EnemyCollisionGroup = CollisionGroupManager.create('enemyGroup')

export class Zombie extends Actor {

    hp = 100;
    stunTimer = 0;
    stunTimerMax = 60;
    damage = 10;
    speed = 100;
    player;
    game;

    constructor(pos, player, options = {}) {
        super({width:Resources.NormalZombie.width * 0.85, height:Resources.NormalZombie.height * 0.85, 
                collisionType: CollisionType.Active/*, collisionGroup: EnemyCollisionGroup*/, ...options});
        this.pos = pos;
        this.player = player;
    }

    onInitialize(engine) {
        this.game = engine;
        this.graphics.use(Resources.NormalZombie.toSprite());
        this.scale = new Vector(0.6, 0.6);
        this.events.on("collisionstart", (event) => this.collide(event));
    }

    onPreUpdate(engine) {

        if (this.stunTimer < 0) {
            let direction = engine.currentScene.player.pos.sub(this.pos).normalize();
            this.vel = direction.scale(this.speed);
        } else {
            this.stunTimer--;
        }
    }

    collide(event) {
        const otherObject = event.other.owner;
        if (otherObject instanceof Player) {
            this.stunTimer = this.stunTimerMax
            this.vel = new Vector(0, 0);
        }

        if (otherObject instanceof Bullet) {
            this.takeDamage(otherObject.damage);
            otherObject.kill();
        }
    }

    takeDamage(damageDealt) {
        this.stunTimer = this.stunTimerMax/10;
        this.vel = new Vector(0, 0);
        this.hp -= damageDealt;
        if (this.hp <= 0) {
            this.kill();
            this.player.zombiesKilled++;
        }
    }
}