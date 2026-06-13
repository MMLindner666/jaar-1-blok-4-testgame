import { ImageSource, Sound, Resource, Loader, ImageWrapping } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Player: new ImageSource('images/player.png'),
    Gun: new ImageSource('images/gun.png'),
    Bullet: new ImageSource('images/bullet.png'),
    NormalZombie: new ImageSource('images/normal_zombie.png'),
    BulkyZombie: new ImageSource('images/bulky_zombie.png'),
    SpeedyZombie: new ImageSource('images/speedy_zombie.png'),
    Wall: new ImageSource('images/wall.png'),
    Background: new ImageSource('images/background.png', { wrapping: ImageWrapping.Repeat}),
    HpFull: new ImageSource('images/hp_full.png'),
    HpEmpty: new ImageSource('images/hp_empty.png'),
    AmmoBox: new ImageSource('images/ammo_box.png')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }
