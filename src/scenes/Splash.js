import Phaser from 'phaser'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'SplashScene' })
  }

  preload () {
    this.load.image("splash", "../assets/images/start.png");
    this.load.image("startBtn", "../assets/images/startBtn.png");
  }

  create () {
    console.log('Splash');
    this.add.image(0, 0, 'splash').setOrigin(0, 0);
    let startButton = this.add.image(400, 400, 'startBtn');
    startButton.setInteractive();
    startButton.on('pointerdown', () => {
      console.log('pointerover');
      this.scene.start('GameScene');
    });

  }

  update () {}
}
