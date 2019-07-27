/* globals __DEV__ */
import Phaser from 'phaser'
import Comms from '../Comms'

const playerPositions = {
  player1: {
    tank: {
      x: 110,
      y: 155
    },
    cannon: {
      x: 125,// +15
      y:135,//-20
    }
  },
  player2: {
    tank: {
      x: 640,
      y: 200
    },
    cannon: {
      x: 620,
      y: 185,
    }
  }
};

let playerNum = 1;
let otherPlayer = 2;

export default class extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene',
      active: true,
      physics: {
        default: 'matter',
        matter: {
          gravity: {
            y: 2
          }
        }
      }
    })
  }

  init() {
  }

  preload() {
    this.load.image("background", "../assets/images/background_03.png");
    this.load.image('tank1', 'assets/images/tank.png');
    this.load.image('tank2', 'assets/images/tank2.png');
    this.load.image('charge', 'assets/images/charge-bg.png');
    this.load.image('cannon1', 'assets/images/cannon1.png');
    this.load.image('cannon2', 'assets/images/cannon2.png');
    this.load.image('ground1', 'assets/images/ground1.png');
    this.load.image('ground2', 'assets/images/ground2.png');
    this.load.image('ground3', 'assets/images/ground3.png');
    this.load.image('bullet', 'assets/images/weapon_03_rocket.png');
    this.load.image('victory', 'assets/images/victory.png');
    this.load.image('defeat', 'assets/images/defeat.png');
    this.load.image('waiting', 'assets/images/defeat.png');
    this.load.image('currentTankIndicator', 'assets/images/current_tank.png');

    this.load.spritesheet('boom', 'assets/images/explosion.png', {frameWidth: 140, frameHeight: 140});

    // Load body shapes from JSON file generated using PhysicsEditor
    this.load.json('shapes', 'assets/images/game-assets.json');

  }

  create() {

    Comms.init(playerNumber => {
      playerNum = playerNumber;
      otherPlayer = playerNum === 1 ? 2 : 1;
      this.addPlayer(playerNumber);
      this['player' + playerNumber + 'Indicator'] = this.add.image(playerPositions['player' + playerNumber].tank.x, playerPositions['player' + playerNumber].tank.y - 100, 'currentTankIndicator').setScale(0.5);
    });

    Comms.listen(() => {
      this.addPlayer(otherPlayer);
    }, 'playersReady');

    Comms.listen((fireObject) => {
      this.fireBullet(fireObject);
    }, 'fire');

    this.add.image(0, 0, 'background').setOrigin(0, 0);

    this.matter.world.setBounds(0, 0, 800, 500);

    this.shapes = this.cache.json.get('shapes');

    var ground1 = this.matter.add.sprite(0, 0, 'ground1', null, {shape: this.shapes.ground1});
    ground1.setPosition(320, 440);

    var ground2 = this.matter.add.sprite(0, 0, 'ground2', null, {shape: this.shapes.ground2});
    ground2.setPosition(625, 240);

    var ground3 = this.matter.add.sprite(0, 0, 'ground3', null, {shape: this.shapes.ground3});
    ground3.setPosition(83, 200);

    this.input.keyboard.on('keydown-SPACE', (event) => {
      this.startCharge()
    });

    this.input.keyboard.on('keyup-SPACE', (event) => {
      this.fireWeapon()
    });

    this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {

      console.log(bodyA);

      if (bodyA.gameObject && (bodyA.gameObject.body.label === 'ground1' || bodyA.gameObject.body.label === 'ground2' || bodyA.gameObject.body.label === 'ground3')) {
        this.showExplosion(bodyB.gameObject.x, bodyB.gameObject.y);
        bodyB.gameObject.destroy();
      }

      if (bodyA.gameObject && bodyA.gameObject.body.label === 'tank' + playerNum) {

        if (bodyB.gameObject.firer === playerNum) {
          return;
        }

        this.showExplosion(bodyB.gameObject.x, bodyB.gameObject.y, true);
        bodyB.gameObject.destroy();
        this.youLose();

      }

      if (bodyA.gameObject && bodyA.gameObject.body.label === 'tank' + otherPlayer) {

        if (bodyB.gameObject.firer === otherPlayer) {
          return;
        }

        this.showExplosion(bodyB.gameObject.x, bodyB.gameObject.y, true);
        bodyB.gameObject.destroy();
        this.youWin();

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

  }

  youWin() {
    const victory = this.add.image(400, 250, 'victory');
    victory.setScale(0.5)
    this.removePlayer(1);
    this.removePlayer(2);
    this.input.keyboard.off('keydown-SPACE');
  }

  youLose() {
    const defeat = this.add.image(400, 250, 'defeat');
    defeat.setScale(0.75);
    this.removePlayer(1);
    this.removePlayer(2);
    this.input.keyboard.off('keydown-SPACE');
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
    this['player' + playerNumber + 'Cannon'].alpha = 0;
    this['player' + playerNumber].alpha = 0;
    if(playerNum === playerNumber){
      this['player' + playerNumber + 'Indicator'].alpha = 0;
    }

  }

  fireWeapon() {

    if (!this['player' + playerNum + 'Charge']) {
      return;
    }

    let chargeValue = (this['player' + playerNum + 'ChargeAmount'].width - 4) * 1.3; // 0-100
    let angleValue = this['player' + playerNum + 'Cannon'].angle;

    angleValue = playerNum === 1 ? angleValue : angleValue - 180;

    this['player' + playerNum + 'Charge'].destroy();
    this['player' + playerNum + 'Charge'] = null;
    this['player' + playerNum + 'ChargeAmount'].destroy();
    this['player' + playerNum + 'ChargeAmount'] = null;
    this['player' + playerNum + 'Cannon'].charging = false;
    this['player' + playerNum + 'Cannon'].uncharging = false;

    const fireObject = {
      x: this['player' + playerNum + 'Cannon'].x,
      y: this['player' + playerNum + 'Cannon'].y,
      angle: angleValue,
      charge: chargeValue,
      player: playerNum,
    };

    Comms.sendData(fireObject, 'fire');

  }

  fireBullet(fireObject) {

    let x = fireObject.x;
    let y = fireObject.y;
    let angle = fireObject.angle;
    let charge = fireObject.charge;
    let player = fireObject.player;

    let bullet = this.matter.add.image(x, y, 'bullet').setScale(0.2);
    bullet.label = 'bullet';
    bullet.firer = player;
    bullet.setFriction(1, 0.0005, 1);
    bullet.setBounce(0);
    const originVal = player - 1;
    bullet.setOrigin(originVal, 0.5);
    setTimeout(() => {
      bullet.destroy();
    }, 2000);
    bullet.setAngle(angle);

    const divider = player === 1 ? 10 : 15;

    let angularVelocity = (charge / 100) / divider;

    angularVelocity = player === 1 ? angularVelocity : -angularVelocity;

    console.log('angularVelocity' + angularVelocity);
    bullet.setAngularVelocity(angularVelocity);
    bullet.setMass(30);
    bullet.thrust(charge / 30);

  }

  startCharge() {
    if (this['player' + playerNum + 'Charge']) {
      return;
    }
    this['player' + playerNum + 'Cannon'].charging = true;
    this['player' + playerNum + 'Cannon'].charge = 0;
    this['player' + playerNum + 'Charge'] = this.add.image(playerPositions['player' + playerNum].tank.x, playerPositions['player' + playerNum].tank.y - 90, 'charge');
    this['player' + playerNum + 'ChargeAmount'] = this.add.rectangle(this['player' + playerNum + 'Charge'].x - 39, this['player' + playerNum + 'Charge'].y - 1, 3, 3, 0xff0000).setOrigin(0, 0);
  }

  update(time, delta) {

    const chargeSpeed = 1.5;
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
