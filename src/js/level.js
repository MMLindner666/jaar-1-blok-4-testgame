import { Actor, Engine, Vector, DisplayMode, randomInRange, Scene, BoundingBox } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Wall } from './wall.js'
import { Zombie } from './zombie.js'
import { SpeedyZombie } from './speedyzombie.js'
import { BulkyZombie } from './bulkyzombie.js'
import { HpBar } from './hp.js'
import { Background } from './background.js'
import { UI } from './ui.js'
import { AmmoBox } from './ammobox.js'

export class Level extends Scene {

    player;
    background;
    ui;
    zombieSpawnInterval = 900;
    zombieSpawnTimer = 0;
    otherZombieChance = 0.15;

    onInitialize(engine) {
        this.game = engine;
        this.levelWidth = 4032;
        this.levelHeight = 2400;
        this.spawnSafety = 80 * 1.5 * 0.6;
        // const playerGroup = ex.CollisionGroupManager.create('player');
        // const enemyGroup = ex.CollisionGroupManager.create('enemyGroup');
        // const wallGroup = ex.CollisionGroupManager.create('wallGroup');

        // playerGroup.canCollide(wallGroup);
        // enemyGroup.canCollide(wallGroup);

        this.background = new Background(this.levelWidth, this.levelHeight);
        this.add(this.background);

        //player + other player things
        this.player = new Player(new Vector(this.levelWidth/2, this.levelHeight/2));
        this.add(this.player);

        this.game.currentScene.camera.strategy.lockToActor(this.player);
        this.game.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, this.levelWidth, this.levelHeight));

        this.ui = new UI(this.player);
        this.add(this.ui);


        //temp
        // const zombie = new Zombie(new Vector(engine.drawWidth - 200, engine.drawHeight/2), this.player);
        // this.add(zombie);
        // const speedyZombie = new SpeedyZombie(new Vector(engine.drawWidth - 300, engine.drawHeight/2), this.player);
        // this.add(speedyZombie);
        // const bulkyzombie = new BulkyZombie(new Vector(engine.drawWidth - 300, engine.drawHeight/2), this.player);
        // this.add(bulkyzombie);

        this.ammoBox1 = new AmmoBox(new Vector(this.levelWidth, this.levelHeight), this.spawnSafety)
        this.add(this.ammoBox1);
        this.ammoBox2 = new AmmoBox(new Vector(this.levelWidth, this.levelHeight), this.spawnSafety)
        this.add(this.ammoBox2);
        // this.ammoBox3 = new AmmoBox(new Vector(this.levelWidth, this.levelHeight), this.spawnSafety)
        // this.add(this.ammoBox3);
        

        //wall border
        for (let i = 0; i < 50; i++) {      // x = 0-83   y = 0-49
            const wall = new Wall(new Vector(0, i));
            this.add(wall);
        }
        for (let i = 0; i < 50; i++) {
            const wall = new Wall(new Vector(83, i));
            this.add(wall);
        }
        for (let i = 0; i < 82; i++) {
            const wall = new Wall(new Vector(1 + i, 0));
            this.add(wall);
        }
        for (let i = 0; i < 82; i++) {
            const wall = new Wall(new Vector(1 + i, 49));
            this.add(wall);
        }

        //other walls
        for (let i = 0; i < 5; i++) {
            const wall = new Wall(new Vector(8 + i, 7));
            this.add(wall);
        }
        for (let i = 0; i < 5; i++) {
            const wall = new Wall(new Vector(39, 6 + i));
            this.add(wall);
        }
        for (let i = 0; i < 5; i++) {
            const wall = new Wall(new Vector(59 + i, 5));
            this.add(wall);
        }
        for (let i = 0; i < 4; i++) {
            const wall = new Wall(new Vector(59, 6 + i));
            this.add(wall);
        }
        for (let i = 0; i < 5; i++) {
            const wall = new Wall(new Vector(18 + i, 14));
            this.add(wall);
        }
        for (let i = 0; i < 4; i++) {
            const wall = new Wall(new Vector(18, 15 + i));
            this.add(wall);
        }
        for (let i = 0; i < 5; i++) {
            const wall = new Wall(new Vector(9 + i, 31));
            this.add(wall);
        }
        for (let i = 0; i < 4; i++) {
            const wall = new Wall(new Vector(9, 30 - i));
            this.add(wall);
        }
        for (let i = 0; i < 5; i++) {
            const wall = new Wall(new Vector(18, 37 + i));
            this.add(wall);
        }
        for (let i = 0; i < 5; i++) {
            const wall = new Wall(new Vector(28 + i, 38));
            this.add(wall);
        }
        for (let i = 0; i < 5; i++) {
            const wall = new Wall(new Vector(32 + i, 24));
            this.add(wall);
        }
        for (let i = 0; i < 5; i++) {
            const wall = new Wall(new Vector(45, 33 + i));
            this.add(wall);
        }
        for (let i = 0; i < 5; i++) {
            const wall = new Wall(new Vector(73, 14 + i));
            this.add(wall);
        }
        for (let i = 0; i < 5; i++) {
            const wall = new Wall(new Vector(67 - i, 40));
            this.add(wall);
        }
        for (let i = 0; i < 4; i++) {
            const wall = new Wall(new Vector(67, 39 - i));
            this.add(wall);
        }
        for (let i = 0; i < 8; i++) {
            const wall = new Wall(new Vector(54, 18 + i));
            this.add(wall);
        }
        for (let i = 0; i < 8; i++) {
            const wall = new Wall(new Vector(63, 18 + i));
            this.add(wall);
        }
        for (let i = 0; i < 8; i++) {
            const wall = new Wall(new Vector(55 + i, 18));
            this.add(wall);
        }
        for (let i = 0; i < 3; i++) {
            const wall = new Wall(new Vector(55 + i, 25));
            this.add(wall);
        }
        for (let i = 0; i < 3; i++) {
            const wall = new Wall(new Vector(60 + i, 25));
            this.add(wall);
        }
        
    }

    onPreUpdate(engine) {
        //define zombieSpawnInterval
        if (this.player.zombiesKilled > 0) {
            this.zombieSpawnInterval = 900/this.player.zombiesKilled
        }
        this.zombieSpawnInterval *= 0.999;

        //spawn zombie
        this.zombieSpawnTimer--;
        if (this.zombieSpawnTimer < 0) {
            this.zombieSpawnTimer = this.zombieSpawnInterval;
            if (randomInRange(0, 1) < this.otherZombieChance) {
                if (randomInRange(0, 1) < 0.5) {
                    const speedyZombie = new SpeedyZombie(new Vector(randomInRange(this.spawnSafety, this.levelWidth - this.spawnSafety), randomInRange(this.spawnSafety, this.levelHeight - this.spawnSafety)), this.player);
                    this.add(speedyZombie);
                } else {
                    const bulkyzombie = new BulkyZombie(new Vector(randomInRange(this.spawnSafety, this.levelWidth - this.spawnSafety), randomInRange(this.spawnSafety, this.levelHeight - this.spawnSafety)), this.player);
                    this.add(bulkyzombie);
                }
            } else {
                const zombie = new Zombie(new Vector(randomInRange(this.spawnSafety, this.levelWidth - this.spawnSafety), randomInRange(this.spawnSafety, this.levelHeight - this.spawnSafety)), this.player);
                this.add(zombie);
            }
        }
    }
}