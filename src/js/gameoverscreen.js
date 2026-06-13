import { Actor, Engine, Vector, DisplayMode, randomInRange, Scene, BoundingBox, Label, Font, FontUnit, Color } from "excalibur"
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

export class GameOverScreen extends Scene {

    onInitialize(engine) {
        this.gameOver = new Label({
            text: 'GAME OVER',
            pos: new Vector(engine.drawWidth*0.5, engine.drawHeight*0.45),
            font: new Font({
                family: 'impact',
                size: 100,
                unit: FontUnit.Px,
                color:Color.Black
            })
        })
        this.gameOver.anchor = new Vector(0.5, 0.5)
        this.add(this.gameOver);

        this.reset = new Label({
            text: 'Reload the page to restart',
            pos: new Vector(engine.drawWidth*0.5, engine.drawHeight*0.55),
            font: new Font({
                family: 'impact',
                size: 40,
                unit: FontUnit.Px,
                color:Color.Black
            })
        })
        this.reset.anchor = new Vector(0.5, 0.5)
        this.add(this.reset);

        let lastScore = localStorage.getItem("lastScore");;
        let highScore = localStorage.getItem("highScore");;

        this.lastScore = new Label({
            text: `Score: ${lastScore}`,
            pos: new Vector(engine.drawWidth*0.3, engine.drawHeight*0.65),
            font: new Font({
                family: 'impact',
                size: 40,
                unit: FontUnit.Px,
                color:Color.Black
            })
        })
        this.lastScore.anchor = new Vector(0.5, 0.5)
        this.add(this.lastScore);

        this.highScore = new Label({
            text: `HighScore: ${highScore}`,
            pos: new Vector(engine.drawWidth*0.7, engine.drawHeight*0.65),
            font: new Font({
                family: 'impact',
                size: 40,
                unit: FontUnit.Px,
                color:Color.Black
            })
        })
        this.highScore.anchor = new Vector(0.5, 0.5)
        this.add(this.highScore);
    }
}