import { Actor, Engine, Vector, DisplayMode, ScreenElement, Label, Font, FontUnit, Color } from "excalibur"
import { HpBar } from './hp.js'
import { Player } from './player.js'

export class UI extends ScreenElement {

    player;
    game;
    ammoLabel;

    constructor(player) {
        super();
        this.player = player
    }

    onInitialize(engine) {
        this.game = engine;
        for (let i = 0; i < 10; i++) {
            const hpBar = new HpBar(i, this.player);
            this.addChild(hpBar);
        }

        this.ammoLabel = new Label({
            text: 'ammo: 30',
            pos: new Vector(this.game.drawWidth * 0.85, this.game.drawHeight * 0.93),
            font: new Font({
                family: 'impact',
                size: 40,
                unit: FontUnit.Px,
                color:Color.Black
            })
        })

        this.scoreLabel = new Label({
            text: 'score: 0',
            pos: new Vector(this.game.drawWidth * 0.02, this.game.drawHeight * 0.01),
            font: new Font({
                family: 'impact',
                size: 40,
                unit: FontUnit.Px,
                color:Color.Black
            })
        })
        
        this.addChild(this.ammoLabel)
        this.addChild(this.scoreLabel)
    }

    onPreUpdate() {
        this.ammoLabel.text = `ammo: ${this.player.gun.ammo}`;
        this.scoreLabel.text = `score: ${this.player.zombiesKilled * 100}`;
    }
}