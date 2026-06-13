import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, FpsSampler, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Level } from './level.js'
import { GameOverScreen } from './gameoverscreen.js'


export class Game extends Engine {

    //random comment
    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Arcade
            }
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!");
        
        const level = new Level();
        this.add('level', level);
        const gameOverScreen = new GameOverScreen();
        this.add('gameOverScreen', gameOverScreen);

        this.goToScene('level');
    }
}

new Game()
