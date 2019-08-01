/* globals __DEV__ */
import Phaser from 'phaser'
import Comms from '../Comms'

const playerPositions = {
  player1: {
    tank: {
      x: 100,
      y: 275
    },
    cannon: {
      x: 115,// +15
      y: 255,//-20
    }
  },
  player2: {
    tank: {
      x: 730,
      y: 325
    },
    cannon: {
      x: 715,
      y: 305,
    }
  }
};


export default class extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene',
      active: false,
      physics: {
        default: 'matter',
        matter: {
          // /debug: true
        }
      }
    })
  }

  init() {
  }

  preload() {
    this.load.image("background", "assets/images/background_03.png");
    this.load.image('tank1', 'assets/images/tank.png');
    this.load.image('tank2', 'assets/images/tank2.png');
    this.load.image('charge', 'assets/images/charge-bg.png');
    this.load.image('cannon1', 'assets/images/cannon1.png');
    this.load.image('cannon2', 'assets/images/cannon2.png');
    this.load.image('ground4', 'assets/images/ground4.png');
    this.load.image('rocks_01', 'assets/images/rocks_01.png');
    this.load.image('rocks_02', 'assets/images/rocks_02.png');
    this.load.image('rocks_03', 'assets/images/rocks_03.png');
    this.load.image('tree_02', 'assets/images/tree_02.png');
    this.load.image('tree_03', 'assets/images/tree_03.png');
    this.load.image('bullet', 'assets/images/weapon_03_rocket.png');
    this.load.image('restart', 'assets/images/restart.png');
    this.load.image('victory', 'assets/images/victory.png');
    this.load.image('defeat', 'assets/images/defeat.png');
    this.load.image('waiting', 'assets/images/defeat.png');
    this.load.image('currentTankIndicator', 'assets/images/current_tank.png');

    this.load.spritesheet('boom', 'assets/images/explosion.png', {frameWidth: 140, frameHeight: 140});
    this.load.spritesheet('waterTiles', 'assets/images/water_tiles.png', {frameWidth: 256, frameHeight: 256});

    // Load body shapes from JSON file generated using PhysicsEditor
    this.load.json('shapes', 'assets/game-assets.json');

  }

  create() {

    this.playerNum = 1;
    this.otherPlayer = 2;

    Comms.init(playerNumber => {
      this.playerNum = playerNumber;
      this.otherPlayer = this.playerNum === 1 ? 2 : 1;
      this.addPlayer(playerNumber);
      this['player' + playerNumber + 'Indicator'] = this.add.image(playerPositions['player' + playerNumber].tank.x, playerPositions['player' + playerNumber].tank.y - 100, 'currentTankIndicator').setScale(0.5);
    });

    Comms.listen(() => {
      this.addPlayer(this.otherPlayer);
    }, 'playersReady');

    Comms.listen(() => {
      this.removePlayer(this.otherPlayer);
    }, 'playerGone');

    Comms.listen((fireObject) => {
      this.fireBullet(fireObject);
    }, 'fire');

    this.add.image(0, 0, 'background').setOrigin(0, 0);

    //this.matter.world.setBounds(0, 0, 800, 500);

    this.shapes = this.cache.json.get('shapes');

    var ground1 = this.matter.add.sprite(0, 0, 'ground4', null, {shape: this.shapes.ground4});
    ground1.setPosition(0 + ground1.centerOfMass.x, 200 + ground1.centerOfMass.y);

    var tree_02 = this.matter.add.sprite(0, 0, 'tree_02', null, {shape: this.shapes.tree_02});
    tree_02.setPosition(255, 210);
    tree_02.setScale(0.20);

    var tree_03 = this.matter.add.sprite(0, 0, 'tree_02', null, {shape: this.shapes.tree_02});
    tree_03.setPosition(460, 200);
    tree_03.setScale(0.25);

    var rocks_01 = this.matter.add.sprite(0, 0, 'rocks_01', null, {shape: this.shapes.rocks_01});
    rocks_01.setPosition(283, 243);
    rocks_01.setScale(0.2);

    var rocks_02 = this.matter.add.sprite(0, 0, 'rocks_02', null, {shape: this.shapes.rocks_02});
    rocks_02.setPosition(555, 290);
    rocks_02.setScale(0.2);

    var rocks_03 = this.matter.add.sprite(0, 0, 'rocks_03', null, {shape: this.shapes.rocks_03});
    rocks_03.setPosition(783, 345);
    rocks_03.setScale(0.2);


    this.showWater();

    this.input.keyboard.on('keydown-SPACE', (event) => {
      this.startCharge()
    });

    this.input.keyboard.on('keyup-SPACE', (event) => {
      this.fireWeapon()
    });

    this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {

      if (bodyB.gameObject && bodyB.gameObject.name === "bullet") {

        if (bodyA.gameObject && bodyA.gameObject.name === 'tank' + this.playerNum) {

          if (bodyB.gameObject.firer === this.playerNum) {
            return;
          }

          this.showExplosion(bodyB.gameObject.x, bodyB.gameObject.y, true);
          bodyB.gameObject.destroy();
          this.youLose();
          return;

        }

        if (bodyA.gameObject && bodyA.gameObject.name === 'tank' + this.otherPlayer) {

          if (bodyB.gameObject.firer === this.otherPlayer) {
            return;
          }

          this.showExplosion(bodyB.gameObject.x, bodyB.gameObject.y, true);
          bodyB.gameObject.destroy();
          this.youWin();
          return;
        }

        this.showExplosion(bodyB.gameObject.x, bodyB.gameObject.y);
        bodyB.gameObject.destroy();
      }

    }, this);

  }

  addPlayer(playerNumber) {

    if (this['player' + playerNumber]) {
      this.removePlayer(playerNumber);
    }

    const positions = playerPositions['player' + playerNumber];
    this['player' + playerNumber + 'Cannon'] = this.add.image(positions.cannon.x, positions.cannon.y, 'cannon' + playerNumber);
    const originVal = playerNumber - 1;
    this['player' + playerNumber + 'Cannon'].setOrigin(originVal, 0.5);
    this['player' + playerNumber + 'Cannon'].flipX = playerNumber === 2;
    this['player' + playerNumber] = this.matter.add.sprite(positions.tank.x, positions.tank.y, 'tank' + playerNumber, null, {shape: this.shapes['tank' + playerNumber]});
    this['player' + playerNumber].name = 'tank' + playerNumber;
  }

  showRestart() {
    Comms.killAll();
    let reStartButton = this.add.image(400, 250, 'restart');
    reStartButton.setInteractive();
    reStartButton.on('pointerdown', () => {
      this.scene.restart();
    });
  }

  youWin() {
    const victory = this.add.image(400, 100, 'victory');
    victory.setScale(0.5);
    this.removePlayer(1);
    this.removePlayer(2);
    this.input.keyboard.off('keydown-SPACE');
    this.showRestart();
  }

  youLose() {
    const defeat = this.add.image(400, 100, 'defeat');
    defeat.setScale(0.75);
    this.removePlayer(1);
    this.removePlayer(2);
    this.input.keyboard.off('keydown-SPACE');
    this.showRestart();
  }

  showWater() {
    const config = {
      key: 'water',
      frames: this.anims.generateFrameNumbers('waterTiles', {start: 0, end: 20}),
      frameRate: 20,
      repeat: -1
    };

    this.anims.create(config);

    var i;
    for (i = 0; i < 10; i++) {
      const xPos = i * 127;
      const waterAni = this.add.sprite(xPos, 450, 'waterTiles');
      waterAni.setScale(0.5);
      waterAni.anims.play('water');
      waterAni.setDepth(1);
    }


  }

  showExplosion(x, y, large) {
    const config = {
      key: 'explode',
      frames: this.anims.generateFrameNumbers('boom', {start: 0, end: 8, first: 8}),
      frameRate: 20
    };

    this.anims.create(config);

    const boom = this.add.sprite(x, y, 'boom');
    boom.anims.play('explode');
    boom.setDepth(1);

    if (!large) {
      boom.setScale(0.4)
    }

    setTimeout(() => {
      boom.destroy();
    }, 600);

  }

  removePlayer(playerNumber) {
    this['player' + playerNumber + 'Cannon'].destroy();
    this['player' + playerNumber + 'Cannon'] = null;
    this['player' + playerNumber].destroy();
    this['player' + playerNumber] = null;
    if (this.playerNum === playerNumber) {
      this['player' + playerNumber + 'Indicator'].destroy();
      this['player' + playerNumber + 'Indicator'] = null;
    }

  }

  fireWeapon() {

    if (!this['player' + this.playerNum + 'Charge']) {
      return;
    }

    let chargeValue = (this['player' + this.playerNum + 'ChargeAmount'].width - 4) * 1.3; // 0-100
    let angleValue = this['player' + this.playerNum + 'Cannon'].angle;

    angleValue = this.playerNum === 1 ? angleValue : angleValue - 180;

    this['player' + this.playerNum + 'Charge'].destroy();
    this['player' + this.playerNum + 'Charge'] = null;
    this['player' + this.playerNum + 'ChargeAmount'].destroy();
    this['player' + this.playerNum + 'ChargeAmount'] = null;
    this['player' + this.playerNum + 'Cannon'].charging = false;
    this['player' + this.playerNum + 'Cannon'].uncharging = false;

    const fireObject = {
      x: this['player' + this.playerNum + 'Cannon'].x,
      y: this['player' + this.playerNum + 'Cannon'].y,
      angle: angleValue,
      charge: chargeValue,
      player: this.playerNum,
    };

    Comms.sendData(fireObject, 'fire');

  }

  fireBullet(fireObject) {

    let x = fireObject.x;
    let y = fireObject.y;
    let angle = fireObject.angle;
    let charge = fireObject.charge;
    let player = fireObject.player;

    const bullet = this.matter.add.sprite(x, y, 'bullet', null, {shape: this.shapes.rocket});
    bullet.setScale(0.2);
    bullet.label = 'bullet';
    bullet.name = 'bullet';
    bullet.firer = player;
    bullet.setFriction(1, 0.02, 1);
    const originVal = player === 1 ? 0 : 1;
    //bullet.setOrigin(originVal, 0.5);
    setTimeout(() => {
      bullet.destroy();
    }, 2000);
    bullet.setAngle(angle);


    let angularVelocity = 0.07;

    angularVelocity = player === 1 ? angularVelocity : -angularVelocity;

    //bullet.setAngularVelocity(angularVelocity);
    bullet.setMass(130);
    bullet.thrust(charge / 8);

  }

  startCharge() {
    if (this['player' + this.playerNum + 'Charge']) {
      return;
    }
    this['player' + this.playerNum + 'Cannon'].charging = true;
    this['player' + this.playerNum + 'Cannon'].charge = 0;
    this['player' + this.playerNum + 'Charge'] = this.add.image(playerPositions['player' + this.playerNum].tank.x, playerPositions['player' + this.playerNum].tank.y - 90, 'charge');
    this['player' + this.playerNum + 'ChargeAmount'] = this.add.rectangle(this['player' + this.playerNum + 'Charge'].x - 39, this['player' + this.playerNum + 'Charge'].y - 1, 3, 3, 0xff0000).setOrigin(0, 0);
  }

  update(time, delta) {

    const chargeSpeed = 2.5;
    const rotateSpeed = 1.5;


    if (this.player1Cannon) {
      if (this.player1Cannon.cannonFlipped) {
        this.player1Cannon.angle -= rotateSpeed;
        if (this.player1Cannon.angle < -70) {
          this.player1Cannon.cannonFlipped = false;
        }
      } else {
        this.player1Cannon.angle += rotateSpeed;
        if (this.player1Cannon.angle > 10) {
          this.player1Cannon.cannonFlipped = true;
        }
      }

      if (this.player1Cannon.charging) {
        this.player1ChargeAmount.width += chargeSpeed;
        if (this.player1ChargeAmount.width > 78) {
          this.player1Cannon.charging = false;
          this.player1Cannon.uncharging = true;
        }
      }
      if (this.player1Cannon.uncharging) {
        this.player1ChargeAmount.width -= chargeSpeed;
        if (this.player1ChargeAmount.width < 5) {
          this.player1Cannon.charging = true;
          this.player1Cannon.uncharging = false;
        }
      }
    }

    if (this.player2Cannon) {
      if (this.player2Cannon.cannonFlipped) {
        this.player2Cannon.angle -= rotateSpeed;
        if (this.player2Cannon.angle < -10) {
          this.player2Cannon.cannonFlipped = false;
        }
      } else {
        this.player2Cannon.angle += rotateSpeed;
        if (this.player2Cannon.angle > 70) {
          this.player2Cannon.cannonFlipped = true;
        }
      }

      if (this.player2Cannon.charging) {
        this.player2ChargeAmount.width += chargeSpeed;
        if (this.player2ChargeAmount.width > 78) {
          this.player2Cannon.charging = false;
          this.player2Cannon.uncharging = true;
        }
      }
      if (this.player2Cannon.uncharging) {
        this.player2ChargeAmount.width -= chargeSpeed;
        if (this.player2ChargeAmount.width < 5) {
          this.player2Cannon.charging = true;
          this.player2Cannon.uncharging = false;
        }
      }
    }

  }

}
