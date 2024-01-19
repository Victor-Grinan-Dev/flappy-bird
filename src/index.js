import Phaser from "phaser";

//http://localhost:8080/

const config = {
  type: Phaser.AUTO, //WebGL (Web Gaphic Library) Js Api for rendering 2d and 3d graphics.
  width: 800,
  height: 600,
  physics: {
    default: "arcade", //Arcade physics plugin manages physics simulation
    arcade: {
      // gravity: { y: 200 }, //applyes gravity to averything
      debug: true,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update,
  },
};

new Phaser.Game(config);

let bird = null;
const flapVel = 250;
const initialPos = {
  x: config.width * 0.05,
  y: config.height / 2,
};

let UpperPipe = null;
let lowerPipe = null;
let pipeInitialx = 600; //850
const pipeInitialy = [-230, 140];
const pipeGapRange = [300, 450];
let pipeGap = Phaser.Math.Between(...pipeGapRange);
let pipesInitialPos = Phaser.Math.Between(...pipeInitialy);
const pipeVel = 200;

function preload() {
  this.load.image("sky", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
  this.load.image("pipe", "assets/pipe.png");
}

function create() {
  this.add.image(0, 0, "sky").setOrigin(0, 0); //
  bird = this.physics.add
    .sprite(initialPos.x, initialPos.y, "bird")
    .setOrigin(0, 0);
  bird.body.gravity.y = 400;
  UpperPipe = this.physics.add.sprite(pipeInitialx, pipesInitialPos, "pipe");

  lowerPipe = this.physics.add.sprite(
    pipeInitialx,
    UpperPipe.body.y + UpperPipe.body.height + pipeGap,
    "pipe"
  );

  this.input.keyboard.on("keydown-SPACE", function () {
    flap();
  });
}

function update(time, delta) {
  if (bird.body.y <= 0 - bird.body.height || bird.body.y >= config.height) {
    restartPlayerPos();
  }
}

function flap() {
  bird.body.velocity.y = flapVel * -1;
}

function restartPlayerPos() {
  bird.body.x = initialPos.x;
  bird.body.y = initialPos.y;
  bird.body.velocity.y = 0;
}

// function randomPipeGap() {
//   return Phaser.Math.Between(pipeGapRange);
// }
// function randomUpperPipeInitialPos() {
//   return Phaser.Math.Between(pipeInitialy);
// }
