import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, randomInRange } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        const background = new Actor()
        background.graphics.use(Resources.Background.toSprite())
        background.pos = new Vector(this.drawWidth/2, this.drawHeight/2)
        background.scale = new Vector(1, 1)
        background.z = -1
        this.add(background)

        for (let i = 0; i < 10; i++) {
            const fish = new Actor()
            fish.graphics.use(Resources.Fish.toSprite())
            fish.pos = new Vector(275 + 75*i, 75+75*i)
            fish.vel = new Vector(150,150)
            fish.events.on("exitviewport", (e) => this.fishLeft(e))
            this.add(fish)
        }
        
    }

    fishLeft(e) {
        if (e.target.pos.x < 0 || e.target.pos.x > this.drawWidth) {
            e.target.vel.x = -e.target.vel.x
            // e.target.scale = new Vector(-1,1)
        }
        if (e.target.pos.y < 0 || e.target.pos.y > this.drawHeight) {
            e.target.vel.y = -e.target.vel.y
        }
        
    }
}

new Game()
